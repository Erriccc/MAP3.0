const fetch = require('node-fetch');
const process = require('process');
const Utils = require('/Utilities/utils');

const oxPriceFetcher = async (sendersToken,reciversToken,amountToBeSent,handleError) => {
  let validatedSendersToken = sendersToken;
  let validatedReciversToken = reciversToken;
  
if (amountToBeSent <= 0 || amountToBeSent == null || amountToBeSent == "" || isNaN(amountToBeSent)){
  // sendersToken = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
  return(" invalid amount")
  
}

if (sendersToken == null){
  // sendersToken = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
  return(" input full valid address")
  
}
if (reciversToken == null){
  // sendersToken = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
  return(" input valid address")
}

        //VALIDATE sendersToken ADDRESS INPUT
        try{
            await Utils.getUserNativeBalanceInWei(validatedSendersToken)

        }catch(e){
          return("invalid ENS address")
        }
        console.log("validation passed for sender's token");

        //VALIDATE reciversToken ADDRESS INPUT
        try{
            await Utils.getUserNativeBalanceInWei(validatedReciversToken)

        }catch(e){
          return("invalid ENS address")
        }
        console.log("validation passed for reciver");

        //VALIDATE same tokens 
        if (validatedSendersToken == validatedReciversToken){
        console.log("validation passed for reciver");
          return 1
        }
else{
        console.log("validating for eth addresses")
        if (validatedSendersToken == Utils.EthAddress){
          console.log("validatedSendersToken == Utils.EthAddress detected")
          validatedSendersToken = Utils.WethAddress
        }
        if (validatedReciversToken == Utils.EthAddress){
          console.log("validatedReciversToken = Utils.EthAddress detected")
          validatedReciversToken = Utils.WethAddress
        }
        //second VALIDATE for same WETH tokens 
        if (validatedSendersToken == validatedReciversToken){
          console.log("validation passed for reciver");
            return 1
        }else{
        console.log("making api call")
              console.log("ammount to be sent from pricefetcher : ",amountToBeSent, " - ", await Utils.WholeTOWeiDecimals(validatedReciversToken,amountToBeSent) )
              const qs = Utils.createQueryString({
                  // Directly Swap and Send Any Token for USDT online
                  sellToken: validatedSendersToken,
                  buyToken: validatedReciversToken,
                  buyAmount: await Utils.WholeTOWeiDecimals(validatedReciversToken,amountToBeSent),
              });
              const quoteUrl = `${Utils.API_PRICE_URL}?${qs}`;
              console.log(quoteUrl)
              // const quoteUrl = `${Ox_POLYGON_API_PRICE_URL}?${qs}`;
              const response = await fetch(quoteUrl);

              const quote = await response.json();
              if (response.status == 100 || response.status == 400){
                  // 0x5559edb74751a0ede9dea4dc23aee72cca6be3d5
               console.log("validation error caught", quote)
               console.log("quote.validationErrors[0].reason", quote.validationErrors[0].reason)
               return (quote.validationErrors[0].reason)
              }
              else{
                console.log(quote);

                return(quote.price)

              }
            }
          }














}
// }


const oxQuoteFetcher = async (sendersToken,reciversToken,amountToBeSent,handleError) => {
  

console.log("ammount to be sent from Quotefetcher : ",amountToBeSent, " - ", await Utils.WholeTOWeiDecimals(reciversToken,amountToBeSent) )

  const qs = Utils.createQueryString({
      // Directly Swap and Send Any Token for USDT online
      sellToken: sendersToken,
      buyToken: reciversToken,
      buyAmount: await Utils.WholeTOWeiDecimals(reciversToken,amountToBeSent),
  });
  const quoteUrl = `${Utils.API_QUOTE_URL}?${qs}`;
  console.log("Quotefetcher url for price..", quoteUrl)
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