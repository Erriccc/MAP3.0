require("@nomiclabs/hardhat-waffle");

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

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.7",
  networks: {
    // hardhat: {
    //   forking: {
    //     // url: process.env.NEXT_PUBLIC_JSON_RPC_URL_MAINET,
    //     url: "https://mainnet.infura.io/v3/2c1ded31ea7a436ca9a3ffe3059bb6c2",
    //   }
    // },
    //   hardhat: {
    //   forking: {
    //     // url: process.env.NEXT_PUBLIC_JSON_RPC_URL_MAINET,
    //     url: "https://polygon-rpc.com",
    //     gas: 210000000000,
    //       gasPrice: 80000000000000
    //   }
    // },
    // },
    matic: {
      url: "https://polygon-rpc.com",
      gas: 21000000000,
      gasPrice: 80000000000000
    }
  }
};

// npx hardhat run --network localhost scripts/contracts-deploy-script.js
// npx hardhat node