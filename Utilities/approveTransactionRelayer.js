const fetch = require('node-fetch');
import {Map3address, map3ApproveEndpoint} from'../Utilities/utils';
import {approveSendersTokenExecutor} from '../Utilities/apiUtils'
const approveTransactionRelayer = async (event, tokenammount ) => {
     const approvalData = {
        amount: tokenammount,
        contractAddress: Map3address,
      }

        const JSONdata = JSON.stringify(approvalData)
        const endpoint = map3ApproveEndpoint // "api/paymentHandler"
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
        console.log("response..... from approveTransactionRelayer: ", response)
        const result = await response.json()
        const txdata = result.txdata

        console.log("txdata..... from m3paytransactionrelayer: ", txdata)

        const tx2 = await  approveSendersTokenExecutor(event.target.token.value,txdata) // New Implementation of backend transactions
        return (tx2)

}

module.exports = {approveTransactionRelayer}