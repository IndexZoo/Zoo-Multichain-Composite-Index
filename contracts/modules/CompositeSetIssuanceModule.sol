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
        IERC20 quote;
    }

    /* ============ Events ============ */

    event SetTokenIssued(
        ISetToken indexed _setToken,
        address indexed _issuer,
        address indexed _to,
        uint256 _quantity
    );

    event SetTokenRedeemed(
        ISetToken indexed _setToken,
        address indexed _redeemer,
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
            uint256[] memory equityUnits
        ) = _calculateRequiredComponentIssuanceUnits(_setToken, _quantity, true);
        require (_sumOf(equityUnits) <= _maxAmountIn, "Index: insufficient amountIn"); 

        _resolveEquityPositions(_setToken, _quantity, _to, true, components, equityUnits, _maxAmountIn );
        _setToken.mint(_to, _quantity);

        emit SetTokenIssued(
            _setToken,
            msg.sender,
            _to,
            _quantity
        );
    }

    /**
     * Returns components from the SetToken, unwinds any external module component positions and burns the SetToken.
     * If the token has debt positions, the module transfers in the required debt amounts from the caller and uses
     * those funds to repay the debts on behalf of the SetToken. All debt will be paid down first then equity positions
     * will be returned to the minting address. If specified, a fee will be charged on redeem.
     *
     * @param _setToken         Instance of the SetToken to redeem
     * @param _quantity         Quantity of SetToken to redeem
     * @param _to               Address to send collateral to
     */
    function redeem(
        ISetToken _setToken,
        uint256 _quantity,
        address _to,
        uint256 _mintAmountRedeemed
    )
        external
        virtual        
        nonReentrant
        onlyValidAndInitializedSet(_setToken)
    {
        require(_quantity > 0, "Redeem quantity must be > 0");

        // Place burn after pre-redeem hooks because burning tokens may lead to false accounting of synced positions
        _setToken.burn(msg.sender, _quantity);

        (
            address[] memory components,
            uint256[] memory equityUnits
        ) = _calculateRequiredComponentIssuanceUnits(_setToken, _quantity, false);
        _validateAmountSlippage(equityUnits, _mintAmountRedeemed);
        _resolveEquityPositions(_setToken, _quantity, _to, false, components, equityUnits, _mintAmountRedeemed);

        emit SetTokenRedeemed(
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
        address[] memory components = _setToken.getComponents();
        require(components.length > 1, "Index: not enough components");
        _setToken.initializeModule();
        Config memory config;
        config.router = _router;
        config.quote = _quote;
        configs[_setToken] = config;
       
        CompositeSetIssuanceModuleHook hook = new CompositeSetIssuanceModuleHook(controller, _quote, _router);
        for(uint16 i=0; i < components.length; i++) {
            _setToken.addExternalPositionModule(components[i], address(hook));
        }
    }

    /**
     * MANAGER ONLY: Initializes the issuance-related hooks and fee information. Only callable
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
        address externalModule = _validateInitializableHook(_setToken);
        IModuleIssuanceHook(externalModule).initialize(_setToken);
    }

    function getSome(ISetToken _setToken, uint256 _quantity, bool _isIssue) external view returns (address[] memory, uint256[] memory) {
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
        uint256 _amountThreshold
    )
        internal
    {
        // FIXME: working revision here
        if (_isIssue) {
            transferFrom(
                configs[_setToken].quote,
                msg.sender,
                address(_setToken),
                _sumOf(_componentEquityQuantities)
            );
        }
        uint256[] memory thresholds = _calculateSlippageAmounts(
            _componentEquityQuantities, 
            _amountThreshold,
            _isIssue
        );
        address component;
        uint256 componentQuantity;
        for (uint256 i = 0; i < _components.length; i++) {
            component = _components[i];
            if (_componentEquityQuantities[i] > 0) {
                componentQuantity  = _quantity.preciseMul(_setToken.getDefaultPositionRealUnit(component).toUint256());
                componentQuantity = componentQuantity.preciseMul(IndexUtils.getUnitOf(component));  // ether, btc, ...etc
                _executeExternalPositionHooks(
                    _setToken,
                    thresholds[i],
                    componentQuantity,        // Exact
                    IERC20(component), 
                    _isIssue
                );
            }
        }
        // TODO: move this too Hook
        if(!_isIssue) {
             _setToken.invokeTransfer(
                 address(configs[_setToken].quote), 
                 _to, 
                _sumOf(_componentEquityQuantities)
            );
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
        returns (address[] memory, uint256[] memory)
    {
        (
            address[] memory components,
            uint256[] memory equityUnits
        ) = _getTotalIssuanceUnits(_setToken);

        address _quote = address(configs[_setToken].quote);

        uint256 componentsLength = components.length;
        uint256[] memory totalEquityUnits = new uint256[](componentsLength);
        address [] memory path = new address[](2);
        for (uint256 i = 0; i < components.length; i++) {
            // Use preciseMulCeil to round up to ensure overcollateration when small issue quantities are provided
            // and preciseMul to round down to ensure overcollateration when small redeem quantities are provided
            uint256 totalUnits = _isIssue ?
                equityUnits[i].preciseMulCeil(_quantity) :
                equityUnits[i].preciseMul(_quantity);
            path[0] = _isIssue? _quote:components[i];
            path[1] = _isIssue? components[i]:_quote;
            
            totalEquityUnits[i] = _isIssue?
                configs[_setToken].router.getAmountsIn(totalUnits.preciseMul(IndexUtils.getUnitOf(components[i])), path)[0]:
                configs[_setToken].router.getAmountsOut(totalUnits.preciseMul(IndexUtils.getUnitOf(components[i])), path)[1];
        }

        return (components, totalEquityUnits );
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

        for (uint256 i = 0; i < components.length; i++) {
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

    function _validateAmountSlippage(
        uint256[] memory equityQuantities,
        uint256 amountOutMin
    )
    private
    pure
    {
        require(_sumOf(equityQuantities) >= amountOutMin, "Index: Not enough amountOut");
    }

    function _validateInitializableHook(
        ISetToken _setToken
    )
    private
    view 
    returns (address externalModule)
    {
        address[] memory components = _setToken.getComponents();
        for(uint16 i=0; i < components.length; i++) {
            address[] memory externalModules = _setToken.getExternalPositionModules(components[i]);
            require(externalModules.length == 1, "Index: externalModules error");
            if (externalModule == address(0)) {
                externalModule = externalModules[0];
            }
            require(externalModule == externalModules[0], "Index: not same externalModule");
        }
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

    function _sumOf(
        uint256[] memory nums
    )
    private
    pure
    returns (uint256 total)
    {
        uint length = nums.length;
        if(length == 0)  return 0;
        for (uint i=0; i < length; i++) {
            total = total.add(nums[i]);
        }
    }

    function _calculateSlippageAmounts(
        uint256[] memory _expectedAmounts,
        uint256 _thresholdAmount,
        bool _isIssue
    )
    public
    pure
    returns (uint256[] memory ) 
    {
        uint256 total = _sumOf(_expectedAmounts);
        bool x = _isIssue? _thresholdAmount < total : total < _thresholdAmount;
        if(x) return _expectedAmounts;

        uint256[] memory _thresholdAmounts = new uint256[] (_expectedAmounts.length);
        for(uint i=0; i < _expectedAmounts.length; i++) {
            _thresholdAmounts[i] = _thresholdAmount.mul(_expectedAmounts[i]).div(total);
        }
        return _thresholdAmounts;
    }
}

 