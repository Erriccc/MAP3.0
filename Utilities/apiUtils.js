
// const Moralis = require('moralis/node');
const UTILS = require('/Utilities/utils');
const Moralis = require('moralis');


const {
    etherToWei,
    weiToEther,
    createQueryString,
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
    Map3VendorsABi,
    getSendersAllowanceBalance,
    getSendersAllowanceBalanceInWei,
    getUserErc20Balance,
    getUserNativeBalance,
    Map3WebsiteUrl,
    listenForMap3Events,
    PaymentHandlerEndpoint,
    map3SameTokenTransferEndpoint,
    map3SwapAndTransferEndpoint,
    map3ApproveEndpoint,
    map3SignUpEndpoint,
    EthAddress,
    WethAddress,
    getUserErc20BalanceInWei,
    getUserNativeBalanceInWei,
    ethers,


} = require('/Utilities/utils')



// const API_MoralisAppId = process.env.MORALIS_API_ID;
// const API_MoralisAppUrl = process.env.MORALIS_APP_URL;
// const API_MoralisMasterKey = process.env.MORALIS_MASTER_KEY;
const API_web3StorageToken = process.env.WEB3_STORAGE_TOKEN;
// const MoralisEndpoint = '/api/oxQuoteHandler'

const API_MoralisAppId = process.env.NEXT_PUBLIC_MORALIS_API_ID;
const API_MoralisAppUrl = process.env.NEXT_PUBLIC_MORALIS_APP_URL;
const API_MoralisMasterKey = process.env.NEXT_PUBLIC_MORALIS_MASTER_KEY;
// const API_web3StorageToken = process.env.WEB3_STORAGE_TOKEN;

// 'use strict'



const searchVendorProfiles = async (searchedString) => {

       //  const vendorsData = Utils.vendorsData;
       const vendorsData = await fetchVendorsDataFromApi();
       const searchKeyword = searchedString.trim().toLowerCase();
       console.log("searchKeyword in lowercase", searchKeyword);

       let map3Vendors ;
       if(searchedString.toLowerCase() == '*'){
           console.log('every data was requested')
           map3Vendors = vendorsData;

       }else{
       map3Vendors = vendorsData.filter(function (item) {
           const name = item.name;
           const walletAddress = item.walletAddress;
          //  const KeyWords = item.keyWords
          //  const websiteUrl = item.websiteUrl
          //  const bio = item.description;

           return(
               (name.toLowerCase().includes(searchKeyword) && item) ||
               (walletAddress.toLowerCase().includes(searchKeyword) && item)
              //  ||
              //  (websiteUrl.toLowerCase().includes(searchKeyword) && item)||
              //  (bio.toLowerCase().includes(searchKeyword) && item)
              //  ||(KeyWords.some((keyWord) => {
              //      return keyWord.toLowerCase().includes(searchKeyword);
              //  }
              //  ) && item)
             )
       })


}

return({map3Vendors:map3Vendors})

}


const fetchVendorProfileData = async (_vendorAddress) => {

  const vendorsData = await fetchVendorsDataFromApi();
  const VendorsAddress = _vendorAddress.trim().toLowerCase();

  let mapProfileData = vendorsData.filter(function (item) {
  const walletAddress = item.walletAddress;

  return( 
          (walletAddress.toLowerCase().includes(VendorsAddress) && item))
  })
console.log(mapProfileData.length ,'(mapProfileData.legnth?')
console.log(mapProfileData.length == 0 ,'(mapProfileData.legnth ==0)')
  if (mapProfileData.length == 0){
    return({vendorData:{}, isVendor:false})
  }else{

      console.log(mapProfileData, '.. mapProfileData...')
      
      let VendorsCurrencyInfo = await  UTILS.GetCUrrencyDetails(mapProfileData[0].vendorsToken)
      console.log("VendorsCurrencyInfo..... from api", VendorsCurrencyInfo)

      let vendorData = {
          // reciver: mapProfileData[0].walletAddress,
          // reciversToken: mapProfileData[0].vendorsToken,
          vendorsDetails: mapProfileData,
          VendorsCurrencyInfo: VendorsCurrencyInfo,
      };
      console.log("vendorData.......................", vendorData)
      return({vendorData:vendorData, isVendor:true})


  }

}









const fetchDataForMap = async (searchedString) => {

            //  const vendorsData = Utils.vendorsData;
            const vendorsData = await fetchVendorsDataFromApi();
            const searchKeyword = searchedString.trim().toLowerCase();
            console.log("searchKeyword in lowercase", searchKeyword);
   
            let map3Vendors ;
            if(searchedString.toLowerCase() == '*'){
                console.log('every data was requested')
                map3Vendors = vendorsData;

            }else{
            map3Vendors = vendorsData.filter(function (item) {
                const name = item.name;
                const walletAddress = item.walletAddress;
                const KeyWords = item.keyWords
                const websiteUrl = item.websiteUrl
                const bio = item.description;

                return(
                    (name.toLowerCase().includes(searchKeyword) && item) ||
                    (walletAddress.toLowerCase().includes(searchKeyword) && item)||
                    (websiteUrl.toLowerCase().includes(searchKeyword) && item)||
                    (bio.toLowerCase().includes(searchKeyword) && item)
                    ||(KeyWords.some((keyWord) => {
                        return keyWord.toLowerCase().includes(searchKeyword);
                    }
                    ) && item)
                  )
            })


}

return({map3Vendors:map3Vendors})
}











const fetchVendorsDataFromApi = async () => {

  console.log('trying to get data from moralis')
  const serverUrl = API_MoralisAppUrl;
const appId = API_MoralisAppId;
const masterKey = API_MoralisMasterKey;

await Moralis.start({ serverUrl, appId, masterKey });

const MapVendors = Moralis.Object.extend("MapVendors");
const query = new Moralis.Query(MapVendors);

const results = await query.find();
console.log('results! from moralis api database..', results)



// string[7] memory _vendorDetails = [
//   _signUpVendor.vendorsName,0
//   _signUpVendor.vendorsEmail,1
//   _signUpVendor.vendorsBio,2
//   _signUpVendor.vendorsLat,3
//   _signUpVendor.vendorsLong,4
//   _signUpVendor.vendorsImageUrl,5
//   _signUpVendor.vendorsWebsiteUrl,6
//   ];
  
//   emit newVendorInfo(
//   _signUpVendor.vendorsWalletAddress,
//   _vendorDetails,
//   _signUpVendor.keyWords,
//   VendorId[address(msg.sender)],
//   _signUpVendor.vendorsToken
//       );


const finalResults = results.map((item) =>{
  let name = item.attributes.vendorDetails[0];
  let description = item.attributes.vendorDetails[2];
  let imgUrl = item.attributes.vendorDetails[5];
  let lat = item.attributes.vendorDetails[3];
  let long = item.attributes.vendorDetails[4];
  let walletAddress = item.attributes.vendorsWalletAddress;
  let vendorsToken = item.attributes.vendorsToken;
  let email = item.attributes.vendorDetails[1];
  let websiteUrl = item.attributes.vendorDetails[6];
  let keyWords = item.attributes.keyWords;

  return{
    name,
description,
imgUrl,
lat,
long,
walletAddress,
vendorsToken,
email,
websiteUrl,
keyWords
  }
})

return(finalResults)

} 






// //providers.JsonRpcProvider()
// const HDWalletProvider = require('@truffle/hdwallet-provider');
// const BigNumber = require('bignumber.js');
// const process = require('process');
// const Web3 = require('web3');
// const Map3AbiPlaceHolder = require( '../artifacts/contracts/Map3Pay.sol/Map3Pay.json')
// // const Map3Abi = Map3AbiPlaceHolder.abi;
// // const Map3Abi = require( './map3PayABI.json')
// const Map3Abi = require( './Map3P2PContract.json')

// // const Map3VendorsABi = require( './map3VendorPlansABI.json')
// const Map3VendorsABi = require( './VendorAccountsManagerContract.json')

// const uniVoteAbi = require( './univotetoken.json')
// // const Map3WebsiteUrl = "https://www.map3.com"
// const Map3WebsiteUrl = "http://10.0.0.232:3001"


// const PaymentHandlerEndpoint = 'api/oxQuoteHandler' // "api/oxQuoteHandler"
// const map3SameTokenTransferEndpoint = 'api/map3pay/map3sametokentransfer' // "api/paymentHandler"
// const map3SwapAndTransferEndpoint = 'api/map3pay/map3swapandtransfer' // "api/paymentHandler"
// const map3SignUpEndpoint = 'api/map3signup' // "api/paymentHandler"
// const map3ApproveEndpoint = 'api/map3pay/map3approve' 

// const  { ethers }=require( "ethers"); // from hardhat throws error "Can't resolve 'console'"

// const WethAddress = _wethAddresses. polygon;

// // const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_JSON_RPC_URL_POLYGON)
// // const provider = new ethers.providers.Web3Provider(window.ethereum)
// const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com")
// // const provider = new ethers.providers.JsonRpcProvider()


// // const API_QUOTE_URL = 'https://api.0x.org/swap/v1/quote';//https://polygon.api.0x.org/swap/v1/price
// const API_QUOTE_URL = 'https://polygon.api.0x.org/swap/v1/quote';
// const { MNEMONIC, RPC_URL } = process.env;

// function etherToWei(etherAmount) {
//     return new BigNumber(etherAmount)
//         .times('1e18')
//         .integerValue()
//         .toString(10);
// }

// function weiToEther(weiAmount) {
//     return new BigNumber(weiAmount)
//         .div('1e18')
//         .toString(10);
// }
//   const  getTokenSymbol = async (_tokenAddress) =>{
//     const myContract = new ethers.Contract(_tokenAddress,IERC20Abi,provider)
//     const tokenSymbol = await myContract.symbol()
//     console.log("tokenDecimals from function getTokenSymbol in utils:", tokenSymbol)
//     return tokenSymbol;
//   }//
//   const getSendersAllowanceBalance = async (ownersTokenAddress,owner) => {
//     // const provider = new ethers.providers.Web3Provider(window.ethereum)
//     const allowanceContract = new ethers.Contract(ownersTokenAddress,IERC20Abi,provider)
//     const tx1 = await allowanceContract.allowance(owner,Map3address)
//     return tx1
// }
// const getSendersAllowanceBalanceInWei = async (ownersTokenAddress,owner) => {
//   const allowanceContract = new ethers.Contract(ownersTokenAddress,IERC20Abi,provider)
//   const tx0 = await allowanceContract.allowance(owner,Map3address)
//   const tx1 = Number(tx0._hex)
//   return tx1 // returns long number
// }
// const getUserErc20Balance = async (tokenAddress,owner) => {
//     // const provider = new ethers.providers.Web3Provider(window.ethereum)
//     const tokenContract = new ethers.Contract(tokenAddress,IERC20Abi,provider)
//     const tx0 = await tokenContract.balanceOf(owner)
//     const tx1 = ethers.utils.formatUnits(
//         tx0, await getTokenDecimal(tokenAddress,owner ))
//     return tx1
// }
// const getUserErc20BalanceInWei = async (tokenAddress,owner) => {
//   const provider = new ethers.providers.Web3Provider(window.ethereum)
//   const tokenContract = new ethers.Contract(tokenAddress,IERC20Abi,provider)
//   const tx0 = await tokenContract.balanceOf(owner)
//   // Number(tx0)
//   const tx1 = Number(tx0._hex)
//   return tx1
// }

// const getUserNativeBalance = async (owner) => {
//   let balance = await provider.getBalance(owner);
//   const tx1 = ethers.utils.formatUnits( balance, 18);
//   console.log("eth balamce requested...", tx1)
//   return tx1
// }
// const getUserNativeBalanceInWei = async (owner) => {
//   let balance = await provider.getBalance(owner);
//   // Number(balance)
//   const tx1 = Number(balance._hex)
//   console.log("eth balamce requested...", tx1)
//   return tx1
// }



  const approveSendersTokenData = async (spenderAddress,approveAmount) => {
    console.log('spender address and approval amount.', spenderAddress, approveAmount)
    const approveAnyTokenData =  [spenderAddress,approveAmount]
    console.log("constructing approveTokenData from oxPay api.....")
    const approveTokenData =    await functionBytesEncoder(IERC20Abi,"approve",approveAnyTokenData)
  console.log("typeOf approveTokenData: ", typeof approveTokenData)
    console.log("completed approveTokenData from oxPay : ", approveTokenData)
    return(approveTokenData)
}




  // WRITE FUNCTION FOR FRONT END!!
  const approveSendersTokenExecutor = async (signer, spenderTokenAddress,approveTokenData) => {
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    // const aprovalSigner = provider.getSigner()
    
    console.log("executing approveSendersTokenExecutor......")
    const approvedTokenTx = await bytesEncodedBytesImplementor(signer,spenderTokenAddress, approveTokenData,0)
    await approvedTokenTx.wait()
    console.log("approvedTokenTx: ", approvedTokenTx)
    console.log("completed approval...!!")
    console.log("approval successful!")
    return approvedTokenTx
}


    const map3PayData = async (_tokenamount,  _to,  _tokenIn, _sendAsWeth) => {
          const SameTokenPayData =  [_tokenamount,_to,_tokenIn, _sendAsWeth]
          console.log("last stop before details are encoded.....", SameTokenPayData)
          console.log("constructing Map3SameTokenPayData from oxPay api.....")
          const Map3SameTokenPayData =    await functionBytesEncoder(Map3Abi,"SameTokenPay",SameTokenPayData)
        console.log("typeOf Map3SwapData: ", typeof Map3SameTokenPayData)
          console.log("completed Map3SameTokenPayData from oxPay : ", Map3SameTokenPayData)
          return(Map3SameTokenPayData)
      }


      const map3SignUpData = async (_tupple) => {
        const signUpData =  [_tupple]
        console.log("last stop before signUpData details are encoded.....", signUpData)
        console.log("constructing signUpData from oxPay api.....")
        const Map3SignUpData =   await  functionBytesEncoder(Map3VendorsABi,"addVendor",signUpData)
      console.log("typeOf Map3SignUpData: ", typeof Map3SignUpData)
        console.log("completed Map3SignUpData from oxPay : Map3SignUpData")
        return(Map3SignUpData)
    }



    const map3SignUpExecutor = async (_signer, returnOfFunctionBytesEncoder, txValue) => {

      // const provider = new ethers.providers.Web3Provider(window.ethereum)
      //  const PaySigner = provider.getSigner()
      // console.log(_signer,UTILS.Map3VendorAddress, returnOfFunctionBytesEncoder, txValue,'UTILS.Map3VendorAddress')
      // try {
      // const returnOfFunctionBytesEncoderAndImplementor = await bytesEncodedBytesImplementor(_signer,UTILS.Map3VendorAddress, returnOfFunctionBytesEncoder, txValue)
      // console.log("returnOfFunctionBytesEncoderAndImplementor: ", returnOfFunctionBytesEncoderAndImplementor)
      // console.log("completed signUp Execution...!!")
      // const returnOfFunctionBytesEncoderAndImplementor = await bytesEncodedBytesImplementor(_signer,UTILS.Map3VendorAddress, returnOfFunctionBytesEncoder, txValue)
      // console.log(returnOfFunctionBytesEncoderAndImplementor)
      //  console.log("signUp successful!")
       return await bytesEncodedBytesImplementor(_signer,UTILS.Map3VendorAddress, returnOfFunctionBytesEncoder, txValue)
      //       } catch (error) {
      //       console.log(error,"signUp failed!")
      // }
      // const returnOfFunctionBytesEncoderAndImplementorReciept = await returnOfFunctionBytesEncoderAndImplementor.wait()
      // await returnOfFunctionBytesEncoderAndImplementor.wait()
      
   }
  


// WRITE FUNCTION for FRONT END !!!!!
const map3PayExecutor = async (signer, returnOfFunctionBytesEncoder, txValue) => {

    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    //  const PaySigner = provider.getSigner()
    const returnOfFunctionBytesEncoderAndImplementor = await bytesEncodedBytesImplementor(signer,Map3address, returnOfFunctionBytesEncoder, txValue)
    // const returnOfFunctionBytesEncoderAndImplementorReciept = await returnOfFunctionBytesEncoderAndImplementor.wait()
    await returnOfFunctionBytesEncoderAndImplementor.wait()
    console.log("returnOfFunctionBytesEncoderAndImplementor: ", returnOfFunctionBytesEncoderAndImplementor)
    console.log("completed map3Pay...!!")

     console.log("payment successful!")
     return returnOfFunctionBytesEncoderAndImplementor
 }



 const OxPayTxData = async (
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
        console.log("last stop before details are encoded.....", fillSwapData)

        console.log("constructing Map3SwapData from oxPay api.....")
        const Map3SwapData =    await functionBytesEncoder(Map3Abi,"fillQuote",fillSwapData)
      console.log("typeOf Map3SwapData: ", typeof Map3SwapData)
        console.log("completed Map3SwapData from oxPay : ", Map3SwapData)
        return(Map3SwapData)

    }


// WRITE FUNCTION for FRONT END !!!!!
    const OxPayExecutor = async (signer, Map3SwapData, txValue ) => {

        // const provider = new ethers.providers.Web3Provider(window.ethereum)
        // const oxPaySigner = provider.getSigner()

        console.log("executing 0xPay......")
        const returnOfFunctionBytesEncoderAndImplementor = await bytesEncodedBytesImplementor(signer,Map3address, Map3SwapData, txValue)
        const receipt= await returnOfFunctionBytesEncoderAndImplementor.wait()
        console.log("completed 0xPay...!!")
        console.log("payment successful!")
        return(receipt)

    }


    
 const OxErc20ToEthPayTxData = async (
  sellTokenAddress,
  // buyTokenAddress, // no buyTokenAddress
  allowanceTargetquote,
  OxDelegateAddress,
  allowanceBalance,
  buyAmount,
  reciversAddress,
  data
) => {
   
    const fillSwapData =  [
          sellTokenAddress, // sellToken
          // buyTokenAddress, // buyToken
          allowanceTargetquote,// spender
          OxDelegateAddress,// swapTarget
          allowanceBalance,// _tokenamount
          buyAmount, // _sendAmount
          reciversAddress,// _toAddress
          data // swapCallData
    ]
    console.log("last stop before details are encoded.....", fillSwapData)

    console.log("constructing Map3SwapData from oxPay api.....")
    const Map3SwapData =    await functionBytesEncoder(Map3Abi,"fillErc20ToEthQuote",fillSwapData)
  console.log("typeOf Map3SwapData: ", typeof Map3SwapData)
    console.log("completed Map3SwapData from oxPay : ", Map3SwapData)
    return(Map3SwapData)

} 

const OxErc20ToEthPayExecutor = async (signer, Map3SwapData, txValue ) => {

  // const provider = new ethers.providers.Web3Provider(window.ethereum)
  // const oxPaySigner = provider.getSigner()

  console.log("executing 0xPay......")
  const returnOfFunctionBytesEncoderAndImplementor = await bytesEncodedBytesImplementor(signer,Map3address, Map3SwapData, txValue)
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
    console.log(encodedData.gasPrice.toNumber()*1.1, 'gas Price in big number.toNumber()*1.1')
    console.log(Math.floor(encodedData.gasPrice.toNumber()*1.1) , 'Math.floor(encodedData.gasPrice.toNumber()*1.1)')
     let adjustedGasPrice = ethers.BigNumber.from(Math.floor(encodedData.gasPrice.toNumber()*1.1))
    //  let adjustedGasPrice = ethers.BigNumber.from(50000000000)
    console.log(adjustedGasPrice, 'gas Price in big number')

    // "err: max fee per gas less than block base fee: address 0xBb2cB98982Ed6547aA7E39707807253a999796b7, maxFeePerGas: 8000000000 baseFee: 10013928538 (supplied gas 12813618)
   
      return await signer.sendTransaction({ //
        to: contractAddress,
        data: encodedData.txdata,
        value: txValue,
        // gasPrice: adjustedGasPrice,
        // gasPrice: encodedData.gasPrice,
        // gasLimit: 500000
        // gas: 2400000,
      })

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

const functionBytesEncoder =  async(contractAbi, functionName, functionParameters) => {
    let iface = new ethers.utils.Interface(contractAbi);
    // console.log("iface, ", iface)
    // console.log("iface.encodeFunctionData, ", iface.encodeFunctionData)
    function arraysAreEqual(ary1,ary2){
      return (ary1.join('') == ary2.join(''));
    }
    let gasPrice = await provider.getGasPrice()
    let gasLimit = 50000000
    let encodedData = iface.encodeFunctionData(functionName, functionParameters)
    // let testPopulatedTx = await contact.estimateGas[functionName](...functionParameters)
    console.log('...functionParameters', functionParameters)
    return encodedData

}
const getFunctionSignatureHash =  (contractAbi, functionName) => {
    let iface = new ethers.utils.Interface(contractAbi);
    let encodedData = iface.getSighash(functionName);
    return encodedData;

}

   const OxQuote = async (sendersToken,reciversToken,amountToBeSent,reciversAddress,sendersAddress, userSetSlippage) => {

            console.log("from OXQuote in oxpay and utils: ",sendersToken,reciversToken,amountToBeSent,reciversAddress,sendersAddress )
            const sendersTokenContract = new ethers.Contract(sendersToken,IERC20Abi,provider)
            console.log(" passsed the senderstoken contract instantiation test")
          
            const Map3 = new ethers.Contract(Map3address,Map3Abi,provider)
            console.log(" passsed the map3 contract instantiation test")
          
            let buyAmountWei = await WholeTOWeiDecimals(reciversToken ,amountToBeSent);
            console.log("recived this from the WholeToWeiDecimal call: ", buyAmountWei)
          let feeOnVendor = 0
          
              const qs = createQueryString({
              sellToken: sendersToken,
              buyToken: reciversToken,
              buyAmount: buyAmountWei,
              takerAddress: Map3address,
              skipValidation: true,
              // slippagePercentage:0.04,
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
              // const safetyAmountWithSlippage = (quote.sellAmount* userSetSlippage).toString()
              // const allowanceBalance = await sendersTokenContract.allowance(sendersAddress,Map3address)

            const aprovalAmountPlusSlippage = (quote.sellAmount *userSetSlippage).toFixed(0).toString() // change multiplier to come from Utils.slippage
            console.log("this is just the  approval amount: testin.......", aprovalAmountPlusSlippage)
            console.log("this is the approval amount with more calc: testin.......", UTILS.numberExponentToLarge(aprovalAmountPlusSlippage))
            const safetyAmountWithSlippage = UTILS.numberExponentToLarge(aprovalAmountPlusSlippage)

              
            console.log('just aproved spender:',safetyAmountWithSlippage)
            console.log('just aproved spender:',safetyAmountWithSlippage)
            //  console.log('just aproved spender:',await WeiToWholeDecimals(quote.sellTokenAddress,allowanceBalance))
              // const PayReadyResponse = {
                ///////////////////////////Destructure this array//////////////////////////
                const fillQuoteParameters={
                            sellTokenAddress:sendersToken, // buyToken
                            buyTokenAddress: reciversToken, // sellToken
                            allowanceTargetquote: AprovalTarget,// spender
                            OxDelegateAddress: OxDelegateAddress,// swapTarget
                            data: quote.data, // swapCallData
                            allowanceBalance: safetyAmountWithSlippage,// _tokenamount
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
    etherToWei,
    weiToEther,
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
    OxErc20ToEthPayTxData,
    OxErc20ToEthPayExecutor,
    OxPayExecutor,
    OxPayTxData,
    map3PayExecutor,
    map3PayData,
    map3SignUpData,
    map3SignUpExecutor,
    approveSendersTokenExecutor,
    approveSendersTokenData,
    map3ApproveEndpoint,
    OxQuote,
    EthAddress,
    WethAddress,
    getUserErc20BalanceInWei,
    getUserNativeBalanceInWei,
    ethers,
    API_MoralisAppId,
    API_MoralisAppUrl,
    API_web3StorageToken,
    fetchVendorsDataFromApi,
    fetchDataForMap,
    fetchVendorProfileData,
    searchVendorProfiles


};

//enableSlippageProtection
//tx hash 0xb8f6de1f679c80396acbe38527fa52a0c5f1fe98f022d093ae77f3ee052a14f9