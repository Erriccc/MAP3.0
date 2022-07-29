// Relays 0x Quote parameters to the Payment Handeler Server and sends the results back to the front end


const fetch = require('node-fetch');
const {PaymentHandlerEndpoint} = require('/Utilities/utils');
const { ethers } = require("ethers");

const oxQuoteRelayer = async (event,sendersTokenAddress,User) => {
    event.preventDefault();
    // const sendersTokenOfChoice = event.target.token.value
    const sendersTokenOfChoice = sendersTokenAddress
    const reciversChoiceToken = event.target.reciversChoiceToken.value
    const sendingAmout = event.target.amount.value
    const reciver = event.target.reciver.value
    const sender = User

     const paymentData = {
        amount: sendingAmout,
        reciver: reciver,
        sender: sender,
        reciversTokenOfChoice :reciversChoiceToken,
        sendersToken: sendersTokenOfChoice //
      }

      console.log("paymentdata: from oxQuoteRelayer", paymentData)

      const JSONdata = JSON.stringify(paymentData)
      // API endpoint where we send form data.
      // const endpoint = 'api/paymentHandler' // "api/paymentHandler"
      const endpoint = PaymentHandlerEndpoint // "api/paymentHandler"
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
      const result = await response.json()
      return (result)
  };

module.exports = {oxQuoteRelayer} // Another option for exporting
