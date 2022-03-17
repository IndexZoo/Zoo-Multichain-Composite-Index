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

export interface ControllerInterface extends utils.Interface {
  contractName: "Controller";
  functions: {
    "addFactory(address)": FunctionFragment;
    "addFee(address,uint256,uint256)": FunctionFragment;
    "addModule(address)": FunctionFragment;
    "addResource(address,uint256)": FunctionFragment;
    "addSet(address)": FunctionFragment;
    "editFee(address,uint256,uint256)": FunctionFragment;
    "editFeeRecipient(address)": FunctionFragment;
    "factories(uint256)": FunctionFragment;
    "feeRecipient()": FunctionFragment;
    "fees(address,uint256)": FunctionFragment;
    "getFactories()": FunctionFragment;
    "getModuleFee(address,uint256)": FunctionFragment;
    "getModules()": FunctionFragment;
    "getResources()": FunctionFragment;
    "getSets()": FunctionFragment;
    "initialize(address[],address[],address[],uint256[])": FunctionFragment;
    "isFactory(address)": FunctionFragment;
    "isInitialized()": FunctionFragment;
    "isModule(address)": FunctionFragment;
    "isResource(address)": FunctionFragment;
    "isSet(address)": FunctionFragment;
    "isSystemContract(address)": FunctionFragment;
    "modules(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "removeFactory(address)": FunctionFragment;
    "removeModule(address)": FunctionFragment;
    "removeResource(uint256)": FunctionFragment;
    "removeSet(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "resourceId(uint256)": FunctionFragment;
    "resources(uint256)": FunctionFragment;
    "sets(uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "addFactory", values: [string]): string;
  encodeFunctionData(
    functionFragment: "addFee",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "addModule", values: [string]): string;
  encodeFunctionData(
    functionFragment: "addResource",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "addSet", values: [string]): string;
  encodeFunctionData(
    functionFragment: "editFee",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "editFeeRecipient",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "factories",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "feeRecipient",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "fees",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getFactories",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getModuleFee",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getModules",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getResources",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getSets", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string[], string[], string[], BigNumberish[]]
  ): string;
  encodeFunctionData(functionFragment: "isFactory", values: [string]): string;
  encodeFunctionData(
    functionFragment: "isInitialized",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "isModule", values: [string]): string;
  encodeFunctionData(functionFragment: "isResource", values: [string]): string;
  encodeFunctionData(functionFragment: "isSet", values: [string]): string;
  encodeFunctionData(
    functionFragment: "isSystemContract",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "modules",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "removeFactory",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "removeModule",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "removeResource",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "removeSet", values: [string]): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "resourceId",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "resources",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "sets", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "addFactory", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "addFee", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "addModule", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addResource",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addSet", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "editFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "editFeeRecipient",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "factories", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "feeRecipient",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "fees", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getFactories",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getModuleFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getModules", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getResources",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getSets", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isFactory", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isInitialized",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isModule", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isResource", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isSet", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isSystemContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "modules", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeFactory",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeModule",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeResource",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "removeSet", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "resourceId", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "resources", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sets", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "FactoryAdded(address)": EventFragment;
    "FactoryRemoved(address)": EventFragment;
    "FeeEdited(address,uint256,uint256)": EventFragment;
    "FeeRecipientChanged(address)": EventFragment;
    "ModuleAdded(address)": EventFragment;
    "ModuleRemoved(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "ResourceAdded(address,uint256)": EventFragment;
    "ResourceRemoved(address,uint256)": EventFragment;
    "SetAdded(address,address)": EventFragment;
    "SetRemoved(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "FactoryAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FactoryRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FeeEdited"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FeeRecipientChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ModuleAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ModuleRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ResourceAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ResourceRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetRemoved"): EventFragment;
}

export type FactoryAddedEvent = TypedEvent<[string], { _factory: string }>;

export type FactoryAddedEventFilter = TypedEventFilter<FactoryAddedEvent>;

export type FactoryRemovedEvent = TypedEvent<[string], { _factory: string }>;

export type FactoryRemovedEventFilter = TypedEventFilter<FactoryRemovedEvent>;

export type FeeEditedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  { _module: string; _feeType: BigNumber; _feePercentage: BigNumber }
>;

export type FeeEditedEventFilter = TypedEventFilter<FeeEditedEvent>;

export type FeeRecipientChangedEvent = TypedEvent<
  [string],
  { _newFeeRecipient: string }
>;

export type FeeRecipientChangedEventFilter =
  TypedEventFilter<FeeRecipientChangedEvent>;

export type ModuleAddedEvent = TypedEvent<[string], { _module: string }>;

export type ModuleAddedEventFilter = TypedEventFilter<ModuleAddedEvent>;

export type ModuleRemovedEvent = TypedEvent<[string], { _module: string }>;

export type ModuleRemovedEventFilter = TypedEventFilter<ModuleRemovedEvent>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type ResourceAddedEvent = TypedEvent<
  [string, BigNumber],
  { _resource: string; _id: BigNumber }
>;

export type ResourceAddedEventFilter = TypedEventFilter<ResourceAddedEvent>;

export type ResourceRemovedEvent = TypedEvent<
  [string, BigNumber],
  { _resource: string; _id: BigNumber }
>;

export type ResourceRemovedEventFilter = TypedEventFilter<ResourceRemovedEvent>;

export type SetAddedEvent = TypedEvent<
  [string, string],
  { _setToken: string; _factory: string }
>;

export type SetAddedEventFilter = TypedEventFilter<SetAddedEvent>;

export type SetRemovedEvent = TypedEvent<[string], { _setToken: string }>;

export type SetRemovedEventFilter = TypedEventFilter<SetRemovedEvent>;

export interface Controller extends BaseContract {
  contractName: "Controller";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ControllerInterface;

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
    addFactory(
      _factory: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addFee(
      _module: string,
      _feeType: BigNumberish,
      _newFeePercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addModule(
      _module: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addResource(
      _resource: string,
      _id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addSet(
      _setToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    editFee(
      _module: string,
      _feeType: BigNumberish,
      _newFeePercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    editFeeRecipient(
      _newFeeRecipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    factories(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    feeRecipient(overrides?: CallOverrides): Promise<[string]>;

    fees(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getFactories(overrides?: CallOverrides): Promise<[string[]]>;

    getModuleFee(
      _moduleAddress: string,
      _feeType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getModules(overrides?: CallOverrides): Promise<[string[]]>;

    getResources(overrides?: CallOverrides): Promise<[string[]]>;

    getSets(overrides?: CallOverrides): Promise<[string[]]>;

    initialize(
      _factories: string[],
      _modules: string[],
      _resources: string[],
      _resourceIds: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isFactory(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    isInitialized(overrides?: CallOverrides): Promise<[boolean]>;

    isModule(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    isResource(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    isSet(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    isSystemContract(
      _contractAddress: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    modules(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    removeFactory(
      _factory: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeModule(
      _module: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeResource(
      _id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeSet(
      _setToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    resourceId(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    resources(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    sets(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addFactory(
    _factory: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addFee(
    _module: string,
    _feeType: BigNumberish,
    _newFeePercentage: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addModule(
    _module: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addResource(
    _resource: string,
    _id: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addSet(
    _setToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  editFee(
    _module: string,
    _feeType: BigNumberish,
    _newFeePercentage: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  editFeeRecipient(
    _newFeeRecipient: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  factories(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  feeRecipient(overrides?: CallOverrides): Promise<string>;

  fees(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getFactories(overrides?: CallOverrides): Promise<string[]>;

  getModuleFee(
    _moduleAddress: string,
    _feeType: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getModules(overrides?: CallOverrides): Promise<string[]>;

  getResources(overrides?: CallOverrides): Promise<string[]>;

  getSets(overrides?: CallOverrides): Promise<string[]>;

  initialize(
    _factories: string[],
    _modules: string[],
    _resources: string[],
    _resourceIds: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isFactory(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  isInitialized(overrides?: CallOverrides): Promise<boolean>;

  isModule(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  isResource(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  isSet(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  isSystemContract(
    _contractAddress: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  modules(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  removeFactory(
    _factory: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeModule(
    _module: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeResource(
    _id: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeSet(
    _setToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  resourceId(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  resources(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  sets(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addFactory(_factory: string, overrides?: CallOverrides): Promise<void>;

    addFee(
      _module: string,
      _feeType: BigNumberish,
      _newFeePercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    addModule(_module: string, overrides?: CallOverrides): Promise<void>;

    addResource(
      _resource: string,
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    addSet(_setToken: string, overrides?: CallOverrides): Promise<void>;

    editFee(
      _module: string,
      _feeType: BigNumberish,
      _newFeePercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    editFeeRecipient(
      _newFeeRecipient: string,
      overrides?: CallOverrides
    ): Promise<void>;

    factories(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    feeRecipient(overrides?: CallOverrides): Promise<string>;

    fees(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFactories(overrides?: CallOverrides): Promise<string[]>;

    getModuleFee(
      _moduleAddress: string,
      _feeType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getModules(overrides?: CallOverrides): Promise<string[]>;

    getResources(overrides?: CallOverrides): Promise<string[]>;

    getSets(overrides?: CallOverrides): Promise<string[]>;

    initialize(
      _factories: string[],
      _modules: string[],
      _resources: string[],
      _resourceIds: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    isFactory(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    isInitialized(overrides?: CallOverrides): Promise<boolean>;

    isModule(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    isResource(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    isSet(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    isSystemContract(
      _contractAddress: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    modules(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    removeFactory(_factory: string, overrides?: CallOverrides): Promise<void>;

    removeModule(_module: string, overrides?: CallOverrides): Promise<void>;

    removeResource(_id: BigNumberish, overrides?: CallOverrides): Promise<void>;

    removeSet(_setToken: string, overrides?: CallOverrides): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    resourceId(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    resources(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    sets(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "FactoryAdded(address)"(_factory?: string | null): FactoryAddedEventFilter;
    FactoryAdded(_factory?: string | null): FactoryAddedEventFilter;

    "FactoryRemoved(address)"(
      _factory?: string | null
    ): FactoryRemovedEventFilter;
    FactoryRemoved(_factory?: string | null): FactoryRemovedEventFilter;

    "FeeEdited(address,uint256,uint256)"(
      _module?: string | null,
      _feeType?: BigNumberish | null,
      _feePercentage?: null
    ): FeeEditedEventFilter;
    FeeEdited(
      _module?: string | null,
      _feeType?: BigNumberish | null,
      _feePercentage?: null
    ): FeeEditedEventFilter;

    "FeeRecipientChanged(address)"(
      _newFeeRecipient?: null
    ): FeeRecipientChangedEventFilter;
    FeeRecipientChanged(
      _newFeeRecipient?: null
    ): FeeRecipientChangedEventFilter;

    "ModuleAdded(address)"(_module?: string | null): ModuleAddedEventFilter;
    ModuleAdded(_module?: string | null): ModuleAddedEventFilter;

    "ModuleRemoved(address)"(_module?: string | null): ModuleRemovedEventFilter;
    ModuleRemoved(_module?: string | null): ModuleRemovedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "ResourceAdded(address,uint256)"(
      _resource?: string | null,
      _id?: null
    ): ResourceAddedEventFilter;
    ResourceAdded(
      _resource?: string | null,
      _id?: null
    ): ResourceAddedEventFilter;

    "ResourceRemoved(address,uint256)"(
      _resource?: string | null,
      _id?: null
    ): ResourceRemovedEventFilter;
    ResourceRemoved(
      _resource?: string | null,
      _id?: null
    ): ResourceRemovedEventFilter;

    "SetAdded(address,address)"(
      _setToken?: string | null,
      _factory?: string | null
    ): SetAddedEventFilter;
    SetAdded(
      _setToken?: string | null,
      _factory?: string | null
    ): SetAddedEventFilter;

    "SetRemoved(address)"(_setToken?: string | null): SetRemovedEventFilter;
    SetRemoved(_setToken?: string | null): SetRemovedEventFilter;
  };

  estimateGas: {
    addFactory(
      _factory: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addFee(
      _module: string,
      _feeType: BigNumberish,
      _newFeePercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addModule(
      _module: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addResource(
      _resource: string,
      _id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addSet(
      _setToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    editFee(
      _module: string,
      _feeType: BigNumberish,
      _newFeePercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    editFeeRecipient(
      _newFeeRecipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    factories(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    feeRecipient(overrides?: CallOverrides): Promise<BigNumber>;

    fees(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFactories(overrides?: CallOverrides): Promise<BigNumber>;

    getModuleFee(
      _moduleAddress: string,
      _feeType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getModules(overrides?: CallOverrides): Promise<BigNumber>;

    getResources(overrides?: CallOverrides): Promise<BigNumber>;

    getSets(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      _factories: string[],
      _modules: string[],
      _resources: string[],
      _resourceIds: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isFactory(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    isInitialized(overrides?: CallOverrides): Promise<BigNumber>;

    isModule(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    isResource(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    isSet(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    isSystemContract(
      _contractAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    modules(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    removeFactory(
      _factory: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeModule(
      _module: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeResource(
      _id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeSet(
      _setToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    resourceId(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    resources(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    sets(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addFactory(
      _factory: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addFee(
      _module: string,
      _feeType: BigNumberish,
      _newFeePercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addModule(
      _module: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addResource(
      _resource: string,
      _id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addSet(
      _setToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    editFee(
      _module: string,
      _feeType: BigNumberish,
      _newFeePercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    editFeeRecipient(
      _newFeeRecipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    factories(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    feeRecipient(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    fees(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFactories(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getModuleFee(
      _moduleAddress: string,
      _feeType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getModules(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getResources(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getSets(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initialize(
      _factories: string[],
      _modules: string[],
      _resources: string[],
      _resourceIds: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isFactory(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isInitialized(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isModule(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isResource(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isSet(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isSystemContract(
      _contractAddress: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    modules(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeFactory(
      _factory: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeModule(
      _module: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeResource(
      _id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeSet(
      _setToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    resourceId(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    resources(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    sets(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
