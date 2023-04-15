
const hre = require("hardhat");
const { ethers } = require("hardhat");
async function main() {

    const wallet = ethers.Wallet.createRandom()
    console.log('address:', wallet.address)
    console.log('mnemonic:', wallet.mnemonic.phrase)
    console.log('privateKey:', wallet.privateKey)

// // Signing a message
// await walletMnemonic.signMessage("Hello World")
// // '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c'

// tx = {
//   to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
//   value: utils.parseEther("1.0")
// }

// // Signing a transaction
// await walletMnemonic.signTransaction(tx)
// // '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc'

// // The connect method returns a new instance of the
// // Wallet connected to a provider
// wallet = walletMnemonic.connect(provider)

// // Querying the network
// await wallet.getBalance();
// // { BigNumber: "6846" }
// await wallet.getTransactionCount();
// // 3

// // Sending ether
// await wallet.sendTransaction(tx)


}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });