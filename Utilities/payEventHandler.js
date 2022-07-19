const {oxQuoteFetcher} = require('../Utilities/oxPriceFetcher');
const {oxQuoteRelayer} = require('../Utilities/oxQuoteRelayer')
import {numberExponentToLarge,WholeTOWeiDecimals,slippage,getSendersAllowanceBalance,
 } from'../Utilities/utils';
 import{approveTransactionRelayer} from "../Utilities/approveTransactionRelayer"
 import{map3PayTransactionRelayer} from "../Utilities/map3PayTransactionRelayer"
 import{map3OxPayTransactionRelayer} from "../Utilities/map3OxPayTransactionRelayer"


const sameTokenEventHandler = async (event, User, dispatch ) => {

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



    
console.log('payevent recieved')
        console.log("initiating simple SameTokenTransfer")
        const tokenammount = await  WholeTOWeiDecimals(event.target.reciversChoiceToken.value,event.target.amount.value)
        console.log("token amount vs converted token amount", event.target.amount.value,tokenammount)
        let usersMap3SpendingTokenAwlloanceBallance = parseInt(await getSendersAllowanceBalance(event.target.token.value,User), 10).toString()
        console.log("usersMap3SpendingTokenAwlloanceBallance: ", usersMap3SpendingTokenAwlloanceBallance)
        // CHECK FOR CURRENT  USER ALLOWNCE BALANCE
        if(tokenammount - usersMap3SpendingTokenAwlloanceBallance > 1){
            console.log("please approve more tokens")

            try{

            await approveTransactionRelayer(event,tokenammount)
            handleSuccess(`approval succsesful.. please sign the next transaction to send funds`)

            } catch(err){
                if (err.reason){
                 handleError(` approval failed ${err.reason}`)
                return;
                }else{
                    handleError(` approval failed ${err.message}`)
                return;
                }
            }

        } else{
            // do something....
            console.log("we are all good, you have enough tokens approved...", tokenammount-usersMap3SpendingTokenAwlloanceBallance)
        }
        try{
            await map3PayTransactionRelayer(event,tokenammount)
            handleSuccess(`transfer succesfull Thank you!`)

        } catch (err) {
            // handleError(` transfer failed please try again. ${err.message}`)
            if (err.reason){
                handleError(` transfer failed please try again ${err.reason}`)
               }else{
                   handleError(` transfer failed please try again ${err.message}`)
               }

        }
        return


}



const oxSwapEventHandler = async (event, User, dispatch ) => {
        // situation where Tokens do not match


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

        const quotedAmmountToSell = await oxQuoteFetcher(
        event.target.token.value,
        event.target.reciversChoiceToken.value,
        event.target.amount.value
        )
            console.log("this is amont to sell", quotedAmmountToSell)
            const aprovalAmount = (quotedAmmountToSell *slippage).toFixed(0).toString() // change multiplier to come from slippage
            console.log("this is the approval amount: ", numberExponentToLarge(aprovalAmount))

            let usersMap3SpendingTokenAwlloanceBallance = parseInt(await getSendersAllowanceBalance(event.target.token.value,User), 10).toString() // Check for allowance balance
            console.log("usersMap3SpendingTokenAwlloanceBallance: ", usersMap3SpendingTokenAwlloanceBallance)

      if(aprovalAmount - usersMap3SpendingTokenAwlloanceBallance > 1){
        console.log("please approve more tokens...")

        const tokenammount = numberExponentToLarge(aprovalAmount)



        try{

            await approveTransactionRelayer(event,tokenammount)
            handleSuccess(`approval succsesful.. please sign the next transaction to send funds`)

            } catch(err){
                if (err.reason){
                 handleError(` approval failed ${err.reason}`)
                return;
                }else{
                    handleError(` approval failed ${err.message}`)
                return;
                }
            }

    }else{
        // do something....
        console.log("we are all good, you have enough tokens approved...", aprovalAmount-usersMap3SpendingTokenAwlloanceBallance)
    }

        const oxQuoteResult = await oxQuoteRelayer(event,User)
        try{

            await map3OxPayTransactionRelayer(oxQuoteResult)

            handleSuccess(`transfer succesfull Thank you!`)
        } catch(err){
            if (err.reason){
             handleError(` approval failed ${err.reason}`)
            return;
            }else{
                handleError(` approval failed ${err.message}`)
            return;
            }
        }

return

}

module.exports = {sameTokenEventHandler, oxSwapEventHandler}



















// // import React, { useState, useEffect } from 'react';
// import PayVendor from 'components/PayVendor';
// import tokenAdresses from '../constants/tokens.json'
// const BigNumber = require('bignumber.js');
// import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
// const fetch = require('node-fetch');
// import { Button, Icon, useNotification } from "web3uikit";
// import ProgressBar from "@badrap/bar-of-progress";
// const {oxPriceFetcher,oxQuoteFetcher} = require('../Utilities/oxPriceFetcher');
// const {oxQuoteRelayer} = require('../Utilities/oxQuoteRelayer')
// // const Map3Abi = require( '../artifacts/contracts/Map3.sol/Map3Pay.json')
// import {map3Pay,approveSendersToken,testAccount,Map3address,numberExponentToLarge,
//     WholeTOWeiDecimals,IERC20Abi,slippage,Map3Abi,getSendersAllowanceBalance, getUserErc20Balance,functionBytesEncoder,
//     readFunctionBytesEncoderAndImplementor,
//     functionBytesEncoderAndImplementor,
//     getFunctionSignatureHash
//     // ,listenForMap3Events
//  } from'../Utilities/utils';
// import{OxPay} from '../Utilities/OxPay';
// import { ethers }from "ethers";

// const payEventHandler = async (newVendorRegistrationData ) => {

// return

// }

// module.exports = {payEventHandler}