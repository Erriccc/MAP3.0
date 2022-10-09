'use strict'
const fetch = require('node-fetch');
const process = require('process');
const { OxQuote } = require('../../Utilities/apiUtils');


// RENAME TO oxQuoteHandler
//
export default async function form(req, res) {
    const body  = req.body
    const reqPaymentData = {
      amount:body.amount,
      reciver:body.reciver,
      sender:body.sender, // takeNote this might be an object
      reciversToken:body.reciversTokenOfChoice,
      sendersToken:body.sendersToken,
      userSetSlippage:body.userSetSlippage,
      chainId:body.chainId
    }
    console.log("from payment handler reqPaymentData: ",reqPaymentData )
    // Guard clause checks for first and last name,
    // and returns early if they are not found
    if (!body.amount || !body.reciver || !body.sender) {
     console.log("incomplete required parameters: ",body )
      // Sends a HTTP bad request error code
      return res.status(400).json({ data: 'please pass in all required parameters' })
    }

    // note this is being implimented on the server side so it is not exposed
  const  responsePaymentData = await OxQuote(
    reqPaymentData.sendersToken,
    reqPaymentData.reciversToken,
    reqPaymentData.amount,
    reqPaymentData.reciver,
    reqPaymentData.sender,
    reqPaymentData.userSetSlippage,
    reqPaymentData.chainId
    )

    console.log("from payment handler responsePaymentData: ",responsePaymentData )

    res.status(200).json(responsePaymentData)
  }