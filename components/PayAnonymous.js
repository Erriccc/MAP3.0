import React, { useState, useEffect } from 'react';
import PayVendor from 'components/PayVendor';
import tokenAdresses from '../constants/tokens.json'
const BigNumber = require('bignumber.js');
const fetch = require('node-fetch');
const {oxPriceFetcher} = require('../Utilities/oxPriceFetcher');
const {oxPaymentInfoRelayer} = require('../Utilities/oxPaymentInfoRelayer')


const submitPayment = async (event) => {
  // Implimentation of this function was moved to oxPaymentRelayer
    const oxPaymentRelayerResult = await oxPaymentInfoRelayer(event)
    console.log("this is how we get info back from the server and then send to metamask for signature",
    oxPaymentRelayerResult )
  };

export default function PayAnonymous({walletAddress,vendorsToken}) {


    const [quote, setQuote] = React.useState(0);
    const [sendersToken, setSendersToken] = React.useState("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2");
    // default to USDT unless set to stable by vendor
    const [reciversToken, setReciversToken] = React.useState("0xdAC17F958D2ee523a2206206994597C13D831ec7"); 
    const [amountToBeSent, setamountToBeSent] = React.useState(0);

    useEffect(()=>{
        const fetchPrice = async () => {
            // this function comes from the utililty folder
        let quotePrice = await oxPriceFetcher(sendersToken,reciversToken,amountToBeSent)
          setQuote(quotePrice)
        }
        fetchPrice()
      }, [sendersToken,reciversToken]);


    if (walletAddress && vendorsToken) {
      let VendorsWalletAddress = {walletAddress}
      let VendorsCurrencyToken = {vendorsToken}
      return (
        <PayVendor
         walletAddress = {VendorsWalletAddress}
         vendorsToken ={VendorsCurrencyToken}
         />
      )
    }
  return (
  <div className="w-full max-w-sm">
                <form className=" shadow-md rounded px-8 pt-6 pb-8 mb-4" id="pay" onSubmit={submitPayment}>
                        <div className="mb-4 ">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                Ammount
                            </label>
                            <input className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="amount" name='amount' type="number" placeholder="100"
                            onChange={(e)=>{
                                let userInputAmount = e.target.value;
                                setamountToBeSent(userInputAmount);
                            }}
                            />
                        </div>
                        <div className="mb-4 bg-white">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                Wallet Address
                            </label>
                            <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="reciver" name='reciver' type="text" placeholder="0x**************"/>
                            <h4 className="text-red-500 text-xs italic">Please Add a wallet Address</h4>
                        </div>
                        <div className="mb-4 bg-white">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                Recivers token
                            </label>
                            <input className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                            id="reciversChoiceToken" name='reciversChoiceToken' value={reciversToken} type="text" placeholder="0x**************"
                            onChange={(e)=>{
                                const selectedReciversToken = e.target.value;
                                if (selectedReciversToken == sendersToken) {
                                    setQuote("Tokens match, this will be a direct transfer!")
                                    // do something else on pay
                                } else {
                                setReciversToken(selectedReciversToken);
                                }
                            }}
                            />
                            <h4 className="text-blue-500 text-xs italic">USDT is default</h4>
                        </div>

                        <div className="  flex flex-col items-center justify-center py-2">
                            <a className="font-bold text-sm text-center text-blue-500 hover:text-blue-800 p-4 mx-2" href="#">
                                Rate: <h5 className='text-green-500'>{quote}</h5>
                            </a>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-5 py-2 m-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                PAY
                            </button>
                                <div className="  p-2 m-3 flex  flex-col justify-center ">
                                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Token
                                    </label>
                                    <div className="flex flex-wrap -mx-6 ">
                                        <div className="relative">
                                            <select 
                                                className="appearance-none w-full  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="token" name='token' onChange={(e)=>{
                                                    const selectedSendersToken = e.target.value;
                                                    if (selectedSendersToken == reciversToken) {
                                                        setQuote("Tokens match, this will be a direct transfer!")
                                                        // do something else on transfer
                                                    } else {
                                                    setSendersToken(selectedSendersToken);
                                                    }
                                                }}>
                                                    {tokenAdresses.map(({ address,symbol}) => (
                                                    <option key={address} value={address}>{symbol}</option>
                                                ))}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                </form>
</div>
  )
}

