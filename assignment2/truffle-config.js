/*
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

const mnemonic = process.env.MNEMONIC;
const infuraProjectId = process.env.INFURA_PROJECT_ID;

module.exports = {
  networks: {
    sepolia: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://sepolia.infura.io/v3/${infuraProjectId}`
        ),
        network_id: 11155111,
        gas: 8000000,  // Set to a lower gas limit, 8 million in this case
        gasPrice: 20000000000, // 20 Gwei gas price
        confirmations: 2,
        timeoutBlocks: 200,
        skipDryRun: true  // Skip dry run before migrations
    },
  },
  compilers: {
    solc: {
      version: '0.8.0', // Match your Solidity version
    },
  },
};
*/

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, // Default Ganache port
      network_id: "*",
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
};