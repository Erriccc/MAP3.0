import React, { useState, useEffect } from 'react';
import PayAnonymous from  "components/PayAnonymous.js"
import tokenAdresses from '../constants/sendersTokens.json'
import { useRouter } from "next/router";
const BigNumber = require('bignumber.js');
import { Button, Icon, useNotification } from "web3uikit";
import ProgressBar from "@badrap/bar-of-progress";

const fetch = require('node-fetch');
// const {oxKnownVendorQuoteRelayer} = require('../Utilities/oxKnownVendorQuoteRelayer')
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
const {oxPriceFetcher,oxQuoteFetcher} = require('../Utilities/oxPriceFetcher');
// const Map3Abi = require( '../artifacts/contracts/Map3.sol/Map3Pay.json')
// import {map3Pay,approveSendersToken,testAccount,Map3address,numberExponentToLarge,
//     WholeTOWeiDecimals,IERC20Abi,getTokenSymbol,slippage,Map3Abi,getSendersAllowanceBalance
//  } from'../Utilities/utils';
 import Utils from'../Utilities/utils';
import{OxPay} from '../Utilities/OxPay';
import{oxSwapEventHandler, sameTokenEventHandler} from '../Utilities/payEventHandler';

import { ethers }from "ethers";


const progress = new ProgressBar({
    size: 3,
    color: "#8ECAF7",
    className: "z-50",
    delay: 100,
  });


export default function PayVendor({walletAddress,vendorsToken,User,vendorsName,vendorsTokenSymbol}) {

    const dispatch = useNotification();
    const handleError= (msg) => {
        dispatch({
          type: "error",
          message: `${msg}`,
          title: "failed",
          position: "topR",
        });
      };
    console.log('testing values from paVendor:',walletAddress,vendorsToken,User,vendorsName,vendorsTokenSymbol)

    const submitPayment = async (event) => {

        event.preventDefault();
        // listenForMap3Events();
            if (event.target.token.value == vendorsToken) {
    
                    await sameTokenEventHandler(event, User, dispatch);
    
            } else {
    
                    await oxSwapEventHandler(event, User, dispatch);
    
                }
    
        };

    const [quote, setQuote] = React.useState(0);
    const [sendersToken, setSendersToken] = React.useState(0);


    const [amountToBeSent, setamountToBeSent] = React.useState(1);

    useEffect(()=>{
        const fetchPrice = async () => {
            // this function comes from the utililty folder
        let quotePrice = await oxPriceFetcher(sendersToken,vendorsToken,amountToBeSent,handleError)
          setQuote(quotePrice)
        }
        fetchPrice()
      }, [sendersToken]);

       // here we are just keeping tractk of the wallet address passed down
       if (!walletAddress && !vendorsToken) {
        return (
          <PayAnonymous/>
        )
      }

  return (
    <div className="w-full max-w-sm">
    <form className=" shadow-md rounded px-8 pt-6 pb-8 mb-4" id="pay" onSubmit={submitPayment}>
            <div className="mb-4 ">
                <h4 className="text-blue-500 text-md italic">This vendor accepts {vendorsTokenSymbol}</h4>
                <label className="block text-gray-700 text-sm font-bold mb-2" >
                    Amount
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="amount" name='amount' placeholder="100"
                onChange={(e)=>{
                    let userInputAmount = e.target.value;
                    setamountToBeSent(userInputAmount);
                }}
                />
            </div>
            <div className="mb-4 bg-white invisible">
                <input id="reciversChoiceToken" name='reciversChoiceToken' value={vendorsToken} />
                <input id="reciver" name='reciver' type="text" value={walletAddress}/>

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
                                        if (selectedSendersToken == vendorsToken) {
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

