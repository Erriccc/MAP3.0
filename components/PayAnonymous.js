import React, { useState, useEffect } from 'react';
import tokenAdresses from '../constants/sendersTokens.json'
import reciversTokenAdresses from '../constants/reciversTokens.json'
import { toast } from 'react-toastify';

import ProgressBar from "@badrap/bar-of-progress";
const {oxPriceFetcher} = require('../Utilities/oxPriceFetcher');
import Utils from'../Utilities/utils';
import{oxSwapEventHandler, sameTokenEventHandler} from '../Utilities/payEventHandler';

const progress = new ProgressBar({
    size: 3,
    color: "#8ECAF7",
    className: "z-50",
    delay: 100,
  });


export default function PayAnonymous({User}) {


// add input for expected slippage amount to complete swap!
    const submitPayment = async (event) => {

    event.preventDefault();
    // listenForMap3Events();
        if (event.target.token.value == event.target.reciversChoiceToken.value) {

                await sameTokenEventHandler(event, User, toast);

        } else {

                await oxSwapEventHandler(event, User, toast);

            }

    };



    const [quote, setQuote] = React.useState("select tokens to get Quote");
    const [sendersTokenBalance, setSendersTokenBalance] = React.useState("0.00");
    const [reciversTokenBalance, setRciversTokenBalance] = React.useState("0.00");
    const [tokenName, setTokenName] = React.useState();
    const [sendersToken, setSendersToken] = React.useState("0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619");
    const [reciversToken, setReciversToken] = React.useState("0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"); 
    const [amountToBeSent, setamountToBeSent] = React.useState(1);


    /// USER EXPIRIENCE TOOLS
    useEffect(()=>{
        const fetchPrice = async () => {
            // this function comes from the utililty folder
        let quotePrice = await oxPriceFetcher(
            sendersToken,
            reciversToken,
            amountToBeSent,
            toast)
          setQuote(quotePrice)
        }

        const loadUsersBalances = async () => {
            setRciversTokenBalance( await Utils.getUserErc20Balance(reciversToken,User))
            setSendersTokenBalance(await Utils.getUserErc20Balance(sendersToken,User))
        }

        fetchPrice()
        loadUsersBalances()
      }, [sendersToken, reciversToken]);

  return (


  <div className="w-full max-w-sm">
                <form className=" shadow-md rounded px-8 pt-6 pb-8 mb-4" id="pay" onSubmit={submitPayment}>
                        <div className="mb-4 ">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                Ammount
                            </label>
                            <input className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="amount" name='amount' value={amountToBeSent} placeholder="100"
                            onChange={(e)=>{
                                let userInputAmount = e.target.value;
                                setamountToBeSent(userInputAmount);
                            }}
                            />
                        </div>
                        <div className="mb-4 bg-white">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Receivers Wallet Address
                            </label>
                            <input className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="reciver" name='reciver' type="text" placeholder="0x**************"/>
                            {/* <h4 className="text-red-500 text-xs italic">Please Add a wallet Address</h4> */}
                        </div>
                        <div className="mb-4 bg-white">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                Receivers token
                            </label>
                            {/* <input className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                            id="reciversChoiceToken" name='reciversChoiceToken' value={reciversToken} type="text" placeholder="0x**************"
                            onChange={(e)=>{
                                const selectedReciversToken = e.target.value;
                                // if (selectedReciversToken == null) {
                                //     setQuote("Please input a valid token")
                                // }else{
                                if (selectedReciversToken == sendersToken) {
                                    setQuote("Tokens match, this will be a direct transfer!")
                                    // setReciversToken(selectedReciversToken);

                                    // do something else on pay
                                } else {
                                setReciversToken(selectedReciversToken);
                                }
                            // }
                            }}
                            />
                            <h4 className="text-blue-500 text-xs italic">{tokenName}</h4> */}


                            <div className="flex flex-wrap -mx-6 ">

                                        <a className="font-bold text-sm text-center text-blue-500 hover:text-blue-800 p-4 mx-2" href="#">
                                        available balance: <h5 className='text-green-500'>{reciversTokenBalance}</h5>
                                        </a>
                                        <div className="relative">
                                            <select 
                                                className="appearance-none w-full  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="reciversChoiceToken" name='reciversChoiceToken' 
                                                
                                                onChange={(e)=>{
// Set the quote to a spiner while new quote is loading

                                                    setQuote(
                                                        <svg role="status" className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                        </svg>
                                                    )

// Update React State  and fetch new Quote                                                                                                   
                                                    const selectedReciversToken = e.target.value;
                                                    const selectedReciversTokenSymbol = e.target.symbol;
                                                    if (selectedReciversToken == sendersToken) {
                                                <h4 className="text-blue-500 text-xs italic">{tokenName}</h4> 

                                                        setQuote("Tokens match, this will be a direct transfer!")

                                                        // do something else on transfer
                                                    } else {
                                                        setReciversToken(selectedReciversToken);
                                                <h4 className="text-blue-500 text-xs italic">{tokenName}</h4> 

                                                    }
                                                }}>
                                                    {reciversTokenAdresses.map(({ address,symbol}) => (
                                                            <option key={symbol} value={address}>{symbol}</option>

                                                ))}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                            </div>
                                        </div>
                                    </div>




                        </div>

                        <div className="  flex flex-col items-center justify-center py-2">
                            <a className="font-bold text-sm text-center text-blue-500 hover:text-blue-800 p-4 mx-2" href="#">
                                Rate: <h5 className='text-green-500'>{quote}</h5>
                            </a>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-5 py-2 m-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                PAY
                            </button>
                                <div className=" mb-3 flex  flex-col justify-center ">
                                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Choose Token
                                    </label>




                                    <div className="flex flex-wrap -mx-6 ">

                                    <a className="font-bold text-sm text-center text-blue-500 hover:text-blue-800 p-4 mx-2" href="#">
                                        available balance: <h5 className='text-green-500'>{sendersTokenBalance}</h5>
                                    </a>
                                        <div className="relative">
                                            <select 
                                                className="appearance-none w-full  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="token" name='token' 
                                                
                                                onChange={(e)=>{

// Set the quote to a spiner while new quote is loading

                                                    setQuote(
                                                        <svg role="status" className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                        </svg>
                                                    )
// Update React State  and fetch new Quote                                                                                                   
                                                    const selectedSendersToken = e.target.value;
                                                    const selectedSendersTokenSymbol = e.target.symbol;

                                                    if (selectedSendersToken == reciversToken) {
                                                        setTokenName(selectedSendersToken)
                                                        setQuote("Tokens match, this will be a direct transfer!")

                                                        // do something else on transfer
                                                    } else {
                                                    setSendersToken(selectedSendersToken);
                                                    setTokenName(selectedSendersToken);
                                                    }
                                                }}>
                                                    {tokenAdresses.map(({ address,symbol}) => (
                                                    <option key={symbol} value={address}>{symbol}</option>
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

