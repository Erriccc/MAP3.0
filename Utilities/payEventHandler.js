const {oxQuoteFetcher} = require('../Utilities/oxPriceFetcher');
const {oxQuoteRelayer} = require('../Utilities/oxQuoteRelayer')
import Utils from'../Utilities/utils';

// import {numberExponentToLarge,WholeTOWeiDecimals,slippage,getSendersAllowanceBalance,EthAddress,WethAddress,Utils.getSendersAllowanceBalanceInWei,
//  } from'../Utilities/utils';
 import{approveTransactionRelayer} from "../Utilities/approveTransactionRelayer"
 import{map3PayTransactionRelayer} from "../Utilities/map3PayTransactionRelayer"
 import{map3OxPayTransactionRelayer} from "../Utilities/map3OxPayTransactionRelayer"

 import { ethers }from "ethers";

const sameTokenEventHandler = async (event, User, toast ) => {
    
        console.log('payevent recieved')
        console.log("initiating simple SameTokenTransfer")
        // const tokenammount = await  WholeTOWeiDecimals(event.target.reciversChoiceToken.value,event.target.amount.value)
        let tokenammount;
        let sendersTokenAddress = event.target.token.value;

        if ( sendersTokenAddress == Utils.EthAddress){
          sendersTokenAddress = Utils.WethAddress;
        tokenammount = await  Utils.WholeTOWeiDecimals(sendersTokenAddress,event.target.amount.value)
        console.log("tokenAmount is in eth")
        }else{
        tokenammount = await  Utils.WholeTOWeiDecimals(sendersTokenAddress,event.target.amount.value)
        console.log("tokenAmount is in ERC20")

        }
        console.log("token amount vs converted token amount", event.target.amount.value,tokenammount)
        // let usersMap3SpendingTokenAwlloanceBallance = parseInt(await getSendersAllowanceBalance(event.target.token.value,User), 10).toString()
        // let usersMap3SpendingTokenAwlloanceBallance = parseInt(await Utils.getSendersAllowanceBalance(sendersTokenAddress,User), 10).toString()
        let usersMap3SpendingTokenAwlloanceBallance = await Utils.getSendersAllowanceBalanceInWei(sendersTokenAddress,User)
        console.log("usersMap3SpendingTokenAwlloanceBallance: ", usersMap3SpendingTokenAwlloanceBallance)

        // let sendersTokenAddress = event.target.token.value;
      // CHECK TO AVOID QUOTE ERROR IN THE CASE OF ETH TRANSACTION
      if ( event.target.token.value == Utils.EthAddress){
        // sendersTokenAddress = WethAddress;
        usersMap3SpendingTokenAwlloanceBallance = tokenammount;

      }

        // CHECK FOR CURRENT  USER ALLOWNCE BALANCE
        if(tokenammount - usersMap3SpendingTokenAwlloanceBallance > 1){
            console.log("please approve more tokens")
            alert("please approve more tokens")


            try{

            await approveTransactionRelayer(event,tokenammount)
            alert("approval succesful")
            toast.success(`approval succsesful.. please sign the next transaction to send funds`)

            } catch(err){
                if (err.reason){
                alert("approval failed. from metamask")
                 toast.error(` approval failed ${err.reason}`)

                return;
                }else{
                alert("approval failed. from rpc")
                    toast.error(` approval failed ${err.message}`)
                return;
                }
            }

        } else{
            // do something....
            alert("we are all good. you have enough tokens")
            console.log("we are all good, you have enough tokens approved...", tokenammount-usersMap3SpendingTokenAwlloanceBallance)
        }
        try{

          if ( event.target.token.value == Utils.EthAddress){
            await map3PayTransactionRelayer(event,tokenammount,tokenammount );
            alert("NATIVE ETH Transaction Succesful")


    
          }else{
            await map3PayTransactionRelayer(event,tokenammount,0)
            alert("ERC20 Transaction Succesful")


          }
    
            toast.success(`transfer succesfull Thank you!`)

        } catch (err) {
            // toast.error(` transfer failed please try again. ${err.message}`)
            if (err.reason){
              alert("transaction failed. from metamask")
                toast.error(` transfer failed please try again ${err.reason}`)
               }else{
                  alert("transaction failed. from rpc")
                   toast.error(` transfer failed please try again ${err.message}`)
               }

        }
        return


}






const oxSwapEventHandler = async (event, User, toast ) => {
        // situation where Tokens do not match
      // new inputed code
      let sendersTokenAddress = event.target.token.value;
      // CHECK TO AVOID QUOTE ERROR IN THE CASE OF ETH TRANSACTION
      if ( sendersTokenAddress == Utils.EthAddress){
        console.log("weth address...", Utils.WethAddress)
        console.log("ETH address...", Utils.EthAddress)
        sendersTokenAddress = Utils.WethAddress;
      }


        const quotedAmmountToSell = await oxQuoteFetcher(
        // event.target.token.value,
        sendersTokenAddress,
        event.target.reciversChoiceToken.value,
        event.target.amount.value,
        toast
        )
            console.log("this is amont to sell", quotedAmmountToSell)
            const aprovalAmount = (quotedAmmountToSell *Utils.slippage).toFixed(0).toString() // change multiplier to come from slippage
            console.log("this is the approval amount: ", Utils.numberExponentToLarge(aprovalAmount))

            // let usersMap3SpendingTokenAwlloanceBallance = parseInt(await getSendersAllowanceBalance(event.target.token.value,User), 10).toString() // Check for allowance balance?
            // let usersMap3SpendingTokenAwlloanceBallance = parseInt(await Utils.getSendersAllowanceBalance(sendersTokenAddress,User), 10).toString() // Check for allowance balance
            let usersMap3SpendingTokenAwlloanceBallance = await Utils.getSendersAllowanceBalanceInWei(sendersTokenAddress,User)

            console.log("usersMap3SpendingTokenAwlloanceBallance: ", usersMap3SpendingTokenAwlloanceBallance)

            // CHECK TO AVOID ALLOWANCE IN THE CASE OF ETH TRANSACTION
            if ( event.target.token.value == Utils.EthAddress){
              usersMap3SpendingTokenAwlloanceBallance = aprovalAmount;
              console.log("equating approval amount to token ammount so we skip one transaction")
            }

      if(aprovalAmount - usersMap3SpendingTokenAwlloanceBallance > 1){
        console.log("please approve more tokens...")
        alert("please approve more tokens")

        const tokenammount = Utils.numberExponentToLarge(aprovalAmount)



        try{

            await approveTransactionRelayer(event,tokenammount)
            alert("approval succesful")
            toast.success(`approval succsesful.. please sign the next transaction to send funds`)

            } catch(err){
                if (err.reason){
                alert("approval failed. from metamask")

                 toast.error(` approval failed ${err.reason}`)
                return;
                }else{
                alert("approval failed. from rpc")
                    toast.error(` approval failed ${err.message}`)
                return;
                }
            }

    }else{
        // do something....
        console.log("we are all good, you have enough tokens approved...", aprovalAmount-usersMap3SpendingTokenAwlloanceBallance)
    }


        const oxQuoteResult = await oxQuoteRelayer(event,sendersTokenAddress,User)
        try{

          if ( event.target.token.value == Utils.EthAddress){
            await map3OxPayTransactionRelayer(oxQuoteResult,aprovalAmount)// tx value = buyamount
            alert("NATIVE ETH Transaction Succesful")
              
          }else{
            await map3OxPayTransactionRelayer(oxQuoteResult,0)// tx value = 0
            alert("ERC20 Transaction Succesful")


          }

            toast.success(`transfer succesfull Thank you!`)
        } catch(err){
            if (err.reason){
              alert("transaction failed. from metamask")
             toast.error(` transfer failed ${err.reason}`)
            return;
            }else{
              alert("transaction failed. from rpc")
                toast.error(` transfer failed ${err.message}`)
                
            return;
            }
        }

return

}

module.exports = {sameTokenEventHandler, oxSwapEventHandler}