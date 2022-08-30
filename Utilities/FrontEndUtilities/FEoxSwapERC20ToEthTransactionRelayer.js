const fetch = require('node-fetch');
import { map3OxMap3SwapERC20ToEthEndpoint} from'/Utilities/utils';
import {OxErc20ToEthPayExecutor} from '/Utilities/apiUtils'


const oxSwapERC20ToEthTransactionRelayer = async (signer, oxQuoteResult, txValue ) => {

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

        console.log("map3OxMap3SwapERC20ToEthEndpointData: from oxSwapERC20ToEthTransactionRelayer", map3OxPayTransferData)

        const JSONdata = JSON.stringify(map3OxPayTransferData)
        // API endpoint where we send form data.
        const endpoint = map3OxMap3SwapERC20ToEthEndpoint // "api/paymentHandler"
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
        console.log("response..... from oxSwapERC20ToEthTransactionRelayer: ", response)

        const result = await response.json()
        const txdata = result.txdata

        console.log("txdata..... from oxSwapERC20ToEthTransactionRelayer: ", txdata)



        const tx2 = await  OxErc20ToEthPayExecutor(signer, txdata, txValue) // New Implementation of backend transact    ions
        return (tx2)

}

module.exports = {oxSwapERC20ToEthTransactionRelayer}