require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0"
      }
    ]
  },
  networks: {
    kiln: {
      url: process.env.KILN_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};