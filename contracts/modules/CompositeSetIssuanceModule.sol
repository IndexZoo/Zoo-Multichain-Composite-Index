/*
    Copyright 2021 Set Labs Inc.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

    SPDX-License-Identifier: Apache License, Version 2.0
*/

// DONE: implement calculation ()
// TODO: This module added to a set as one of a kind (if it requires asset storing)
// TODO: This module should not be removed if it stores assets
// TODO: This module is added to a set with no minted tokens only

pragma solidity 0.6.10;
pragma experimental "ABIEncoderV2";

import { IController } from "@setprotocol/set-protocol-v2/contracts/interfaces/IController.sol";
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import { DebtIssuanceModuleV2 } from "@setprotocol/set-protocol-v2/contracts/protocol/modules/DebtIssuanceModuleV2.sol";
import { ModuleBase } from "@setprotocol/set-protocol-v2/contracts/protocol/lib/ModuleBase.sol";
import { Position } from "@setprotocol/set-protocol-v2/contracts/protocol/lib/Position.sol";
import { ISetToken } from "@setprotocol/set-protocol-v2/contracts/interfaces/ISetToken.sol";
import { IModuleIssuanceHookV3 as IModuleIssuanceHook} from "../interfaces/IModuleIssuanceHookV3.sol";
import { IUniswapV2Router } from "@setprotocol/set-protocol-v2/contracts/interfaces/external/IUniswapV2Router.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { IExchangeAdapterV3} from "../interfaces/IExchangeAdapterV3.sol";
import { IndexUtils } from "../lib/IndexUtils.sol";
import {CompositeSetIssuanceModuleHook} from "./CompositeSetIssuanceModuleHook.sol";

import "hardhat/console.sol";

/**
 * @title CompositeSetIssuanceModule
 * @author IndexZoo 
 *
 * The DebtIssuanceModuleV2 is a module that enables users to issue and redeem SetTokens that contain default and all
 * external positions, including debt positions. Module hooks are added to allow for syncing of positions, and component
 * level hooks are added to ensure positions are replicated correctly. The manager can define arbitrary issuance logic
 * in the manager hook, as well as specify issue and redeem fees.
 * 
 * NOTE: 
 * DebtIssuanceModule contract confirms increase/decrease in balance of component held by the SetToken after every transfer in/out
 * for each component during issuance/redemption. This contract replaces those strict checks with slightly looser checks which 
 * ensure that the SetToken remains collateralized after every transfer in/out for each component during issuance/redemption.
 * This module should be used to issue/redeem SetToken whose one or more components return a balance value with +/-1 wei error.
 * For example, this module can be used to issue/redeem SetTokens which has one or more aTokens as its components.
 * The new checks do NOT apply to any transfers that are part of an external position. A token that has rounding issues may lead to 
 * reverts if it is included as an external position unless explicitly allowed in a module hook.
 *
 * The getRequiredComponentIssuanceUnits function on this module assumes that Default token balances will be synced on every issuance
 * and redemption. If token balances are not being synced it will over-estimate the amount of tokens required to issue a Set.
 */
contract CompositeSetIssuanceModule is ModuleBase, ReentrancyGuard {
    using IndexUtils for ISetToken;
    using Address for address;


    /* ==================== Struct ============================= */
    struct Config {
        IUniswapV2Router router;
    }

    /* ============ Events ============ */

    event SetTokenIssued(
        ISetToken indexed _setToken,
        address indexed _issuer,
        address indexed _to,
        uint256 _quantity
    );

    /* ==================== State Variables ========================== */
    /**
     * Config configuration for module
     * configuration for a selected token 
     * router i.e. Uniswap
     */
    mapping(ISetToken=> Config) public configs;
    
    /* ============ Constructor ============ */
    
    constructor(IController _controller) public ModuleBase (_controller) {}

    /* ============ External Functions ============ */

    /**
     * Deposits components to the SetToken, replicates any external module component positions and mints 
     * the SetToken. If the token has a debt position all collateral will be transferred in first then debt
     * will be returned to the minting address. If specified, a fee will be charged on issuance.
     *
     * @param _setToken         Instance of the SetToken to issue
     * @param _quantity         Quantity of SetToken to issue
     * @param _to               Address to mint SetToken to
     */
    function issue(
        ISetToken _setToken,
        uint256 _quantity,
        address _to,
        uint256 _maxAmountIn
    )
        external
        virtual
        nonReentrant
        onlyValidAndInitializedSet(_setToken)
    {
        require(_quantity > 0, "Issue quantity must be > 0");

        (
            address[] memory components,
            uint256[] memory equityUnits,
            uint256 equityUnitsSum
        ) = _calculateRequiredComponentIssuanceUnits(_setToken, _quantity, true);
        require (equityUnitsSum <= _maxAmountIn, "Composite: insufficient amountIn");

        _resolveEquityPositions(_setToken, _quantity, _to, true, components, equityUnits, equityUnitsSum);

        _setToken.mint(_to, _quantity);

        emit SetTokenIssued(
            _setToken,
            msg.sender,
            _to,
            _quantity
        );
    }

    /**
     * MANAGER ONLY: Initializes this module to the SetToken with issuance-related hooks and fee information. Only callable
     * by the SetToken's manager. Hook addresses are optional. Address(0) means that no hook will be called
     *
     * @param _setToken                     Instance of the SetToken to issue
     */
    function initialize(
        ISetToken _setToken,
        IERC20 _quote,
        IUniswapV2Router _router
    )
        external
        onlySetManager(_setToken, msg.sender)
        onlyValidAndPendingSet(_setToken)
    {
        // TODO: ensure it contains at least 2 comps
        // TODO: validate setToken is cool
        //   - each component should have 1 external position
        _setToken.initializeModule();
        configs[_setToken] = Config (_router);

        // TODO: tidy later
        address[] memory components = _setToken.getComponents();
        // TODO: pass adapter to constructor
        CompositeSetIssuanceModuleHook hook = new CompositeSetIssuanceModuleHook(controller, _quote, _router);
        // TODO: add address of hook to a special allow list 
        for(uint16 i=1; i < components.length; i++) {
            _setToken.addExternalPositionModule(components[i], address(hook));
        }
    }

    /**
     * MANAGER ONLY: Initializes this module to the SetToken with issuance-related hooks and fee information. Only callable
     * by the SetToken's manager. Hook addresses are optional. Address(0) means that no hook will be called
     *
     * @param _setToken                     Instance of the SetToken to issue
     */
    function initializeHook(
        ISetToken _setToken
    )
        external
        onlySetManager(_setToken, msg.sender)
        onlyValidAndInitializedSet(_setToken)
    {
        address[] memory components = _setToken.getComponents();
        address externalModule;
        for(uint16 i=1; i < components.length; i++) {
            address[] memory externalModules = _setToken.getExternalPositionModules(components[i]);
            require(externalModules.length == 1);
            if (externalModule == address(0)) {
                externalModule = externalModules[0];
            }
            require(externalModule == externalModules[0]);
        }
        IModuleIssuanceHook(externalModule).initialize(_setToken);
    }

    function getSome(ISetToken _setToken, uint256 _quantity, bool _isIssue) external view returns (address[] memory, uint256[] memory, uint256) {
        return _calculateRequiredComponentIssuanceUnits(_setToken, _quantity, _isIssue);
    }

    function removeModule() external override {}

    /* ============ Internal Functions ============ */

    /**
     * Resolve equity positions associated with SetToken. On issuance, the total equity position for an asset (including default and external
     * positions) is transferred in. Then any external position hooks are called to transfer the external positions to their necessary place.
     * On redemption all external positions are recalled by the external position hook, then those position plus any default position are
     * transferred back to the _to address.
     */
    function _resolveEquityPositions(
        ISetToken _setToken,
        uint256 _quantity,
        address _to,
        bool _isIssue,
        address[] memory _components,
        uint256[] memory _componentEquityQuantities,
        uint256 equityUnitsSum
    )
        internal
    {
        if (_isIssue) {
            transferFrom(
                IERC20(_components[0]),
                msg.sender,
                address(_setToken),
                equityUnitsSum
            );
        }
        address component;
        uint256 quoteComponentQuantity ;
        uint256 componentQuantity;
        for (uint256 i = 1; i < _components.length; i++) {
            component = _components[i];
            quoteComponentQuantity = _componentEquityQuantities[i-1];
            if (quoteComponentQuantity > 0) {
                componentQuantity  = _quantity.preciseMul(_setToken.getDefaultPositionRealUnit(component).toUint256());
                componentQuantity = componentQuantity.preciseMul(IndexUtils.getUnitOf(component));
                _executeExternalPositionHooks(
                    _setToken,
                    quoteComponentQuantity,
                    componentQuantity, 
                    IERC20(component), 
                    _isIssue
                );
                // _approveRouter(_setToken, _components[0], quoteComponentQuantity);
                // uint256[] memory amounts = _swapToIndex(_setToken, component, componentQuantity, quoteComponentQuantity);

                // require(amounts[1] == componentQuantity, "Composite: Undesired o/p swap");
            }
        }
    }


    /**
     * Calculates the amount of each component needed to collateralize passed issue quantity of Sets as well as amount of debt that will
     * be returned to caller. Can also be used to determine how much collateral will be returned on redemption as well as how much debt
     * needs to be paid down to redeem.
     *
     * @param _setToken         Instance of the SetToken to issue
     * @param _quantity         Amount of Sets to be issued/redeemed
     * @param _isIssue          Whether Sets are being issued or redeemed
     *
     * @return address[]        Array of component addresses making up the Set
     * @return uint256[]        Array of equity notional amounts of each component, respectively, represented as uint256
     */
    function _calculateRequiredComponentIssuanceUnits(
        ISetToken _setToken,
        uint256 _quantity,
        bool _isIssue
    )
        internal
        view
        returns (address[] memory, uint256[] memory, uint256 )
    {
        (
            address[] memory components,
            uint256[] memory equityUnits
        ) = _getTotalIssuanceUnits(_setToken);

        uint256 componentsLength = components.length;
        uint256[] memory totalEquityUnits = new uint256[](componentsLength-1);
        address [] memory path = new address[](2);
        uint256 sum;
        for (uint256 i = 1; i < components.length; i++) {
            // Use preciseMulCeil to round up to ensure overcollateration when small issue quantities are provided
            // and preciseMul to round down to ensure overcollateration when small redeem quantities are provided
            uint256 totalUnits = _isIssue ?
                equityUnits[i].preciseMulCeil(_quantity) :
                equityUnits[i].preciseMul(_quantity);
            path[0] = _isIssue? components[0]:components[i];
            path[1] = _isIssue? components[i]:components[0];
            
            totalEquityUnits[i-1] = _isIssue?
                configs[_setToken].router.getAmountsIn(totalUnits, path)[0]:
                configs[_setToken].router.getAmountsOut(totalUnits, path)[1];
            sum = sum.add(totalEquityUnits[i-1]);
        }

        return (components, totalEquityUnits, sum);
    }

    /**
     * Sums total debt and equity units for each component, taking into account default and external positions.
     *
     * @param _setToken         Instance of the SetToken to issue
     *
     * @return address[]        Array of component addresses making up the Set
     * @return uint256[]        Array of equity unit amounts of each component, respectively, represented as uint256
     */
    function _getTotalIssuanceUnits(
        ISetToken _setToken
    )
        internal
        view
        returns (address[] memory, uint256[] memory)
    {
        address[] memory components = _setToken.getComponents();
        uint256 componentsLength = components.length;

        uint256[] memory equityUnits = new uint256[](componentsLength);

        for (uint256 i = 1; i < components.length; i++) {
            address component = components[i];
            int256 cumulativeEquity = _setToken.getDefaultPositionRealUnit(component);
            equityUnits[i] = cumulativeEquity.toUint256();
        }

        return (components, equityUnits );
    }

    /**
     * For each component's external module positions, calculate the total notional quantity, and 
     * call the module's issue hook or redeem hook.
     * Note: It is possible that these hooks can cause the states of other modules to change.
     * It can be problematic if the hook called an external function that called back into a module, resulting in state inconsistencies.
     */
    function _executeExternalPositionHooks(
        ISetToken _setToken,
        uint256 _quoteQuantity,
        uint256 _componentQuantity,
        IERC20 _component,
        bool _isIssue
    )
        internal
    {
        address externalPositionModule = _setToken.getExternalPositionModules(address(_component))[0];
        if (_isIssue) {
            IModuleIssuanceHook(externalPositionModule).componentIssueHook(_setToken, _quoteQuantity, _componentQuantity, _component, true);
        } else {
            IModuleIssuanceHook(externalPositionModule).componentRedeemHook(_setToken, _quoteQuantity, _componentQuantity, _component, true);
        }
    }

    /* ============ Private Functions ============ */
   /**
     * Instructs the SetToken to set approvals of the ERC20 token to a spender.
     *
     * @param _setToken                      SetToken instance to invoke
     * @param _component                     ERC20 component of Index / Output of swap
     * @param _componentQuantity             Desired output quantity of component 
     * @param _quoteComponentQuantityMax        Maximum allowed quantity of input of swap 
     */
    function _swapToIndex(
        ISetToken _setToken,
        address _component,
        uint256 _componentQuantity,
        uint256 _quoteComponentQuantityMax
    )
    private
    returns (uint256[] memory amounts)
    {
        IExchangeAdapterV3 adapter = IExchangeAdapterV3(getAndValidateAdapter("UNISWAP"));
        amounts = _setToken.invokeSwapToIndex(
            adapter, 
            _component,
            _componentQuantity, 
            _quoteComponentQuantityMax 
        );
    }

   /**
     * Instructs the SetToken to set approvals of the ERC20 token to a spender.
     *
     * @param _setToken        ZooToken instance to invoke
     * @param _token           ERC20 token to approve
     * @param _quantity        The quantity of allowance to allow
     */
    function _approveRouter(
        ISetToken _setToken,
        address _token,
        uint256 _quantity
    )
       private 
    {
        IUniswapV2Router spender = configs[_setToken].router;
        _invokeApprove(_setToken, _token, address(spender), _quantity);
    }

   /**
     * Instructs the SetToken to set approvals of the ERC20 token to a spender.
     *
     * @param _setToken        ZooToken instance to invoke
     * @param _token           ERC20 token to approve
     * @param _spender         The account allowed to spend the ZooToken's balance
     * @param _quantity        The quantity of allowance to allow
     */
    function _invokeApprove(
        ISetToken _setToken,
        address _token,
        address _spender,
        uint256 _quantity
    )
      private 
    {
        bytes memory callData = abi.encodeWithSignature("approve(address,uint256)", _spender, _quantity);
        _setToken.invoke(_token, 0, callData);
    }
}

 