const BigNumber = require('bignumber.js');
const fetch = require('node-fetch');
const process = require('process');
const { ethers } = require("ethers");
const { Map3address,Map3Abi,testAccount,numberExponentToLarge,createQueryString,getTokenDecimal,WeiToWholeDecimals,IERC20Abi,WholeTOWeiDecimals,API_QUOTE_URL, provider} = require('./utils');

// const Map3Abi = require( '../artifacts/contracts/Map3.sol/Map3Pay.json')
// const testAccount ="0xC1FbB4C2F4CE9eF87d42A0ea49683E0Cfb003f2F"

// const StableCoinAbi = require( '../artifacts/contracts/StableCoin.sol/StableCoin.json')
// const UniverseTokenAbi = require( '../artifacts/contracts/UniverseToken.sol/UniverseToken.json')


// const API_QUOTE_URL = 'https://api.0x.org/swap/v1/quote';
// const API_QUOTE_URL = 'https://polygon.api.0x.org/swap/v1/quote';
// const Ox_POLYGON_API_QUOTE_URL = 'https://polygon.api.0x.org/swap/v1/price';
// const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_JSON_RPC_URL_POLYGON)
// const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com") 
// const provider = new ethers.providers.JsonRpcProvider()

// const provider = new ethers.providers.Web3Provider(window.ethereum)

const OxQuote = async (sendersToken,reciversToken,amountToBeSent,reciversAddress,sendersAddress) => {

  console.log("from OXQuote in oxpay and utils: ",sendersToken,reciversToken,amountToBeSent,reciversAddress,sendersAddress )
  const sendersTokenContract = new ethers.Contract(sendersToken,IERC20Abi,provider)
  console.log(" passsed the senderstoken contract instantiation test")

  const Map3 = new ethers.Contract(Map3address,Map3Abi,provider)
  console.log(" passsed the map3 contract instantiation test")

  let buyAmountWei = await WholeTOWeiDecimals(reciversToken ,amountToBeSent);
  console.log("recived this from the WholeToWeiDecimal call: ", buyAmountWei)
let feeOnVendor;
const isReciverVendor = await Map3.isVendor(reciversAddress)
// await isReciverVendor.wait()
if(isReciverVendor ){feeOnVendor = 0} else{


  feeOnVendor =0.05
/////////////////////////////////////
// DO SOME MATH TO CALCULATE THE NEW AMOUNT TO SEND TO VENDOR SO THAT USER DOES NOT PAY THE FEES
///////////////////////////////////////////////////////
let tempBuyAmount = Number(buyAmountWei)
const feeCut =  tempBuyAmount * feeOnVendor;
console.log("feeCut:", feeCut);

const newBuyAmount = tempBuyAmount-feeCut;
console.log("newBuyAmount:", newBuyAmount);

console.log("newBuyAmount",newBuyAmount, typeof newBuyAmount)
console.log("newBuyAmount.toString()",newBuyAmount.toString() , typeof newBuyAmount.toString())

buyAmountWei = newBuyAmount.toString();

}
    const qs = createQueryString({
    sellToken: sendersToken,
    buyToken: reciversToken,
    buyAmount: buyAmountWei,
    takerAddress: Map3address,
    skipValidation: true,
    intentOnFilling:true,
    feeRecipient: testAccount,
    buyTokenPercentageFee: feeOnVendor// check if vendor IsVendor for fees
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

module.exports =
{
  OxQuote,
  IERC20Abi,
  getTokenDecimal,
  WeiToWholeDecimals,
  WholeTOWeiDecimals
}
