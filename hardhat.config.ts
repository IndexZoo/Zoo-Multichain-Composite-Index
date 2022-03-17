
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.6.10",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true
    },
  },
  // @ts-ignore
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v5",
    externalArtifacts: ["external/**/*.json"],
  },
};

export default config;
