import React, { useState, useEffect } from 'react';
import PayVendor from 'components/PayVendor';
import tokenAdresses from '../constants/tokens.json'
const BigNumber = require('bignumber.js');
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
const fetch = require('node-fetch');
import { Button, Icon, useNotification } from "web3uikit";
import ProgressBar from "@badrap/bar-of-progress";
const {oxPriceFetcher,oxQuoteFetcher} = require('../Utilities/oxPriceFetcher');
const {oxQuoteRelayer} = require('../Utilities/oxQuoteRelayer')
// const Map3Abi = require( '../artifacts/contracts/Map3.sol/Map3Pay.json')
import {map3Pay,approveSendersToken,testAccount,Map3address,numberExponentToLarge,
    WholeTOWeiDecimals,IERC20Abi,slippage,Map3Abi,getSendersAllowanceBalance
 } from'../Utilities/utils';
import{OxPay} from '../Utilities/OxPay';
import { ethers }from "ethers";

const progress = new ProgressBar({
    size: 3,
    color: "#8ECAF7",
    className: "z-50",
    delay: 100,
  });


export default function PayAnonymous({walletAddress,vendorsToken,User}) {

    const dispatch = useNotification();
    
    const handleSuccess= (msg) => {
        dispatch({
          type: "success",
          message: msg,
          title: "Done",
          position: "topL",
        });
      };
      const handleError= (msg) => {
        dispatch({
          type: "error",
          message: `${msg}`,
          title: "failed",
          position: "topL",
        });
      };
      const handleNoAccount= () => {
        dispatch({
          type: "error",
          message: `You need to connect your wallet to book a rental`,
          title: "Not Connected",
          position: "topL",
        });
      };




// add input for expected slippage amount to complete swap!
    const submitPayment = async (event) => {

    event.preventDefault();


        if (event.target.token.value == event.target.reciversChoiceToken.value) {
                    console.log("initiating simple SameTokenTransfer")

                    const tokenammount = await  WholeTOWeiDecimals(event.target.reciversChoiceToken.value,event.target.amount.value)
                    console.log("token amount vs converted token amount", event.target.amount.value,tokenammount)

                    let usersMap3SpendingTokenAwlloanceBallance = parseInt(await getSendersAllowanceBalance(event.target.token.value,User), 16).toString()
                    console.log("usersMap3SpendingTokenAwlloanceBallance: ", usersMap3SpendingTokenAwlloanceBallance)
                    // CHECK FOR CURRENT  USER ALLOWNCE BALANCE
                    if(tokenammount >= usersMap3SpendingTokenAwlloanceBallance){




                        console.log("please approve more tokens")
                        progress.start()
                        try{
                            const tx2 = await  approveSendersToken(event.target.token.value,Map3address,tokenammount)
                            await tx2.wait()
                            //    handleSuccess(`approval succsesful.. please sign the next transaction to send funds${msg}`)
                            handleSuccess(`approval succsesful.. please sign the next transaction to send funds`)

                        } catch(err){
                            handleError(` approval failed ${err.message}`)
                            progress.finish()

                            return;
                        }
                        progress.finish()

                        // break;
                    } else{
                        // do something....
                        console.log("we are all good, you have enough tokens approved")
                    }
                    progress.start()
                    try{

                        const tx3 = await  map3Pay(tokenammount,  event.target.reciver.value,  event.target.reciversChoiceToken.value,User)
                        const tx3Reciept =await tx3.wait()
                        const map3PayEvents = tx3Reciept.events[tx3Reciept.events.length-1]
                        console.log("sameTokenPay Reciept events: ", map3PayEvents)
                        handleSuccess(`transfer succesfull Thank you!`)

                    } catch (err) {
                        handleError(` transfer failed please try again. ${err.message}`)
                        progress.finish()


                    }
                    progress.finish()


        } else {


                    // situation where Tokens do not match
                    const quotedAmmountToSell = await oxQuoteFetcher(
                            event.target.token.value,
                            event.target.reciversChoiceToken.value,
                            event.target.amount.value
                            )
                    console.log("this is amont to sell", quotedAmmountToSell)
                    const aprovalAmount = (quotedAmmountToSell *slippage).toFixed(0).toString() // change multiplier to come from slippage
                    console.log("this is the approval amount: ", numberExponentToLarge(aprovalAmount))

                    let usersMap3SpendingTokenAwlloanceBallance = parseInt(await getSendersAllowanceBalance(event.target.token.value,User), 16).toString() // Check for allowance balance
                    console.log("usersMap3SpendingTokenAwlloanceBallance: ", usersMap3SpendingTokenAwlloanceBallance)

                        progress.start()
                            try{
                                const tx2 = await  approveSendersToken(event.target.token.value,Map3address,numberExponentToLarge(aprovalAmount))
                                await tx2.wait()
                                handleSuccess(`approval succsesful.. please sign the next transaction to send funds`)
                            } catch (err){
                                handleError(err.message)
                                progress.finish()

                                return;
                                }
                                progress.finish()

                    const oxQuoteResult = await oxQuoteRelayer(event,User)
                    progress.start()
                    try{
                        const OxPayResult = await OxPay(
                        oxQuoteResult.sellTokenAddress,
                        oxQuoteResult.buyTokenAddress,
                        oxQuoteResult.allowanceTargetquote,
                        oxQuoteResult.OxDelegateAddress,
                        oxQuoteResult.data,
                        oxQuoteResult.allowanceBalance,
                        oxQuoteResult.buyAmount,
                        oxQuoteResult.reciversAddress,
                        User
                        )
                        const oxReciept = OxPayResult.events[OxPayResult.events.length-1]
                        console.log("oxPayResult Reciept events: ", oxReciept)
                        console.log("0x pay results: ",OxPayResult )
                        handleSuccess(`transfer succesfull Thank you!`)
                    } catch (err){
                        handleError(err.message)                        
                        }
                        progress.finish()


            }

    };
    const [quote, setQuote] = React.useState("select tokens to get Quote");
    const [tokenName, setTokenName] = React.useState();
    const [sendersToken, setSendersToken] = React.useState();
    // default to USDT unless set to stable by vendor
    const [reciversToken, setReciversToken] = React.useState(); 
    const [amountToBeSent, setamountToBeSent] = React.useState(1);

    useEffect(()=>{
        const fetchPrice = async () => {
            // this function comes from the utililty folder
        let quotePrice = await oxPriceFetcher(
            sendersToken,
            reciversToken,
            amountToBeSent)
          setQuote(quotePrice)
        }
        fetchPrice()
      }, [sendersToken]);


    if (walletAddress && vendorsToken) {
      let VendorsWalletAddress = {walletAddress}
      let VendorsCurrencyToken = {vendorsToken}
      return (
        <PayVendor
         walletAddress = {VendorsWalletAddress}
         vendorsToken ={VendorsCurrencyToken}
         User={account}
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
                            id="amount" name='amount' value={amountToBeSent} placeholder="100"
                            onChange={(e)=>{
                                let userInputAmount = e.target.value;
                                setamountToBeSent(userInputAmount);
                            }}
                            />
                        </div>
                        <div className="mb-4 bg-white">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Recivers Wallet Address
                            </label>
                            <input className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="reciver" name='reciver' type="text" placeholder="0x**************"/>
                            {/* <h4 className="text-red-500 text-xs italic">Please Add a wallet Address</h4> */}
                        </div>
                        <div className="mb-4 bg-white">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                Recivers token
                            </label>
                            <input className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
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
                            <h4 className="text-blue-500 text-xs italic">{tokenName}</h4>
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

