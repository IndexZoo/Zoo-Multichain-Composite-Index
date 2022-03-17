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

// TODO: set dai to be externalPosition Unit
// - TODO: create lib ExternallyInvokable in module to be invoked by External module
// TODO: Implement Redeem 
// TODO: Test Multiple issue and redeem
// TODO: Test real uniswap

describe("Testing Ecosystem", function () {
  let ctx: Context;
  let bob: Account;
  let dai: StandardTokenMock;
  let daiTracker: BalanceTracker;
  let setToken: SetToken;
    beforeEach("", async () => {
      ctx = new Context();
      await ctx.initialize();
      setToken = ctx.sets[0];
      bob = ctx.accounts.bob;
      dai = ctx.tokens.dai;
      daiTracker = new BalanceTracker(dai);
    });
    it.only("check amount of dai spent to issue 1 index", async function () {
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
});