const fetch = require('node-fetch');
import { map3SwapAndTransferEndpoint} from'/Utilities/utils';
import {OxPayExecutor} from '/Utilities/apiUtils'
import Utils from '/Utilities/utils'


const map3OxPayTransactionRelayer = async (wrappedProvider,oxQuoteResult, txValue ) => {

     const map3OxPayTransferData = {

        sellTokenAddress : oxQuoteResult.sellTokenAddress,
        buyTokenAddress : oxQuoteResult.buyTokenAddress,
        allowanceTargetquote : oxQuoteResult.allowanceTargetquote,
        OxDelegateAddress : oxQuoteResult.OxDelegateAddress,
        allowanceBalance : oxQuoteResult.allowanceBalance,
        buyAmount : oxQuoteResult.buyAmount,
        reciversAddress : oxQuoteResult.reciversAddress,
        data : oxQuoteResult.data

      }

        console.log("map3OxPayTransferData: from map3PayTransactionRelayer", map3OxPayTransferData)

        const JSONdata = JSON.stringify(map3OxPayTransferData)
        // API endpoint where we send form data.
        const endpoint = map3SwapAndTransferEndpoint // "api/paymentHandler"
        // Form the request for sending data to the server.
        const options = {
          // The method is POST because we are sending data.
          method: 'POST',
          // Tell the server we're sending JSON.
          headers: {
            'Content-Type': 'application/json',
          },
          // Body of the request is the JSON data we created above.
          body: JSONdata,
        }
        const response = await fetch(endpoint, options)
        console.log("response..... from map3OxPayTransactionRelayer: ", response)

        const result = await response.json()
        const txdata = result.txdata
        // let gasPrice = await Utils.provider.getGasPrice()
        let gasPrice = await wrappedProvider.getGasPrice()
        
        return {txdata, gasPrice, approveTx: false, txValue}

        // console.log("txdata..... from map3OxPayTransactionRelayer: ", txdata)



        // const tx2 = await  OxPayExecutor(signer, txdata, txValue) // New Implementation of backend transact    ions
        // return (tx2)

}

const map3OxPayTransactionSender = async (signer,txdata, txValue ) => {
  const tx2 = await  OxPayExecutor(signer, txdata, txValue) // New Implementation of backend transact    ions
  return (tx2)
}

module.exports = {map3OxPayTransactionRelayer, map3OxPayTransactionSender}