require("@nomicfoundation/hardhat-toolbox");
// require("@nomiclabs/hardhat-waffle");
// require("@nomiclabs/hardhat-ethers");
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.9",
  networks: {
    localhost: {
      url: "http://localhost:8545", // Replace with your local Ethereum node URL
      chainId: 31337, // Replace with the correct chain ID
    },
  },
  paths: {
    artifacts: "./src/artifacts",
    sources: "./contracts",
  },
  contract: "PersonalDataStorage",
};