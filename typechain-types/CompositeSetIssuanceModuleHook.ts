/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface CompositeSetIssuanceModuleHookInterface
  extends utils.Interface {
  contractName: "CompositeSetIssuanceModuleHook";
  functions: {
    "componentIssueHook(address,uint256,uint256,address,bool)": FunctionFragment;
    "componentRedeemHook(address,uint256,uint256,address,bool)": FunctionFragment;
    "controller()": FunctionFragment;
    "initialize(address)": FunctionFragment;
    "moduleIssueHook(address,uint256)": FunctionFragment;
    "moduleRedeemHook(address,uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "quote()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "router()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "componentIssueHook",
    values: [string, BigNumberish, BigNumberish, string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "componentRedeemHook",
    values: [string, BigNumberish, BigNumberish, string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "controller",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "initialize", values: [string]): string;
  encodeFunctionData(
    functionFragment: "moduleIssueHook",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "moduleRedeemHook",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "quote", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "router", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "componentIssueHook",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "componentRedeemHook",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "controller", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "moduleIssueHook",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "moduleRedeemHook",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "quote", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "router", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface CompositeSetIssuanceModuleHook extends BaseContract {
  contractName: "CompositeSetIssuanceModuleHook";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CompositeSetIssuanceModuleHookInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    componentIssueHook(
      _setToken: string,
      _quoteQuantityMax: BigNumberish,
      _componentQuantity: BigNumberish,
      _component: string,
      arg4: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    componentRedeemHook(
      _setToken: string,
      _quoteQuantityMin: BigNumberish,
      _componentQuantity: BigNumberish,
      _component: string,
      arg4: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    controller(overrides?: CallOverrides): Promise<[string]>;

    initialize(
      _setToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    moduleIssueHook(
      _setToken: string,
      _setTokenQuantity: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    moduleRedeemHook(
      _setToken: string,
      _setTokenQuantity: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    quote(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    router(overrides?: CallOverrides): Promise<[string]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  componentIssueHook(
    _setToken: string,
    _quoteQuantityMax: BigNumberish,
    _componentQuantity: BigNumberish,
    _component: string,
    arg4: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  componentRedeemHook(
    _setToken: string,
    _quoteQuantityMin: BigNumberish,
    _componentQuantity: BigNumberish,
    _component: string,
    arg4: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  controller(overrides?: CallOverrides): Promise<string>;

  initialize(
    _setToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  moduleIssueHook(
    _setToken: string,
    _setTokenQuantity: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  moduleRedeemHook(
    _setToken: string,
    _setTokenQuantity: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  quote(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  router(overrides?: CallOverrides): Promise<string>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    componentIssueHook(
      _setToken: string,
      _quoteQuantityMax: BigNumberish,
      _componentQuantity: BigNumberish,
      _component: string,
      arg4: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    componentRedeemHook(
      _setToken: string,
      _quoteQuantityMin: BigNumberish,
      _componentQuantity: BigNumberish,
      _component: string,
      arg4: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    controller(overrides?: CallOverrides): Promise<string>;

    initialize(_setToken: string, overrides?: CallOverrides): Promise<void>;

    moduleIssueHook(
      _setToken: string,
      _setTokenQuantity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    moduleRedeemHook(
      _setToken: string,
      _setTokenQuantity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    quote(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    router(overrides?: CallOverrides): Promise<string>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    componentIssueHook(
      _setToken: string,
      _quoteQuantityMax: BigNumberish,
      _componentQuantity: BigNumberish,
      _component: string,
      arg4: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    componentRedeemHook(
      _setToken: string,
      _quoteQuantityMin: BigNumberish,
      _componentQuantity: BigNumberish,
      _component: string,
      arg4: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    controller(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      _setToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    moduleIssueHook(
      _setToken: string,
      _setTokenQuantity: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    moduleRedeemHook(
      _setToken: string,
      _setTokenQuantity: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    quote(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    router(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    componentIssueHook(
      _setToken: string,
      _quoteQuantityMax: BigNumberish,
      _componentQuantity: BigNumberish,
      _component: string,
      arg4: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    componentRedeemHook(
      _setToken: string,
      _quoteQuantityMin: BigNumberish,
      _componentQuantity: BigNumberish,
      _component: string,
      arg4: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    controller(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initialize(
      _setToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    moduleIssueHook(
      _setToken: string,
      _setTokenQuantity: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    moduleRedeemHook(
      _setToken: string,
      _setTokenQuantity: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    quote(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    router(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}