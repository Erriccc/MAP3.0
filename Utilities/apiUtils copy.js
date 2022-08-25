const UTILS = require('/Utilities/utils')
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
    // ethers,


} = require('/Utilities/utils')

// 'use strict'

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


const  { ethers, providers }=require( "ethers"); // from hardhat throws error "Can't resolve 'console'"

const  WalletConnectProvider = require("@walletconnect/web3-provider")














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
    
    // const provider = new ethers.providers.Web3Provider(window.ethereum)



    
const providerOptions = {
  walletconnect: {
      package: window.WalletConnectProvider.default,
      options: {
        rpc: {
          137: 'https://matic-mainnet.chainstacklabs.com',
        },
          infuraId: '9228470e662a45c19c99c05352f02cf6'
      }
  }
};

web3Modal = new window.Web3Modal.default({
cacheProvider: true,
providerOptions,
disableInjectedProvider: false
});

const _provider = await web3Modal.connect();
console.log("new provider.., provider", _provider)
// const wallet = new ethers.providers.Web3Provider(provider);
    // const aprovalSigner = provider.getSigner()
    const aprovalSigner = _provider.getSigner()
    
    console.log("executing approveSendersTokenExecutor......")
    const approvedTokenTx = await bytesEncodedBytesImplementor(aprovalSigner,spenderTokenAddress, approveTokenData,0)
    await approvedTokenTx.wait()
    console.log("approvedTokenTx: ", approvedTokenTx)
    console.log("completed approval...!!")
    console.log("approval successful!")
    return approvedTokenTx
}


    const map3PayData = (_tokenamount,  _to,  _tokenIn, _sendAsWeth) => {
          const SameTokenPayData =  [_tokenamount,_to,_tokenIn, _sendAsWeth]
          console.log("last stop before details are encoded.....", SameTokenPayData)
          console.log("constructing Map3SameTokenPayData from oxPay api.....")
          const Map3SameTokenPayData =    functionBytesEncoder(Map3Abi,"SameTokenPay",SameTokenPayData)
        console.log("typeOf Map3SwapData: ", typeof Map3SameTokenPayData)
          console.log("completed Map3SameTokenPayData from oxPay : ", Map3SameTokenPayData)
          return(Map3SameTokenPayData)
      }


      const map3SignUpData = (_tupple) => {
        const signUpData =  [_tupple]
        console.log("last stop before signUpData details are encoded.....", signUpData)
        console.log("constructing signUpData from oxPay api.....")
        const Map3SignUpData =    functionBytesEncoder(Map3VendorsABi,"addVendor",signUpData)
      console.log("typeOf Map3SignUpData: ", typeof Map3SignUpData)
        console.log("completed Map3SignUpData from oxPay : ", Map3SignUpData)
        return(Map3SignUpData)
    }



    const map3SignUpExecutor = async (returnOfFunctionBytesEncoder, txValue) => {

      // const provider = new ethers.providers.Web3Provider(window.ethereum)


      
    
const providerOptions = {
  walletconnect: {
      package: window.WalletConnectProvider.default,
      options: {
        rpc: {
          137: 'https://matic-mainnet.chainstacklabs.com',
        },
          infuraId: '9228470e662a45c19c99c05352f02cf6'
      }
  }
};

web3Modal = new window.Web3Modal.default({
cacheProvider: true,
providerOptions,
disableInjectedProvider: false
});

const _provider = await web3Modal.connect();
console.log("new provider.., provider", _provider)



      //  const PaySigner = provider.getSigner()
       const PaySigner = _provider.getSigner()
      const returnOfFunctionBytesEncoderAndImplementor = await bytesEncodedBytesImplementor(PaySigner,UTILS.Map3VendorAddress, returnOfFunctionBytesEncoder, txValue)
      // const returnOfFunctionBytesEncoderAndImplementorReciept = await returnOfFunctionBytesEncoderAndImplementor.wait()
      await returnOfFunctionBytesEncoderAndImplementor.wait()
      console.log("returnOfFunctionBytesEncoderAndImplementor: ", returnOfFunctionBytesEncoderAndImplementor)
      console.log("completed signUp Execution...!!")
  
       console.log("signUp successful!")
       return returnOfFunctionBytesEncoderAndImplementor
   }
  










// WRITE FUNCTION for FRONT END !!!!!
const map3PayExecutor = async (returnOfFunctionBytesEncoder, txValue) => {

    // const provider = new ethers.providers.Web3Provider(window.ethereum)

    const providerOptions = {
      walletconnect: {
          package: window.WalletConnectProvider.default,
          options: {
            rpc: {
              137: 'https://matic-mainnet.chainstacklabs.com',
            },
              infuraId: '9228470e662a45c19c99c05352f02cf6'
          }
      }
    };
    
    web3Modal = new window.Web3Modal.default({
    cacheProvider: true,
    providerOptions,
    disableInjectedProvider: false
    });
    
    const _provider = await web3Modal.connect();
    console.log("new provider.., provider", _provider)
    //  const PaySigner = provider.getSigner()
     const PaySigner = _provider.getSigner()
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
        console.log("last stop before details are encoded.....", fillSwapData)

        console.log("constructing Map3SwapData from oxPay api.....")
        const Map3SwapData =    functionBytesEncoder(Map3Abi,"fillQuote",fillSwapData)
      console.log("typeOf Map3SwapData: ", typeof Map3SwapData)
        console.log("completed Map3SwapData from oxPay : ", Map3SwapData)
        return(Map3SwapData)

    }


// WRITE FUNCTION for FRONT END !!!!!
    const OxPayExecutor = async (Map3SwapData, txValue ) => {

        // const provider = new ethers.providers.Web3Provider(window.ethereum)

        const providerOptions = {
          walletconnect: {
              package: window.WalletConnectProvider.default,
              options: {
                rpc: {
                  137: 'https://matic-mainnet.chainstacklabs.com',
                },
                  infuraId: '9228470e662a45c19c99c05352f02cf6'
              }
          }
        };
        
        web3Modal = new window.Web3Modal.default({
        network: "matic",
        cacheProvider: true,
        providerOptions,
        disableInjectedProvider: false
        });
        
        const _provider = await web3Modal.connect();
        console.log("new provider.., provider", _provider)
        // const oxPaySigner = provider.getSigner()
        const oxPaySigner = _provider.getSigner()

        console.log("executing 0xPay......")
        const returnOfFunctionBytesEncoderAndImplementor = await bytesEncodedBytesImplementor(oxPaySigner,Map3address, Map3SwapData, txValue)
        const receipt= await returnOfFunctionBytesEncoderAndImplementor.wait()
        console.log("completed 0xPay...!!")
        console.log("payment successful!")
        return(receipt)

    }


    
 const OxErc20ToEthPayTxData = (
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
    const Map3SwapData =    functionBytesEncoder(Map3Abi,"fillErc20ToEthQuote",fillSwapData)
  console.log("typeOf Map3SwapData: ", typeof Map3SwapData)
    console.log("completed Map3SwapData from oxPay : ", Map3SwapData)
    return(Map3SwapData)

}

const OxErc20ToEthPayExecutor = async (Map3SwapData, txValue ) => {

  // const provider = new ethers.providers.Web3Provider(window.ethereum)


  const providerOptions = {
    walletconnect: {
        package: window.WalletConnectProvider.default,
        options: {
          rpc: {
            137: 'https://matic-mainnet.chainstacklabs.com',
          },
            infuraId: '9228470e662a45c19c99c05352f02cf6'
        }
    }
  };
  
  web3Modal = new window.Web3Modal.default({
  cacheProvider: true,
  providerOptions,
  disableInjectedProvider: false
  });
  
  const _provider = await web3Modal.connect();
  console.log("new provider.., provider", _provider)
  // const oxPaySigner = provider.getSigner()
  const oxPaySigner = _provider.getSigner()

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


};

//enableSlippageProtection
//tx hash 0xb8f6de1f679c80396acbe38527fa52a0c5f1fe98f022d093ae77f3ee052a14f9