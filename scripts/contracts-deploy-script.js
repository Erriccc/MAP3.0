// // We require the Hardhat Runtime Environment explicitly here. This is optional
// // but useful for running the script in a standalone fashion through `node <script>`.
// //
// // When running the script with `npx hardhat run <script>` you'll find the Hardhat
// // Runtime Environment's members available in the global scope.
// const hre = require("hardhat");

// async function main() {
//   // Hardhat always runs the compile task when running scripts with its command
//   // line interface.
//   //
//   // If this script is run directly using `node` you may want to call compile
//   // manually to make sure everything is compiled
//   // await hre.run('compile');

//   // We get the contract to deploy
//   const Greeter = await hre.ethers.getContractFactory("Greeter");
//   const greeter = await Greeter.deploy("Hello, Hardhat!");

//   await greeter.deployed();

//   console.log("Greeter deployed to:", greeter.address);
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });





// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  // const Greeter = await hre.ethers.getContractFactory("Greeter");
  // const greeter = await Greeter.deploy("Hello, Hardhat!");
  // await greeter.deployed();



  // const StableCoin = await hre.ethers.getContractFactory("StableCoin");
  // const stableCoinInstance = await StableCoin.deploy();

  // await stableCoinInstance.deployed();

  const Map3Pay = await hre.ethers.getContractFactory("Map3Pay");
  const Map3PayInstance = await Map3Pay.deploy("0x6fe4668722E3195Fa897217A4Bdd6ee1d289543f","0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270");

  await Map3PayInstance.deployed();

  const VendorPlans = await hre.ethers.getContractFactory("VendorPlans");
  const VendorPlansInstance = await VendorPlans.deploy(Map3PayInstance.address);

  await VendorPlansInstance.deployed();
  // console.log("Greeter deployed to:", greeter.address);
  // console.log("stableCoinInstance deployed to:", stableCoinInstance.address);
  console.log("Map3PayInstance deployed to:", Map3PayInstance.address);
  console.log("VendorPlansInstance deployed to:", VendorPlansInstance.address);

}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
