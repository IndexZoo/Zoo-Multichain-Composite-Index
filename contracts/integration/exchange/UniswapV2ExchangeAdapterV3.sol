/*
    Copyright 2021 IndexTech Ltd.

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
pragma experimental "ABIEncoderV2";

/**
 * @title UniswapV2TradeAdapter
 * @author IndexTech Ltd.
 *
 * Exchange adapter for Uniswap V2 Router02 that encodes trade data
 */
contract UniswapV2ExchangeAdapterV3 {

    /* ============ State Variables ============ */

    // Address of Uniswap V2 Router02 contract
    address public immutable router;
    string internal constant SWAP_EXACT_TOKENS_FOR_TOKENS = "swapExactTokensForTokens(uint256,uint256,address[],address,uint256)";
    string internal constant SWAP_TOKENS_FOR_EXACT_TOKENS = "swapTokensForExactTokens(uint256,uint256,address[],address,uint256)";

    /* ============ Constructor ============ */

    /**
     * Set state variables
     *
     * @param _router       Address of Uniswap V2 Router02 contract
     */
    constructor(address _router) public {
        router = _router;
    }

    /* ============ External Getter Functions ============ */

    /**
     * Return calldata for Uniswap V2 Router02
     *
     * @param  _sourceToken              Address of source token to be sold
     * @param  _destinationToken         Address of destination token to buy
     * @param  _destinationAddress       Address that assets should be transferred to
     * @param  _exactQuantity           Amount of source token to sell
     * @param  _edgedQuantity            Critical amount whether Min or Max 
     * @param _shouldSwapExactTokensForTokens   Direction
     * @param  _data                     Arbitrary bytes containing trade call data
     *
     * @return address                   Target contract address
     * @return uint256                   Call value
     * @return bytes                     Trade calldata
     */
    function getTradeCalldata(
        address _sourceToken,
        address _destinationToken,
        address _destinationAddress,
        uint256 _exactQuantity,
        uint256 _edgedQuantity,
        bool _shouldSwapExactTokensForTokens,
        bytes memory _data
    )
        external
        view
        returns (address, uint256, bytes memory)
    {   
        address[] memory path;
        bool shouldSwapExactTokensForTokens;

        if(_data.length == 0){
            path = new address[](2);
            path[0] = _sourceToken;
            path[1] = _destinationToken;
            shouldSwapExactTokensForTokens  =  _shouldSwapExactTokensForTokens;
        } else {
            (path, shouldSwapExactTokensForTokens) = abi.decode(_data, (address[],bool));
        }

        bytes memory callData = abi.encodeWithSignature(
            shouldSwapExactTokensForTokens? SWAP_EXACT_TOKENS_FOR_TOKENS:SWAP_TOKENS_FOR_EXACT_TOKENS,
            _exactQuantity,
            _edgedQuantity,
            path,
            _destinationAddress,
            block.timestamp
        );
        return (router, 0, callData);
    }

    /**
     * Returns the address to approve source tokens to for trading. This is the Uniswap router address
     *
     * @return address             Address of the contract to approve tokens to
     */
    function getSpender()
        external
        view
        returns (address)
    {
        return router;
    }
} 