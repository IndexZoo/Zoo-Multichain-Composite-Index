import chai, { Assertion, expect } from "chai";
import { ethers } from "hardhat";
import { solidity } from "ethereum-waffle";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";
import {ether, approx} from "../utils/helpers";

import "./types";
import { Context } from "./context";
import { Account } from "@utils/types";
import { MAX_INT_256 } from "../utils/constants";
import { StandardTokenMock } from "@typechain/StandardTokenMock";
import { BalanceTracker } from "./BalanceTracker";
chai.use(solidity);
chai.use(approx);


describe("Testing Ecosystem", function () {
  let ctx: Context;
  let bob: Account;
  let dai: StandardTokenMock;
  let daiTracker: BalanceTracker;
    beforeEach("", async () => {
      ctx = new Context();
      await ctx.initialize();
      bob = ctx.accounts.bob;
      dai = ctx.tokens.dai;
      daiTracker = new BalanceTracker(dai);
    });
    it("Created Set", async function () {
      let sToken = ctx.sets[0];
      console.log(sToken.address);
    });
    it("Get Components", async function () {
      let sToken = ctx.sets[0];
      console.log(await sToken.getComponents());
    });
    


    it("router -- xx ", async function () {
      console.log((await ctx.subjectModule!.configs(ctx.sets[0].address))) ;
    });
    it("getIssuanceUnits -- xx ", async function () {
      console.log(await ctx.subjectModule!.getSome(ctx.sets[0].address, ether(10), true)) ;
    });


    it.only("external position mods", async function () {
      let setToken = ctx.sets[0];
      let components = await setToken.getComponents();
      // let external1 = await setToken.getExternalPositionModules(components[0]);
      // console.log(external1);
    });
});