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

import {initUniswapRouter} from "./context";
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

    it.only("real router", async function() {
      let router = await initUniswapRouter(ctx.accounts.owner, ctx.tokens.weth, ctx.tokens.dai, ctx.tokens.btc);
      let amounts = await router.getAmountsOut(ether(1), [ctx.tokens.weth.address, ctx.tokens.dai.address]);
      console.log(amounts);
    });

});