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

export interface CompositeSetIssuanceModuleInterface extends utils.Interface {
  contractName: "CompositeSetIssuanceModule";
  functions: {
    "_calculateSlippageAmounts(uint256[],uint256,bool)": FunctionFragment;
    "configs(address)": FunctionFragment;
    "controller()": FunctionFragment;
    "getSome(address,uint256,bool)": FunctionFragment;
    "initialize(address,address,address)": FunctionFragment;
    "initializeHook(address)": FunctionFragment;
    "issue(address,uint256,address,uint256)": FunctionFragment;
    "redeem(address,uint256,address,uint256)": FunctionFragment;
    "removeModule()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "_calculateSlippageAmounts",
    values: [BigNumberish[], BigNumberish, boolean]
  ): string;
  encodeFunctionData(functionFragment: "configs", values: [string]): string;
  encodeFunctionData(
    functionFragment: "controller",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getSome",
    values: [string, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "initializeHook",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "issue",
    values: [string, BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "redeem",
    values: [string, BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "removeModule",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "_calculateSlippageAmounts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "configs", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "controller", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getSome", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "initializeHook",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "issue", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "redeem", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeModule",
    data: BytesLike
  ): Result;

  events: {
    "SetTokenIssued(address,address,address,uint256)": EventFragment;
    "SetTokenRedeemed(address,address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "SetTokenIssued"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetTokenRedeemed"): EventFragment;
}

export type SetTokenIssuedEvent = TypedEvent<
  [string, string, string, BigNumber],
  { _setToken: string; _issuer: string; _to: string; _quantity: BigNumber }
>;

export type SetTokenIssuedEventFilter = TypedEventFilter<SetTokenIssuedEvent>;

export type SetTokenRedeemedEvent = TypedEvent<
  [string, string, string, BigNumber],
  { _setToken: string; _redeemer: string; _to: string; _quantity: BigNumber }
>;

export type SetTokenRedeemedEventFilter =
  TypedEventFilter<SetTokenRedeemedEvent>;

export interface CompositeSetIssuanceModule extends BaseContract {
  contractName: "CompositeSetIssuanceModule";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CompositeSetIssuanceModuleInterface;

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
    _calculateSlippageAmounts(
      _expectedAmounts: BigNumberish[],
      _thresholdAmount: BigNumberish,
      _isIssue: boolean,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    configs(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[string, string] & { router: string; quote: string }>;

    controller(overrides?: CallOverrides): Promise<[string]>;

    getSome(
      _setToken: string,
      _quantity: BigNumberish,
      _isIssue: boolean,
      overrides?: CallOverrides
    ): Promise<[string[], BigNumber[]]>;

    initialize(
      _setToken: string,
      _quote: string,
      _router: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initializeHook(
      _setToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    issue(
      _setToken: string,
      _quantity: BigNumberish,
      _to: string,
      _maxAmountIn: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    redeem(
      _setToken: string,
      _quantity: BigNumberish,
      _to: string,
      _mintAmountRedeemed: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeModule(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  _calculateSlippageAmounts(
    _expectedAmounts: BigNumberish[],
    _thresholdAmount: BigNumberish,
    _isIssue: boolean,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  configs(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<[string, string] & { router: string; quote: string }>;

  controller(overrides?: CallOverrides): Promise<string>;

  getSome(
    _setToken: string,
    _quantity: BigNumberish,
    _isIssue: boolean,
    overrides?: CallOverrides
  ): Promise<[string[], BigNumber[]]>;

  initialize(
    _setToken: string,
    _quote: string,
    _router: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initializeHook(
    _setToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  issue(
    _setToken: string,
    _quantity: BigNumberish,
    _to: string,
    _maxAmountIn: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  redeem(
    _setToken: string,
    _quantity: BigNumberish,
    _to: string,
    _mintAmountRedeemed: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeModule(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    _calculateSlippageAmounts(
      _expectedAmounts: BigNumberish[],
      _thresholdAmount: BigNumberish,
      _isIssue: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    configs(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[string, string] & { router: string; quote: string }>;

    controller(overrides?: CallOverrides): Promise<string>;

    getSome(
      _setToken: string,
      _quantity: BigNumberish,
      _isIssue: boolean,
      overrides?: CallOverrides
    ): Promise<[string[], BigNumber[]]>;

    initialize(
      _setToken: string,
      _quote: string,
      _router: string,
      overrides?: CallOverrides
    ): Promise<void>;

    initializeHook(_setToken: string, overrides?: CallOverrides): Promise<void>;

    issue(
      _setToken: string,
      _quantity: BigNumberish,
      _to: string,
      _maxAmountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    redeem(
      _setToken: string,
      _quantity: BigNumberish,
      _to: string,
      _mintAmountRedeemed: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    removeModule(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "SetTokenIssued(address,address,address,uint256)"(
      _setToken?: string | null,
      _issuer?: string | null,
      _to?: string | null,
      _quantity?: null
    ): SetTokenIssuedEventFilter;
    SetTokenIssued(
      _setToken?: string | null,
      _issuer?: string | null,
      _to?: string | null,
      _quantity?: null
    ): SetTokenIssuedEventFilter;

    "SetTokenRedeemed(address,address,address,uint256)"(
      _setToken?: string | null,
      _redeemer?: string | null,
      _to?: string | null,
      _quantity?: null
    ): SetTokenRedeemedEventFilter;
    SetTokenRedeemed(
      _setToken?: string | null,
      _redeemer?: string | null,
      _to?: string | null,
      _quantity?: null
    ): SetTokenRedeemedEventFilter;
  };

  estimateGas: {
    _calculateSlippageAmounts(
      _expectedAmounts: BigNumberish[],
      _thresholdAmount: BigNumberish,
      _isIssue: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    configs(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    controller(overrides?: CallOverrides): Promise<BigNumber>;

    getSome(
      _setToken: string,
      _quantity: BigNumberish,
      _isIssue: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      _setToken: string,
      _quote: string,
      _router: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initializeHook(
      _setToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    issue(
      _setToken: string,
      _quantity: BigNumberish,
      _to: string,
      _maxAmountIn: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    redeem(
      _setToken: string,
      _quantity: BigNumberish,
      _to: string,
      _mintAmountRedeemed: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeModule(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    _calculateSlippageAmounts(
      _expectedAmounts: BigNumberish[],
      _thresholdAmount: BigNumberish,
      _isIssue: boolean,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    configs(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    controller(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getSome(
      _setToken: string,
      _quantity: BigNumberish,
      _isIssue: boolean,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _setToken: string,
      _quote: string,
      _router: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initializeHook(
      _setToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    issue(
      _setToken: string,
      _quantity: BigNumberish,
      _to: string,
      _maxAmountIn: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    redeem(
      _setToken: string,
      _quantity: BigNumberish,
      _to: string,
      _mintAmountRedeemed: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeModule(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}