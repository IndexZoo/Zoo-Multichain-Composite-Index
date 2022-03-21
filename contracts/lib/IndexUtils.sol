/*
    Copyright 2020 Set Labs Inc.

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

pragma solidity 0.6.10;
pragma experimental ABIEncoderV2;

import { SafeMath } from "@openzeppelin/contracts/math/SafeMath.sol";
import { SignedSafeMath } from "@openzeppelin/contracts/math/SignedSafeMath.sol";
import { ISetToken } from "@setprotocol/set-protocol-v2/contracts/interfaces/ISetToken.sol";
import { IUniswapV2Router } from "@setprotocol/set-protocol-v2/contracts/interfaces/external/IUniswapV2Router.sol";
import { IExchangeAdapterV3} from "../interfaces/IExchangeAdapterV3.sol";
import { Position } from "@setprotocol/set-protocol-v2/contracts/protocol/lib/Position.sol";
import { Address } from "@openzeppelin/contracts/utils/Address.sol";

import {console} from "hardhat/console.sol";

/**
 * @title IndexUtils 
 * @author IndexTech Ltd. 
 *
 *
 */
library IndexUtils {
    using SafeMath for uint256;
    using SignedSafeMath for int256;
    using Position for ISetToken;
    using Address for address;

    function invokeSwapExact(
        ISetToken _setToken,
        IExchangeAdapterV3 adapter,
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn,
        uint256 _amountOutMin
    )
       internal 
       returns (uint256[] memory amounts)
    {
        (
            address target,
            uint256 callValue,
            bytes memory methodData
        ) = adapter.getTradeCalldata(
            _tokenIn, 
            _tokenOut, 
            address(_setToken), 
            _amountIn, 
            _amountOutMin, 
            true,
            ""
        );
        bytes memory data = _setToken.invoke(target, callValue, methodData);
        amounts = abi.decode(data, (uint256[]));
    }

    function invokeSwapToIndex(
        ISetToken _setToken,
        IExchangeAdapterV3 adapter,
        address _tokenIn,
        address _tokenOut,
        uint256 _amountOut,
        uint256 _amountInMax
    )
       internal 
       returns (uint256[] memory amounts)
    {
        (
            address target,
            uint256 callValue,
            bytes memory methodData
        ) = adapter.getTradeCalldata(
            _tokenIn, 
            _tokenOut, 
            address(_setToken), 
            _amountOut, 
            _amountInMax, 
            false,
            ""
        );
        bytes memory data = _setToken.invoke(target, callValue, methodData);
        amounts = abi.decode(data, (uint256[]));


        // address[] memory path = new address[](2);
        // path[0] = _tokenIn;
        // path[1] = _tokenOut;
        // bytes memory callData = abi.encodeWithSignature(
        //     "swapTokensForExactTokens(uint256,uint256,address[],address,uint256)",
        //     amountOut,
        //     amountInMax,
        //     path,
        //     address(_setToken),
        //     block.timestamp
        // );
        // _setToken.invoke(address(configs[_setToken].router), 0, callData);
    }

    function getUnitOf(
        address _token
    )
    internal 
    view
    returns (uint256)
    {
        return 10**uint256(getDecimalsOf(_token));
    }

    function getDecimalsOf (
        address _token
    )
    internal 
    view
    returns (uint8 )
    {
        bytes memory callData = abi.encodeWithSignature("decimals()");
        bytes memory data = _token.functionStaticCall(callData);
        return abi.decode(data, (uint8));
    }
}