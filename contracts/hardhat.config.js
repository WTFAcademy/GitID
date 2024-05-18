require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-truffle5');
require("hardhat-abi-exporter");
require("hardhat-deploy");
require("hardhat-deploy-ethers");

let accounts = [];

if(process.env.OWNER_KEY) {
  accounts = [process.env.OWNER_KEY];
} else {
  console.log("no owner key");
}

module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.8.20',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10000,
          },
        },
      },
    ],
  },
  abiExporter: {
    path: './build/contracts',
    clear: true,
    flat: true,
    spacing: 2
  },
  networks: {
    sepolia: {
      url: `https://sepolia.blast.io`,
      tags: ["test", "use_root"],
      chainId: 168587773,
      accounts: accounts,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    owner: {
      default: 0, //先默认同一个
    },
  },
};
