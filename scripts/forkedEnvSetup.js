const hre = require("hardhat");
const { ethers } = require("hardhat");

// const Map3Abi = require( '../artifacts/contracts/Map3.sol/Map3Pay.json')
// const StableCoinAbi = require( '../artifacts/contracts/StableCoin.sol/StableCoin.json')
// const UniverseTokenAbi = require( '../artifacts/contracts/UniverseToken.sol/UniverseToken.json')

const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const WETHddress= "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const IERC20Abi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",
  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)"
];


async function main() {
  let TargetAccount = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

      const accountToImpersonateUsdc = '0xbFb5B0694460349304C8603a695eE92C7931eB14'
      const accountToImpersonateUsdt = '0xD30b438DF65f4f788563b2b3611Bd6059bFF4ad9'
      const accountToImpersonateDai = '0x92af525a754029e99a8Ec15372A30568F52c6c41'
      const accountToImpersonateWeth = '0xFe238dB1dE2082bB9bA5dfC184B7e7C69C9bE636'
      const accountToImpersonateMatic = '0x2eE555C9006A9DC4674f01E0d4Dfc58e013708f0'
      const accountToImpersonateBnb = '0x946575c5766497d6018D1a40905E34D92541cE77'
      const accountToImpersonateZrx = '0xC4804A21A74c916927Bf7f1A79Ff8005BDaDB732'

      const WethAddres = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
      const UsdcAddres = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
      const UsdtAddres = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
      const DaiAddres = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
      const MaticAddres = "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0"
      const BnbAddres = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52"
      const ZrxAddres = "0xE41d2489571d322189246DaFA5ebDe1F4699F498"
      
      // await localProvider.send('hardhat_impersonateAccount',[accountToImpersonateDai])
      const testAccount ="0xBb2cB98982Ed6547aA7E39707807253a999796b7"
      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [accountToImpersonateDai],
      });
      const signer = await ethers.getSigner(accountToImpersonateDai)
    //   const TargetAccountSigner = await ethers.getSigner(TargetAccount)
      const myDaiContract = new ethers.Contract(DAIAddress,IERC20Abi,signer)
    //   const myWethContract = new ethers.Contract(WETHddress,IERC20Abi,signer)
      const victimDaiBal = await myDaiContract.balanceOf(accountToImpersonateDai) // changed variable from signerDaiBal to victimDaiBal
      console.log("victimDaiBal, is: ",ethers.utils.formatEther(victimDaiBal))
      const transferbal = parseFloat(ethers.utils.formatEther(victimDaiBal)) - 0.01
      const txmisc = await myDaiContract.transfer(
        TargetAccount,
          ethers.utils.parseEther(transferbal.toString())
      )
      await txmisc.wait()
      // console.log("txmisc: ", txmisc)
    //   console.log(ethers.utils.parseEther(transferbal.toString()))
      const targetAccountBalance = await myDaiContract.balanceOf(TargetAccount)
      await console.log("TargetAccount is now rich asf: ",ethers.utils.formatEther(targetAccountBalance))

      await hre.network.provider.request({
        method: "hardhat_stopImpersonatingAccount",
        params: [accountToImpersonateDai],
      });

}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });