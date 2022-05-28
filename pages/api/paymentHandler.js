'use strict'
const fetch = require('node-fetch');
const process = require('process');
const { createWeb3, createQueryString, etherToWei, waitForTxSuccess, weiToEther,numberExponentToLarge } = require('../../Utilities/utils');
const {OxQuote} = require('../../Utilities/OxQuoteAndUtils');

const API_QUOTE_URL = 'https://api.0x.org/swap/v1/quote';
export default async function form(req, res) {
    const body  = req.body
    const reqPaymentData = {
      amount:body.amount,
      reciver:body.reciver,
      sender:body.sender, // takeNote this might be an object
      reciversToken:body.reciversTokenOfChoice,
      sendersToken:body.sendersToken
    }
  const  responsePaymentData = await OxQuote(
    reqPaymentData.sendersToken,
    reqPaymentData.reciversToken,
    reqPaymentData.amount,
    reqPaymentData.reciver,
    reqPaymentData.sender
    )
    // Guard clause checks for first and last name,
    // and returns early if they are not found
    // if (!body.first || !body.last) {
    //   // Sends a HTTP bad request error code
    //   return res.status(400).json({ data: 'First or last name not found' })
    // }

    res.status(200).json(responsePaymentData)
  }