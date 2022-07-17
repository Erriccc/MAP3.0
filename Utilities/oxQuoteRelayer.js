const fetch = require('node-fetch');
// const {OxQuote} = require('../Utilities/OxQuoteAndUtils');
const { ethers } = require("ethers");

const oxQuoteRelayer = async (event,User) => {
    event.preventDefault();
    const sendersTokenOfChoice = event.target.token.value
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
      const endpoint = 'api/paymentHandler' // "api/paymentHandler"
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
