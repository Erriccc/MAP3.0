const fetch = require('node-fetch');
// const {OxQuote} = require('../Utilities/OxQuoteAndUtils');
const { ethers } = require("ethers");



const oxKnownVendorQuoteRelayer = async (event,User,vendorsToken,walletAddress) => {
    event.preventDefault();
    console.log('testing values from paoxKnownVendorQuoteRelayerVendor:',walletAddress,vendorsToken,User,event)
    
    const sendersTokenOfChoice = event.target.token.value
    const reciversChoiceToken = vendorsToken
    const sendingAmout = event.target.amount.value
    const reciver = walletAddress
    const sender = User
    
     const paymentData = {
        amount: sendingAmout,
        reciver: reciver,
        sender: sender,
        reciversTokenOfChoice :reciversChoiceToken,
        sendersToken: sendersTokenOfChoice
      }

      const JSONdata = JSON.stringify(paymentData)
      // API endpoint where we send form data.
      const endpoint = './../pages/api/paymentHandler' // "api/paymentHandler"
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
      console.log("testing endpoint and options from oxKnownVendor: ",endpoint,options)
      const response = await fetch(endpoint, options)
      const result = await response.json()
      return (result)
  };


  module.exports = {oxKnownVendorQuoteRelayer} // Another option for exporting
