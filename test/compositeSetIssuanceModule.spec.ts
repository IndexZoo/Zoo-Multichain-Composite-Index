import chai, { Assertion, expect } from "chai";
import { ethers } from "hardhat";
import { solidity } from "ethereum-waffle";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";
import {
  ether, 
  approx, 
  preciseDiv,
  preciseMul
} from "../utils/helpers";

import "./types";
import { Context } from "./context";
import { Account } from "@utils/types";
import { MAX_INT_256 } from "../utils/constants";
import { StandardTokenMock } from "@typechain/StandardTokenMock";
import { BalanceTracker } from "./BalanceTracker";
import { SetToken } from "@typechain/SetToken";



chai.use(solidity);
chai.use(approx);

// DONE: set dai to be externalPosition Unit
// - OBS: create lib ExternallyInvokable in module to be invoked by External module
// TODO: more tests - restructure
// TODO: do document contracts
// DONE: Implement Redeem
// TODO: Test Multiple issue and redeem
// DONE: Test real uniswap
//  -- DONE: Embed real uniswap in elegant way

describe("Composite IssuanceModule ", function () {
  let ctx: Context;
  let bob: Account;
  let dai: StandardTokenMock;
  let daiTracker: BalanceTracker;
  let setToken: SetToken;

    describe("Testing Issuing and redeeming using mocked uniswap fixture", async function () {
      beforeEach("", async () => {
        ctx = new Context();
        await ctx.initialize();
        setToken = ctx.sets[0];
        bob = ctx.accounts.bob;
        dai = ctx.tokens.dai;
        daiTracker = new BalanceTracker(dai);
      });
      it("check amount of dai spent to issue 1 index", async function () {
        /**
         * Bob issues 200 dai worth of index ~ 1 index
         * Verify that Bob spent that amount of dai to issue the index
         */
        let daiPerUnit = ether(200);
        await ctx.tokens.dai.connect(bob.wallet).approve(ctx.subjectModule!.address, MAX_INT_256);
        await daiTracker.push(bob.address);
        await ctx.subjectModule!.connect(ctx.accounts.bob.wallet).issue(
          setToken.address,
          ether(1),
          ctx.accounts.bob.address,
          ether(1).mul(202)
        );
        await daiTracker.push(bob.address);
        expect(daiTracker.totalSpent(bob.address)).to.eq(daiPerUnit);
      });

      it("issue amount of 1 index", async function () {
        /**
         * Bob issues 200 dai worth of index ~ 1 index
         * Verify that Bob ended up with balance of 1 index ~ 1e18
         */
        let daiPerUnit = ether(200);
        let quantity = ether(1);
        await ctx.tokens.dai.connect(bob.wallet).approve(ctx.subjectModule!.address, MAX_INT_256);
        await daiTracker.push(bob.address);
        await ctx.subjectModule!.connect(ctx.accounts.bob.wallet).issue(
          setToken.address,
          quantity,
          ctx.accounts.bob.address,
          preciseMul(quantity, ether(202))
        );
        await daiTracker.push(bob.address);
        expect(await setToken.balanceOf(bob.address)).to.be.eq(quantity);
      });

      it("Redeem amount of 0.5 index", async function () {
        /**
         * Bob issues 200 dai worth of index ~ 1 index
         * Bob redeems 0.5 index ~ 100 dai
         * Bob expected to have spent 100 dai overall (i.e. spent 200 then gained 100)
         */
        let daiPerUnit = ether(200);    // amount of dai per index
        let quantity = ether(1);
        await ctx.tokens.dai.connect(bob.wallet).approve(ctx.subjectModule!.address, MAX_INT_256);
        await daiTracker.push(bob.address);
        await ctx.subjectModule!.connect(ctx.accounts.bob.wallet).issue(
          setToken.address,
          quantity,
          ctx.accounts.bob.address,
          preciseMul(quantity, ether(202))
        );
        await daiTracker.push(bob.address);
        await  ctx.subjectModule!.connect(bob.wallet).redeem(
          setToken.address,
          quantity.div(2),
          bob.address,
          daiPerUnit.div(2).mul(95).div(100) 
        );
        await daiTracker.push(bob.address);
        expect(daiTracker.totalSpent(bob.address)).to.be.eq(daiPerUnit.div(2));
      });
    });

    describe.only("Testing Issuing and redeeming using real uniswap fixture", async function () {
      beforeEach("", async () => {
        ctx = new Context();
        await ctx.initialize(false);
        setToken = ctx.sets[0];
        bob = ctx.accounts.bob;
        dai = ctx.tokens.dai;
        daiTracker = new BalanceTracker(dai);
      });
      it("check amount of dai spent to issue 0.01 index", async function () {
        /**
         * Bob issues 2 dai worth of index ~ 0.01 index
         * Verify that Bob spent that amount of dai to issue the index
         */
        let daiIn = ether(2);
        await ctx.tokens.dai.connect(bob.wallet).approve(ctx.subjectModule!.address, MAX_INT_256);
        await daiTracker.push(bob.address);
        await ctx.subjectModule!.connect(ctx.accounts.bob.wallet).issue(
          setToken.address,
          ether(0.01),
          ctx.accounts.bob.address,
          ether(0.01).mul(204)
        );
        await daiTracker.push(bob.address);

        expect(daiTracker.totalSpent(bob.address)).to.gt(daiIn);
        expect(daiTracker.totalSpent(bob.address)).to.be.approx(daiIn);
      });

      it("issue amount of .01 index and veryify index balance is exactly equal that", async function () {
        /**
         * Bob issues about 2 dai worth of index ~ 0.01 index
         * Verify that Bob ended up with balance of 0.01 index ~ 1e16
         */
        let daiIn = ether(2);
        let quantity = ether(0.01);
        await ctx.tokens.dai.connect(bob.wallet).approve(ctx.subjectModule!.address, MAX_INT_256);
        await ctx.subjectModule!.connect(ctx.accounts.bob.wallet).issue(
          setToken.address,
          quantity,
          ctx.accounts.bob.address,
          preciseMul(quantity, ether(202))
        );
        expect(await setToken.balanceOf(bob.address)).to.be.eq(quantity);
      });

      it("Redeem amount of 0.5 index", async function () {
        /**
         * Bob issues 2 dai worth of index ~ 0.01 index
         * Bob redeems 0.005 index ~ 1 dai
         * Bob expected to have spent about 1 dai overall (i.e. spent 2 then gained 1)
         * Bob is expected though to have spent little more than 1 dai (i.e. uniswap fees)
         */
        
        let daiIn = ether(2);    // amount of dai per index
        let quantity = ether(0.01);
        await ctx.tokens.dai.connect(bob.wallet).approve(ctx.subjectModule!.address, MAX_INT_256);
        await daiTracker.push(bob.address);
        await ctx.subjectModule!.connect(ctx.accounts.bob.wallet).issue(
          setToken.address,
          quantity,
          ctx.accounts.bob.address,
          preciseMul(quantity, ether(204))
        );
        await daiTracker.push(bob.address);
        await  ctx.subjectModule!.connect(bob.wallet).redeem(
          setToken.address,
          quantity.div(2),
          bob.address,
          daiIn.div(2).mul(95).div(100) 
        );
        await daiTracker.push(bob.address);
        expect(daiTracker.totalSpent(bob.address)).to.be.gt(daiIn.div(2));  // due to uniswap fees
        expect(daiTracker.totalSpent(bob.address)).to.be.approx(daiIn.div(2));
      });
    });
});