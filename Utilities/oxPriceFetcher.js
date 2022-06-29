const fetch = require('node-fetch');
const process = require('process');
const { createWeb3, createQueryString, etherToWei, waitForTxSuccess, weiToEther ,WholeTOWeiDecimals,IERC20Abi} = require('./utils');

const API_PRICE_URL = 'https://polygon.api.0x.org/swap/v1/price';
// const API_PRICE_URL = 'https://api.0x.org/swap/v1/price';
const Ox_POLYGON_API_PRICE_URL = 'https://polygon.api.0x.org/swap/v1/price';
// const API_QUOTE_URL = 'https://api.0x.org/swap/v1/quote';
const API_QUOTE_URL = 'https://polygon.api.0x.org/swap/v1/quote';


const oxPriceFetcher = async (sendersToken,reciversToken,amountToBeSent) => {

if (sendersToken == null || sendersToken.length != 42){
  // sendersToken = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
  return("ENS Addresses Are currently not allowed, input full valid address")
  
}
if (reciversToken == null || reciversToken.length != 42){
  // sendersToken = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
  return("ENS Addresses Are currently not allowed, input valid address")
}

// if(amountToBeSent < 0 || isNaN(amountToBeSent)){
//   return("set a valid Number!")
// }


console.log("ammount to be sent from pricefetcher : ",amountToBeSent, " - ", await WholeTOWeiDecimals(reciversToken,amountToBeSent) )
// console.log("ammount to sellfrom pricefetcher : ",amountToBeSent, " - ", await WholeTOWeiDecimals(reciversToken,amountToBeSent) )

    const qs = createQueryString({
        // Directly Swap and Send Any Token for USDT online
        sellToken: sendersToken,
        buyToken: reciversToken,
        buyAmount: await WholeTOWeiDecimals(reciversToken,amountToBeSent),
    });
    const quoteUrl = `${API_PRICE_URL}?${qs}`;
    console.log(quoteUrl)
    // const quoteUrl = `${Ox_POLYGON_API_PRICE_URL}?${qs}`;
    const response = await fetch(quoteUrl);
    const quote = await response.json();
    console.log(quote);

  return(quote.price)
}


const oxQuoteFetcher = async (sendersToken,reciversToken,amountToBeSent) => {

console.log("ammount to be sent from Quotefetcher : ",amountToBeSent, " - ", await WholeTOWeiDecimals(reciversToken,amountToBeSent) )

  const qs = createQueryString({
      // Directly Swap and Send Any Token for USDT online
      sellToken: sendersToken,
      buyToken: reciversToken,
      buyAmount: await WholeTOWeiDecimals(reciversToken,amountToBeSent),
  });
  const quoteUrl = `${API_QUOTE_URL}?${qs}`;
  console.log(quoteUrl)
  // const quoteUrl = `${Ox_POLYGON_API_PRICE_URL}?${qs}`;
  const response = await fetch(quoteUrl);
  const quote = await response.json();
return(quote.sellAmount)
}

module.exports = {oxPriceFetcher,oxQuoteFetcher}




// let tempNum =_num
//     if(typeof isNaN(_num) ){
//       tempNum = Number(_num)
//     }

// .toFixed(0)
// WeiToWholeDecimals//