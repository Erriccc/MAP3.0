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

  const UnivereseToken = await hre.ethers.getContractFactory("UniVotingToken");
  const univereseTokenInstance = await UnivereseToken.deploy();

  await univereseTokenInstance.deployed();

  const Map3 = await hre.ethers.getContractFactory("Map3Pay");
  const map3Instance = await Map3.deploy(univereseTokenInstance.address,"0xC1FbB4C2F4CE9eF87d42A0ea49683E0Cfb003f2F");

  await map3Instance.deployed();
  // console.log("Greeter deployed to:", greeter.address);
  // console.log("stableCoinInstance deployed to:", stableCoinInstance.address);
  console.log("univereseTokenInstance deployed to:", univereseTokenInstance.address);
  console.log("map3Instance deployed to:", map3Instance.address);

}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
