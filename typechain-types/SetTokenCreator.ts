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

export interface SetTokenCreatorInterface extends utils.Interface {
  contractName: "SetTokenCreator";
  functions: {
    "controller()": FunctionFragment;
    "create(address[],int256[],address[],address,string,string)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "controller",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "create",
    values: [string[], BigNumberish[], string[], string, string, string]
  ): string;

  decodeFunctionResult(functionFragment: "controller", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "create", data: BytesLike): Result;

  events: {
    "SetTokenCreated(address,address,string,string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "SetTokenCreated"): EventFragment;
}

export type SetTokenCreatedEvent = TypedEvent<
  [string, string, string, string],
  { _setToken: string; _manager: string; _name: string; _symbol: string }
>;

export type SetTokenCreatedEventFilter = TypedEventFilter<SetTokenCreatedEvent>;

export interface SetTokenCreator extends BaseContract {
  contractName: "SetTokenCreator";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SetTokenCreatorInterface;

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
    controller(overrides?: CallOverrides): Promise<[string]>;

    create(
      _components: string[],
      _units: BigNumberish[],
      _modules: string[],
      _manager: string,
      _name: string,
      _symbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  controller(overrides?: CallOverrides): Promise<string>;

  create(
    _components: string[],
    _units: BigNumberish[],
    _modules: string[],
    _manager: string,
    _name: string,
    _symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    controller(overrides?: CallOverrides): Promise<string>;

    create(
      _components: string[],
      _units: BigNumberish[],
      _modules: string[],
      _manager: string,
      _name: string,
      _symbol: string,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "SetTokenCreated(address,address,string,string)"(
      _setToken?: string | null,
      _manager?: null,
      _name?: null,
      _symbol?: null
    ): SetTokenCreatedEventFilter;
    SetTokenCreated(
      _setToken?: string | null,
      _manager?: null,
      _name?: null,
      _symbol?: null
    ): SetTokenCreatedEventFilter;
  };

  estimateGas: {
    controller(overrides?: CallOverrides): Promise<BigNumber>;

    create(
      _components: string[],
      _units: BigNumberish[],
      _modules: string[],
      _manager: string,
      _name: string,
      _symbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    controller(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    create(
      _components: string[],
      _units: BigNumberish[],
      _modules: string[],
      _manager: string,
      _name: string,
      _symbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
