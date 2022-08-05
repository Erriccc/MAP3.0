'use strict'

//providers.JsonRpcProvider()
const HDWalletProvider = require('@truffle/hdwallet-provider');
const BigNumber = require('bignumber.js');
const process = require('process');
const Web3 = require('web3');
const Map3AbiPlaceHolder = require( '../artifacts/contracts/Map3Pay.sol/Map3Pay.json')
// const Map3Abi = Map3AbiPlaceHolder.abi;
const Map3Abi = require( './map3PayABI.json')
const Map3VendorsABi = require( './map3VendorPlansABI.json')
const uniVoteAbi = require( './univotetoken.json')
// const Map3WebsiteUrl = "https://www.map3.com"
const Map3WebsiteUrl = "http://10.0.0.232:3001"


const PaymentHandlerEndpoint = 'api/oxQuoteHandler' // "api/oxQuoteHandler"
const map3SameTokenTransferEndpoint = 'api/map3pay/map3sametokentransfer' // "api/paymentHandler"
const map3SwapAndTransferEndpoint = 'api/map3pay/map3swapandtransfer' // "api/paymentHandler"
const map3SignUpEndpoint = 'api/map3signup' // "api/paymentHandler"
const map3ApproveEndpoint = 'api/map3pay/map3approve' 

const  { ethers }=require( "ethers"); // from hardhat throws error "Can't resolve 'console'"
// const  Map3Polygon3="0x8f7594BB3D4863304b7fb08Fb1BEFb9206d572EC";
// const  Map3PolygonTEST6="0x4e5Ae028918EB31FD5Ba99DcBCf608763272B4e3"
// const  Map3PolygonTEST7="0x1c0a74133BF980860cdf592d71d7dc7784e8D7f8" // with plans and sending eth transactions
const  Map3PolygonTEST7="0xa1784087D227e9891FEd0ED04f2f2Ad5361573Ad" // with plans and sending eth transactions
const  Map3PolygonTEST8="0x0158345e52522C57ce34773c89D0214c2d10edd1" // with plans and sending eth transactions, fixed bug


const  Map3VendorPlansPolgonTest1="0xfdD4e6BFC94a402bC40161067fC29860518159Ca" // with plans and sending eth transactions
const  Map3VendorPlansPolgonTest2="0x3095d04AdC87dF6C50A9de0A5106602DB6fc902e" // with plans and sending eth transactions

const  Map3address=Map3PolygonTEST8;
const  Map3VendorAddress=Map3VendorPlansPolgonTest2;


const testAccount ="0x6fe4668722E3195Fa897217A4Bdd6ee1d289543f";
const vendorSignUpFee = 0;
const slippage = 1.15;


const EthAddress = "0x0000000000000000000000000000000000000000";
const _wethAddresses = {
    mainnet: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    // polygon: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    polygon: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
}
const WethAddress = _wethAddresses. polygon;

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
  ]
// const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_JSON_RPC_URL_POLYGON)
// const provider = new ethers.providers.Web3Provider(window.ethereum)
const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com")
// const provider = new ethers.providers.JsonRpcProvider()


// const API_QUOTE_URL = 'https://api.0x.org/swap/v1/quote';//https://polygon.api.0x.org/swap/v1/price
const API_QUOTE_URL = 'https://polygon.api.0x.org/swap/v1/quote';
const { MNEMONIC, RPC_URL } = process.env;

function createQueryString(params) {
    return Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&');
}

// Wait for a web3 tx `send()` call to be mined and return the receipt.
function waitForTxSuccess(tx) {
    return new Promise((accept, reject) => {
        try {
            tx.on('error', err => reject(err));
            tx.on('receipt', receipt => accept(receipt));
        } catch (err) {
            reject(err);
        }
    });
}

function createProvider() {
    const provider = /^ws?:\/\//.test(RPC_URL)
        ? new Web3.providers.WebsocketProvider(RPC_URL)
        : new Web3.providers.HttpProvider(RPC_URL);
    if (!MNEMONIC) {
        return provider;
    }
    return new HDWalletProvider({ mnemonic: MNEMONIC, providerOrUrl: provider });
}

function createWeb3() {
    return new Web3(createProvider());
}

function etherToWei(etherAmount) {
    return new BigNumber(etherAmount)
        .times('1e18')
        .integerValue()
        .toString(10);
}

function weiToEther(weiAmount) {
    return new BigNumber(weiAmount)
        .div('1e18')
        .toString(10);
}

function numberExponentToLarge(numIn) {
    numIn +="";                                            // To cater to numric entries
    let sign="";                                           // To remember the number sign
    numIn.charAt(0)=="-" && (numIn =numIn.substring(1),sign ="-"); // remove - sign & remember it
    let str = numIn.split(/[eE]/g);                        // Split numberic string at e or E
    if (str.length<2) return sign+numIn;                   // Not an Exponent Number? Exit with orginal Num back
    let power = str[1];                                    // Get Exponent (Power) (could be + or -)
    let deciSp = 1.1.toLocaleString().substring(1,2);  // Get Deciaml Separator
    str = str[0].split(deciSp);                        // Split the Base Number into LH and RH at the decimal point
    let baseRH = str[1] || "",                         // RH Base part. Make sure we have a RH fraction else ""
        baseLH = str[0];                               // LH base part.
     if (power>=0) {   // ------- Positive Exponents (Process the RH Base Part)
        if (power> baseRH.length) baseRH +="0".repeat(power-baseRH.length); // Pad with "0" at RH
        baseRH = baseRH.slice(0,power) + deciSp + baseRH.slice(power);      // Insert decSep at the correct place into RH base
         if (baseRH.charAt(baseRH.length-1) ==deciSp) baseRH =baseRH.slice(0,-1); // If decSep at RH end? => remove it
     } else {         // ------- Negative exponents (Process the LH Base Part)
        let num= Math.abs(power) - baseLH.length;                               // Delta necessary 0's
        if (num>0) baseLH = "0".repeat(num) + baseLH;                       // Pad with "0" at LH
        baseLH = baseLH.slice(0, power) + deciSp + baseLH.slice(power);     // Insert "." at the correct place into LH base
        if (baseLH.charAt(0) == deciSp) baseLH="0" + baseLH;                // If decSep at LH most? => add "0"
  
     }
     // Rremove leading and trailing 0's and Return the long number (with sign)
     return sign + (baseLH + baseRH).replace(/^0*(\d+|\d+\.\d+?)\.?0*$/,"$1");
   }

   const  getTokenDecimal = async (_tokenAddress) =>{
    const myContract = new ethers.Contract(_tokenAddress,IERC20Abi,provider)
    const tokenDecimals = await myContract.decimals()
    console.log("tokenDecimals from function getTokenDecimal in utils :", tokenDecimals)
    return tokenDecimals;
  }
  const  getTokenSymbol = async (_tokenAddress) =>{
    const myContract = new ethers.Contract(_tokenAddress,IERC20Abi,provider)
    const tokenSymbol = await myContract.symbol()
    console.log("tokenDecimals from function getTokenSymbol in utils:", tokenSymbol)
    return tokenSymbol;
  }
  const WholeTOWeiDecimals = async (_tokenAddress, _num) => {
    let tempNum =_num
    if(typeof _num !== "string" ){
      tempNum =_num.toString()
    }
    const tokenDecimals= await getTokenDecimal(_tokenAddress)
    const convertedToTokenDecimals = ethers.utils.parseUnits(tempNum,tokenDecimals).toString();
    console.log("passed the WholeTOWeiDecimals conversion test. type of input changed from:", typeof _num, "to: ", typeof convertedToTokenDecimals )
    return convertedToTokenDecimals;
  }

  const getSendersAllowanceBalance = async (ownersTokenAddress,owner) => {
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    const allowanceContract = new ethers.Contract(ownersTokenAddress,IERC20Abi,provider)
    const tx1 = await allowanceContract.allowance(owner,Map3address)
    return tx1
}
const getSendersAllowanceBalanceInWei = async (ownersTokenAddress,owner) => {
  const allowanceContract = new ethers.Contract(ownersTokenAddress,IERC20Abi,provider)
  const tx0 = await allowanceContract.allowance(owner,Map3address)
  const tx1 = Number(tx0._hex)
  return tx1 // returns long number
}
const getUserErc20Balance = async (tokenAddress,owner) => {
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    const tokenContract = new ethers.Contract(tokenAddress,IERC20Abi,provider)
    const tx0 = await tokenContract.balanceOf(owner)
    const tx1 = ethers.utils.formatUnits(
        tx0, await getTokenDecimal(tokenAddress,owner ))
    return tx1
}
const getUserErc20BalanceInWei = async (tokenAddress,owner) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const tokenContract = new ethers.Contract(tokenAddress,IERC20Abi,provider)
  const tx0 = await tokenContract.balanceOf(owner)
  // Number(tx0)
  const tx1 = Number(tx0._hex)
  return tx1
}

const getUserNativeBalance = async (owner) => {
  let balance = await provider.getBalance(owner);
  const tx1 = ethers.utils.formatUnits( balance, 18);
  console.log("eth balamce requested...", tx1)
  return tx1
}
const getUserNativeBalanceInWei = async (owner) => {
  let balance = await provider.getBalance(owner);
  // Number(balance)
  const tx1 = Number(balance._hex)
  console.log("eth balamce requested...", tx1)
  return tx1
}


  const WeiToWholeDecimals = async (_tokenAddress, _num) => {

    /////////Note if Error or bug
    // 1: remove the next 4 lines after comment
    // 2: change tempNum back to _num in line 6 from this comment
    //   let tempNum =_num
    // if(typeof isNaN(_num) ){
    //   tempNum = Number(_num)
    // }
    const tokenDecimals= await getTokenDecimal(_tokenAddress)
    const convertedToTokenDecimals = ethers.utils.formatUnits(_num,tokenDecimals);
    return convertedToTokenDecimals;
  }

  const approveSendersTokenData = (spenderAddress,approveAmount) => {
    const approveAnyTokenData =  [spenderAddress,approveAmount]
    console.log("constructing approveTokenData from oxPay api.....")
    const approveTokenData =    functionBytesEncoder(IERC20Abi,"approve",approveAnyTokenData)
  console.log("typeOf approveTokenData: ", typeof approveTokenData)
    console.log("completed approveTokenData from oxPay : ", approveTokenData)
    return(approveTokenData)
}




  // WRITE FUNCTION FOR FRONT END!!
  const approveSendersTokenExecutor = async (spenderTokenAddress,approveTokenData) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const aprovalSigner = provider.getSigner()
    
    console.log("executing approveSendersTokenExecutor......")
    const approvedTokenTx = await bytesEncodedBytesImplementor(aprovalSigner,spenderTokenAddress, approveTokenData,0)
    await approvedTokenTx.wait()
    console.log("approvedTokenTx: ", approvedTokenTx)
    console.log("completed approval...!!")
    console.log("approval successful!")
    return approvedTokenTx
}


    const map3PayData = (_tokenamount,  _to,  _tokenIn) => {
          const SameTokenPayData =  [_tokenamount,_to,_tokenIn]
          console.log("constructing Map3SameTokenPayData from oxPay api.....")
          const Map3SameTokenPayData =    functionBytesEncoder(Map3Abi,"SameTokenPay",SameTokenPayData)
        console.log("typeOf Map3SwapData: ", typeof Map3SameTokenPayData)
          console.log("completed Map3SameTokenPayData from oxPay : ", Map3SameTokenPayData)
          return(Map3SameTokenPayData)
      }




// WRITE FUNCTION for FRONT END !!!!!
const map3PayExecutor = async (returnOfFunctionBytesEncoder, txValue) => {

    const provider = new ethers.providers.Web3Provider(window.ethereum)
     const PaySigner = provider.getSigner()
    const returnOfFunctionBytesEncoderAndImplementor = await bytesEncodedBytesImplementor(PaySigner,Map3address, returnOfFunctionBytesEncoder, txValue)
    // const returnOfFunctionBytesEncoderAndImplementorReciept = await returnOfFunctionBytesEncoderAndImplementor.wait()
    await returnOfFunctionBytesEncoderAndImplementor.wait()
    console.log("returnOfFunctionBytesEncoderAndImplementor: ", returnOfFunctionBytesEncoderAndImplementor)
    console.log("completed map3Pay...!!")

     console.log("payment successful!")
     return returnOfFunctionBytesEncoderAndImplementor
 }



 const OxPayTxData = (
      sellTokenAddress,
      buyTokenAddress,
      allowanceTargetquote,
      OxDelegateAddress,
      allowanceBalance,
      buyAmount,
      reciversAddress,
      data
    ) => {
       
        const fillSwapData =  [
              sellTokenAddress, // sellToken
              buyTokenAddress, // buyToken
              allowanceTargetquote,// spender
              OxDelegateAddress,// swapTarget
              allowanceBalance,// _tokenamount
              buyAmount, // _sendAmount
              reciversAddress,// _toAddress
              data // swapCallData
        ]
        console.log("constructing Map3SwapData from oxPay api.....")
        const Map3SwapData =    functionBytesEncoder(Map3Abi,"fillQuote",fillSwapData)
      console.log("typeOf Map3SwapData: ", typeof Map3SwapData)
        console.log("completed Map3SwapData from oxPay : ", Map3SwapData)
        return(Map3SwapData)

    }


// WRITE FUNCTION for FRONT END !!!!!
    const OxPayExecutor = async (Map3SwapData, txValue ) => {

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const oxPaySigner = provider.getSigner()

        console.log("executing 0xPay......")
        const returnOfFunctionBytesEncoderAndImplementor = await bytesEncodedBytesImplementor(oxPaySigner,Map3address, Map3SwapData, txValue)
        const receipt= await returnOfFunctionBytesEncoderAndImplementor.wait()
        console.log("completed 0xPay...!!")
        console.log("payment successful!")
        return(receipt)

    }


// USABLE ENCODER!
// test1 READ parameters Map3address, Map3Abi, "checkIsVendor" [Map3address]
// test2 WRITE parameters: Map3Abi,"SameTokenPay", [_tokenamount,_to,_tokenIn]

const bytesEncodedBytesImplementor = async (signer, contractAddress, encodedData, txValue) => {
    console.log("bytesEncodedBytesImplementor running... ")
    console.log("transaction value is....", txValue)

    // "err: max fee per gas less than block base fee: address 0xBb2cB98982Ed6547aA7E39707807253a999796b7, maxFeePerGas: 8000000000 baseFee: 10013928538 (supplied gas 12813618)
            let returnData = await signer.sendTransaction({ //
                to: contractAddress,
                data: encodedData,
                value: txValue,
                // gasPrice: '12345678000000',
                // gas: 2400000,
              })
              await returnData.wait()
        console.log("bytesEncodedBytesImplementor returnData: ", returnData)

        return returnData

}

// const bytesEncodedBytesImplementor = async (signer, contractAddress, encodedData) => {
//   console.log("bytesEncodedBytesImplementor running... ")

//           let returnData = await signer.sendTransaction({ //
//               to: contractAddress,
//               data: encodedData
//             })
//             await returnData.wait()
//       console.log("bytesEncodedBytesImplementor returnData: ", returnData)

//       return returnData

// }
const readFunctionBytesEncoderAndImplementor = async (signer, contractAddress, encodedData) => {
    let returnData = await signer.call({
        to: contractAddress,
        data: encodedData
      })
console.log("readFunctionBytesEncoderAndImplementor returnData: ", returnData)

return returnData

}
const functionBytesEncoder =  (contractAbi, functionName, functionParameters) => {
    let iface = new ethers.utils.Interface(contractAbi);
    let encodedData = iface.encodeFunctionData(functionName, functionParameters)
    console.log("functionBytesEncoder encodedData: ", encodedData)
    return encodedData

}
const getFunctionSignatureHash =  (contractAbi, functionName) => {
    let iface = new ethers.utils.Interface(contractAbi);
    let encodedData = iface.getSighash(functionName);
    return encodedData;

}

const listenForMap3Events = async () => {

    const Map3 = new ethers.Contract(Map3address,Map3Abi,provider)

   // Receive an event when ANY transfer occurs
   console.log("listening for map3 events.......")
   Map3.on("Paid", (sender, to, amount, event) => {
   console.log("map3 emitted .......")

       console.log(`Paid event emited: ${ sender } sent ${ ethers.utils.formatEther(amount) } to ${ to}`);
       console.log("event object: ", event)
       // The event object contains the verbatim log data, the
       // EventFragment and functions to fetch the block,
       // transaction and receipt and event functions
   });
   
   Map3.on("FilledSwapOrder", (sellToken, buyToken, boughtAmount, event) => {
       console.log(` FilledSwapOrder event emited: map3 converted  ${ ethers.utils.formatEther(boughtAmount) } of sell token: ${ sellToken }  to buy token: ${ buyToken}`);
       // The event object contains the verbatim log data, the
       // EventFragment and functions to fetch the block,
       // transaction and receipt and event functions
   });
   
   }




   const OxQuote = async (sendersToken,reciversToken,amountToBeSent,reciversAddress,sendersAddress) => {

            console.log("from OXQuote in oxpay and utils: ",sendersToken,reciversToken,amountToBeSent,reciversAddress,sendersAddress )
            const sendersTokenContract = new ethers.Contract(sendersToken,IERC20Abi,provider)
            console.log(" passsed the senderstoken contract instantiation test")
          
            const Map3 = new ethers.Contract(Map3address,Map3Abi,provider)
            console.log(" passsed the map3 contract instantiation test")
          
            let buyAmountWei = await WholeTOWeiDecimals(reciversToken ,amountToBeSent);
            console.log("recived this from the WholeToWeiDecimal call: ", buyAmountWei)
          let feeOnVendor = 0;
          // const isReciverVendor = await Map3.isVendor(reciversAddress)
          // await isReciverVendor.wait()
          // if(isReciverVendor ){feeOnVendor = 0} else{feeOnVendor =0.05

          /////////////////////////////////////
          // DO SOME MATH TO CALCULATE THE NEW AMOUNT TO SEND TO VENDOR SO THAT USER DOES NOT PAY THE FEES
          ///////////////////////////////////////////////////////
          // let tempBuyAmount = Number(buyAmountWei)
          // const feeCut =  tempBuyAmount * feeOnVendor;
          // console.log("feeCut:", feeCut);
          
          // const newBuyAmount = tempBuyAmount-feeCut;
          // console.log("newBuyAmount:", newBuyAmount);
          
          // console.log("newBuyAmount",newBuyAmount, typeof newBuyAmount)
          // console.log("newBuyAmount.toString()",newBuyAmount.toString() , typeof newBuyAmount.toString())
          
          // buyAmountWei = newBuyAmount.toString();
          
          // }
              const qs = createQueryString({
              sellToken: sendersToken,
              buyToken: reciversToken,
              buyAmount: buyAmountWei,
              takerAddress: Map3address,
              skipValidation: true,
              slippagePercentage:0.04,
              intentOnFilling:true,
            //   feeRecipient: testAccount,
            //   buyTokenPercentageFee: feeOnVendor// check if vendor IsVendor for fees
              });
              const quoteUrl = `${API_QUOTE_URL}?${qs}`;
              console.log(`Fetching quote ${quoteUrl}...`);
              const response = await fetch(quoteUrl);
              const quote = await response.json();
              console.log(`Received a quote with price ${quote.price}`);
          
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          // Note ask User to approve  aprovalAmount before clicking Pay
          ////////////////////////////////////////////////////////////////////
              const AprovalTarget = quote.allowanceTarget
              const OxDelegateAddress = quote.to
              const allowanceBalance = await sendersTokenContract.allowance(sendersAddress,Map3address)
          
            console.log('just aproved spender:',ethers.utils.formatEther(allowanceBalance))
            //  console.log('just aproved spender:',await WeiToWholeDecimals(quote.sellTokenAddress,allowanceBalance))
              // const PayReadyResponse = {
                ///////////////////////////Destructure this array//////////////////////////
                const fillQuoteParameters={
                            sellTokenAddress:sendersToken, // buyToken
                            buyTokenAddress: reciversToken, // sellToken
                            allowanceTargetquote: AprovalTarget,// spender
                            OxDelegateAddress: OxDelegateAddress,// swapTarget
                            data: quote.data, // swapCallData
                            allowanceBalance: allowanceBalance,// _tokenamount
                            buyAmount: quote.buyAmount, // _sendAmount
                            reciversAddress: reciversAddress// _toAddress
                            // gasPrice: quote.gasPrice,
                            // gas: quote.gas
                    // quote.gasPrice,
          }
              // }
          
          
            return(fillQuoteParameters)
  }
  
















//SAMPLE CODE!


// simple function encoder and data encoder
// const Map3SwapData =  ethers.utils.hexConcat([
        //   getFunctionSignatureHash(Map3Abi,"fillQuote"),
        //   ethers.utils.defaultAbiCoder.encode(['address'], [sellTokenAddress]),....etc 
        // ])
        // console.log("typeOf Map3SwapData: ", typeof Map3SwapData)
        // console.log("Map3SwapData from oxPay : ", Map3SwapData)

//  const __POSTS = [ 
// 	{ id: 1, title: 'Apple', description: 'Description of post 1' }, 
// 	{ id: 2, title: 'Orange', description: 'Description of post 2' }, 
// 	{ id: 3, title: 'Guava', description: 'Description of post 3' }, 
// 	{ id: 4, title: 'Banana', description: 'Description of post 4' }
// ];

// const __FOUND = __POSTS.find(function(post, index) {
// 	if(post.title == 'Guava')
// 		return true;
// });

// // On success __FOUND will contain the complete element (an object)
// // On failure it will contain undefined  
// console.log(__FOUND);

//  abiCoder = ethers.utils.defaultAbiCoder
// abiCoder.encode([ "bytes" ], [ "0x095ea7b3000000000000000000000000d38b508e98b092fa7babefc30652f1affa8c857c0000000000000000000000000000000000000000000000000de0b6b3a7640000" ]);



// const returnData = await provider.call({
//     to: '0xAddress',
//     data: ethers.utils.hexConcat([
//       '0x9f4f2a33', 
//       ethers.utils.defaultAbiCoder.encode(['address', 'address'], ['0xAddr1', '0xAddr2'])
//     ])
//   })


// let ABI = [
//     "function transfer(address to, uint amount)"
// ];
//  let iface = new ethers.utils.Interface(ABI);
//  iface.encodeFunctionData("transfer", [ "0x1234567890123456789012345678901234567890", parseEther("1.0") ])

// iface.getSighash("balanceOf");

module.exports = {
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
    vendorSignUpFee,
    getTokenSymbol,
    slippage,
    API_QUOTE_URL,
    provider,
    Map3Abi,
    getSendersAllowanceBalance,
    getSendersAllowanceBalanceInWei,
    getUserErc20Balance,
    getUserNativeBalance,
    Map3WebsiteUrl,
    listenForMap3Events,
    functionBytesEncoder,
    readFunctionBytesEncoderAndImplementor,
    bytesEncodedBytesImplementor,
    getFunctionSignatureHash,
    PaymentHandlerEndpoint,
    map3SameTokenTransferEndpoint,
    map3SwapAndTransferEndpoint,
    map3SwapAndTransferEndpoint,
    OxPayExecutor,
    OxPayTxData,
    map3PayExecutor,
    map3PayData,
    approveSendersTokenExecutor,
    approveSendersTokenData,
    map3ApproveEndpoint,
    OxQuote,
    EthAddress,
    WethAddress,
    getUserErc20BalanceInWei,
    getUserNativeBalanceInWei,


};

//enableSlippageProtection
//tx hash 0xb8f6de1f679c80396acbe38527fa52a0c5f1fe98f022d093ae77f3ee052a14f9