/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IModuleIssuanceHook,
  IModuleIssuanceHookInterface,
} from "../IModuleIssuanceHook";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract ISetToken",
        name: "_setToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_setTokenQuantity",
        type: "uint256",
      },
      {
        internalType: "contract IERC20",
        name: "_component",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_isEquity",
        type: "bool",
      },
    ],
    name: "componentIssueHook",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISetToken",
        name: "_setToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_setTokenQuantity",
        type: "uint256",
      },
      {
        internalType: "contract IERC20",
        name: "_component",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_isEquity",
        type: "bool",
      },
    ],
    name: "componentRedeemHook",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISetToken",
        name: "_setToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_setTokenQuantity",
        type: "uint256",
      },
    ],
    name: "moduleIssueHook",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISetToken",
        name: "_setToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_setTokenQuantity",
        type: "uint256",
      },
    ],
    name: "moduleRedeemHook",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IModuleIssuanceHook__factory {
  static readonly abi = _abi;
  static createInterface(): IModuleIssuanceHookInterface {
    return new utils.Interface(_abi) as IModuleIssuanceHookInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IModuleIssuanceHook {
    return new Contract(address, _abi, signerOrProvider) as IModuleIssuanceHook;
  }
}
