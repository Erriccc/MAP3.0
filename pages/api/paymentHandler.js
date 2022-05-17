'use strict'
const fetch = require('node-fetch');
const process = require('process');
const { createWeb3, createQueryString, etherToWei, waitForTxSuccess, weiToEther } = require('../../Utilities/utils');

//////////////////////////////////
//THINGS TO TAKE NOTE OF:
// We will set the appropriate fees and commision address when sending the initial request



const API_QUOTE_URL = 'https://api.0x.org/swap/v1/quote';
const Map3ContractAddress = '0x00...';
// const { abi: ABI } = require('../build/contracts/SimpleTokenSwap.json'); switch up later






export default function form(req, res) {
    // Get data submitted in request's body.
    const body  = req.body
    console.log('parameters: ', body)


  async function OxPay() {
  const web3 = createWeb3();
  const contract = new web3.eth.Contract(ABI, Map3ContractAddress);
  const [owner] = await web3.eth.getAccounts();

  // Convert buyAmount from token units to wei.
  const buyAmountWei = etherToWei(body.amount);
  // Get a quote from 0x-API
  console.log(`Fetching swap quote from 0x-API to buy ${body.amount} vendors token for spenders token...`);


  // Conditional to see if the  (body.reciver) ISVENDOR
  if (body.reciver) {
    const qs = createQueryString({
      sellToken: body.sendersToken,
      buyToken: body.reciversTokenOfChoice,
      buyAmount: buyAmountWei,
      feeRecipient: Map3ContractAddress,
      buyTokenPercentageFee: 0.1 // Should change to subscripton later
  });
  } else {
    const qs = createQueryString({
      sellToken: body.sendersToken,
      buyToken: body.reciversTokenOfChoice,
      buyAmount: buyAmountWei,
      feeRecipient: Map3ContractAddress,
      buyTokenPercentageFee: 0.5
  });
  }
  
  const quoteUrl = `${API_QUOTE_URL}?${qs}`;
  console.log(`Fetching quote ${quoteUrl}...`);
  const response = await fetch(quoteUrl);
  const quote = await response.json();
  console.log(`Received a quote with price ${quote.price}`);

  // Have the contract fill the quote, selling its own WETH.
  console.log(`Filling the quote through the contract at ${Map3ContractAddress}...`);
  const receipt = await waitForTxSuccess(contract.methods.fillQuote(
          quote.sellTokenAddress,
          quote.buyTokenAddress,
          quote.allowanceTarget,
          quote.to,
          quote.data,
          quote.sellAmount // Take note you might mean quote.buyAmount
      ).send({
          from: owner,
          value: quote.value,
          gasPrice: quote.gasPrice,
      }));
      // Take note how to read events
  // const boughtAmount = weiToEther(receipt.events.BoughtTokens.returnValues.boughtAmount);
  console.log(`${'✔'.green} Successfully sold ${body.amount.toString().bold} Spenders Token for ${quote.sellAmount} Vendors prefered tokens!`);
}

if (body.sendersToken == body.reciversTokenOfChoice) {
  console.log("initiating simple SameTokenTransfer")
} else {
 // OxPay()
 console.log("logic pased 0x pay intiating...")

}

    // MAKE SURE TO CHECK IF THE RECIVERSTOKEN IS = SENDERS TOKEN CAUSE THEN WE CAN MAKE A SIMPLE TRANSFER
    const responsePaymentData = {
      amount:body.amount,
      reciver:body.reciver,
      reciversToken:body.reciversTokenOfChoice,
      sendersToken:body.sendersToken
    }
    // Guard clause checks for first and last name,
    // and returns early if they are not found
    // if (!body.first || !body.last) {
    //   // Sends a HTTP bad request error code
    //   return res.status(400).json({ data: 'First or last name not found' })
    // }

    res.status(200).json(responsePaymentData)
  }