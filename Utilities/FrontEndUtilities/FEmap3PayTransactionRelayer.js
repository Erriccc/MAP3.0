const fetch = require('node-fetch');
import {map3SameTokenTransferEndpoint} from'/Utilities/utils';
import {map3PayExecutor} from '/Utilities/apiUtils'


const map3PayTransactionRelayer = async (signer, UsertransactionInput,tokenammount, txValue, _sendAsWeth ) => {

     const map3SameTokenTransferData = {
        amount: tokenammount,
        addressTo: UsertransactionInput.reciver,
        tokenIn: UsertransactionInput.reciversToken,
        _sendAsWeth: _sendAsWeth
      }

        console.log("map3SameTokenTransferData: from map3PayTransactionRelayer", map3SameTokenTransferData)

        const JSONdata = JSON.stringify(map3SameTokenTransferData)
        // API endpoint where we send form data.
        const endpoint = map3SameTokenTransferEndpoint // "api/paymentHandler"
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
        console.log("response..... from m3paytransactionrelayer: ", response)

        const result = await response.json()
        const txdata = result.txdata

        console.log("txdata..... from m3paytransactionrelayer: ", txdata)

        const tx2 = await  map3PayExecutor(signer, txdata, txValue) // New Implementation of backend transact    ions
        return (tx2)

}

module.exports = {map3PayTransactionRelayer}