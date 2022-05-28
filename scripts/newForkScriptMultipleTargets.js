const hre = require("hardhat");
const { ethers } = require("hardhat");
const {
    testAccount,
    etherToWei,
    weiToEther,
    createWeb3,
    createQueryString,
    waitForTxSuccess,
    createProvider,
    getTokenDecimal,
    numberExponentToLarge,
    WeiToWholeDecimals,
    WholeTOWeiDecimals,
    IERC20Abi,
    Map3address,
    approveSendersToken,
    map3Pay
} = require("../Utilities/utils")


// const Map3Abi = require( '../artifacts/contracts/Map3.sol/Map3Pay.json')
// const StableCoinAbi = require( '../artifacts/contracts/StableCoin.sol/StableCoin.json')
// const UniverseTokenAbi = require( '../artifacts/contracts/UniverseToken.sol/UniverseToken.json')

const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const WETHddress= "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
// const IERC20Abi = [
//   // Read-Only Functions
//   "function balanceOf(address owner) view returns (uint256)",
//   "function decimals() view returns (uint8)",
//   "function symbol() view returns (string)",
//   "function approve(address spender, uint256 amount) external returns (bool)",
//   "function allowance(address owner, address spender) external view returns (uint256)",
//   // Authenticated Functions
//   "function transfer(address to, uint amount) returns (bool)",
//   // Events
//   "event Transfer(address indexed from, address indexed to, uint amount)"
// ];


async function main() {
  let TargetAccount = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    // const accountsToImpersonate = {
    // //   accountToImpersonateDevour : '0x7E04f8E78b3048fe43d04152Ae265da5811d9Ad7',
    //   accountToImpersonateUsdc : '0xbFb5B0694460349304C8603a695eE92C7931eB14',
    // //   accountToImpersonateUsdt : '0xD30b438DF65f4f788563b2b3611Bd6059bFF4ad9',
    //   accountToImpersonateDai : '0x92af525a754029e99a8Ec15372A30568F52c6c41',
    //   accountToImpersonateWeth : '0xA75EDE99F376Dd47f3993Bc77037F61b5737C6EA', // , 0xFe238dB1dE2082bB9bA5dfC184B7e7C69C9bE636
    //   accountToImpersonateMatic : '0x2eE555C9006A9DC4674f01E0d4Dfc58e013708f0',
    //   accountToImpersonateBnb : '0x946575c5766497d6018D1a40905E34D92541cE77',
    //   accountToImpersonateZrx : '0x5a52E96BAcdaBb82fd05763E25335261B270Efcb' //, 0xC4804A21A74c916927Bf7f1A79Ff8005BDaDB732
    // }

    // const tokenAddresses = {
    // // DevourAddress : "0xDffC63f92c939deB112D88735ade3B4D21B6D491",
    // UsdcAddres : "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    // // UsdtAddres : "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    // DaiAddres : "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    // WethAddres : "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    // MaticAddres : "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    // BnbAddres : "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
    // ZrxAddres : "0xE41d2489571d322189246DaFA5ebDe1F4699F498",
    // }

    const tokenAddresses = [

    //"0xDffC63f92c939deB112D88735ade3B4D21B6D491",
        "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        // "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
    "0xE41d2489571d322189246DaFA5ebDe1F4699F498",
    ]

    const accountsToImpersonate = [
    //"0x7E04f8E78b3048fe43d04152Ae265da5811d9Ad7",
        '0xbFb5B0694460349304C8603a695eE92C7931eB14',
        // '0xD30b438DF65f4f788563b2b3611Bd6059bFF4ad9',
    '0x92af525a754029e99a8Ec15372A30568F52c6c41',
        '0xA75EDE99F376Dd47f3993Bc77037F61b5737C6EA',
            '0x2eE555C9006A9DC4674f01E0d4Dfc58e013708f0',
    '0x946575c5766497d6018D1a40905E34D92541cE77',
    '0x5a52E96BAcdaBb82fd05763E25335261B270Efcb',
    ]

    for (let i = 0; i<tokenAddresses.length;) {
        // c.push({status: a[b[i]], title:b[i]})
        // console.log("Whales reserve token:",tokenAddresses[i])
        // console.log("Wale",accountsToImpersonate[tokenAddresses[i]])
        // console.log(i," Wale:",accountsToImpersonate[i], " , ", "Whales reserve token: ", tokenAddresses[i])
        console.log('starting round ', i," ......")
        let  Whale = accountsToImpersonate[i];
        let reserveToken = tokenAddresses[i];



// Object.keys(accountsToImpersonate).forEach( function (key) { console.log(accountsToImpersonate[key]+':'+tokenAddresses[key]); } );
      // await localProvider.send('hardhat_impersonateAccount',[accountToImpersonateDai])
    //   const testAccount ="0xBb2cB98982Ed6547aA7E39707807253a999796b7"



      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [Whale],
      });

      let signer = await ethers.getSigner(Whale)
    // //   let TargetAccountSigner = await ethers.getSigner(TargetAccount)
      let myContract = new ethers.Contract(reserveToken,IERC20Abi,signer)
    // //   const myWethContract = new ethers.Contract(WETHddress,IERC20Abi,signer)
      let victimBal = await myContract.balanceOf(Whale) // changed variable from signerDaiBal to victimBal
      console.log("victim Bal, is: ",await WeiToWholeDecimals(reserveToken,victimBal))

      let transferbal = parseFloat(await WeiToWholeDecimals(reserveToken,victimBal)) - 0.01
    //   console.log("transferbal type check", typeof transferbal, transferbal)



    //   console.log("transferbal passed into transfer function type check",
    //    typeof await WholeTOWeiDecimals(reserveToken,transferbal.toString()),
    //    await WholeTOWeiDecimals(reserveToken,transferbal.toString()))



      let txmisc = await myContract.transfer(
        TargetAccount,
    //     await WeiToWholeDecimals(reserveToken,transferbal.toString())
    await WholeTOWeiDecimals(reserveToken,transferbal.toString())
      )
      await txmisc.wait()
    // //   console.log("txmisc: ", i ," ", txmisc)
    // // //   console.log(ethers.utils.parseEther(transferbal.toString()))
      let targetAccountBalance = await myContract.balanceOf(TargetAccount)
      console.log("TargetAccount is now rich asf: ",await WeiToWholeDecimals(reserveToken,targetAccountBalance))

      await hre.network.provider.request({
        method: "hardhat_stopImpersonatingAccount",
        params: [Whale],
      });


      console.log('cone with round: ', i)

        i++
      }

      console.log("Done Congrats!......")
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });