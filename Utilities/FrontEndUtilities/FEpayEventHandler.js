const {oxQuoteFetcher} = require('/Utilities/FrontEndUtilities/FEoxPriceFetcher');
const {oxQuoteRelayer} = require('/Utilities/FrontEndUtilities/FEoxQuoteRelayer');
import Utils from'/Utilities/utils';

// import {Utils.numberExponentToLarge,Utils.WholeTOWeiDecimals,Utils.slippage,Utils.getSendersAllowanceBalance,Utils.EthAddress,Utils.WethAddress,getSendersAllowanceBalanceInWei,
//  } from'../Utilities/utils';
 import{approveTransactionRelayer} from "./FEapproveTransactionRelayer"
 import{map3PayTransactionRelayer} from "./FEmap3PayTransactionRelayer"
 import{map3OxPayTransactionRelayer} from "./FEmap3OxPayTransactionRelayer"

//  let UsertransactionInput = {
//   sender: account,
//   reciver: reciver,
//   sendersToken: sendersToken,
//   reciversToken: reciversToken,
//   amountToBeSent: amountToBeSent,
//   Utils.slippage: userSlippage
// }





const sameTokenEventHandler = async (UsertransactionInput, User, handleSuccess,handleError, setSystemProcessing , setTransacting, _sendAsWeth) => {

        setSystemProcessing(true)

        console.log('payevent recieved')
        console.log("initiating simple SameTokenTransfer")
        // const tokenammount = await  Utils.WholeTOWeiDecimals(UsertransactionInput.reciversToken,UsertransactionInput.amountToBeSent)
        let tokenammount;
        let sendersTokenAddress = UsertransactionInput.sendersToken;

        if ( sendersTokenAddress == Utils.EthAddress){
        sendersTokenAddress = Utils.WethAddress;
        tokenammount = await  Utils.WholeTOWeiDecimals(sendersTokenAddress,UsertransactionInput.amountToBeSent)
        console.log("tokenAmount is in eth")
        }else{
        tokenammount = await  Utils.WholeTOWeiDecimals(sendersTokenAddress,UsertransactionInput.amountToBeSent)
        console.log("tokenAmount is in ERC20")

        }
        console.log("token amount vs converted token amount", UsertransactionInput.amountToBeSent,tokenammount)
        
        let usersMap3SpendingTokenAwlloanceBallance = await Utils.getSendersAllowanceBalanceInWei(sendersTokenAddress,User)

        console.log("usersMap3SpendingTokenAwlloanceBallance: ", usersMap3SpendingTokenAwlloanceBallance)

        // let sendersTokenAddress = UsertransactionInput.sendersToken;
      // CHECK TO AVOID QUOTE ERROR IN THE CASE OF ETH TRANSACTION
      if ( UsertransactionInput.sendersToken == Utils.EthAddress){
        // sendersTokenAddress = Utils.WethAddress;
        usersMap3SpendingTokenAwlloanceBallance = tokenammount;

      }
      setSystemProcessing(false)  

        // CHECK FOR CURRENT  USER ALLOWNCE BALANCE
        if(tokenammount - usersMap3SpendingTokenAwlloanceBallance > 1){
            console.log("please approve more tokens")
            setTransacting(true)
            try{
              await approveTransactionRelayer(UsertransactionInput,Utils.U256MAXVALUE)
            } catch(err){ 
                setTransacting(false)
                if (err.reason){
                 handleError(` approval failed ${err.reason}`)
                return;
                }else{
                handleError(` approval failed ${err.message}`)
                return;
                }
            }
            setTransacting(false)
            handleSuccess(`approval succsesful.. please sign the next transaction to send funds`)

        } 
//         i am having the exact problem. 
// i have a try{}catch(e){} block that helps me handle errors on my front end but the problem is.
// i am rejecting an erc20 approval transaction on my metamask mobile browser but meta mask does not throw the expected 4001 code error. However when i try the same steps with the same wallet connected to my pc chrome browser,  it throws.

        try{

          setTransacting(true)
          if ( UsertransactionInput.sendersToken == Utils.EthAddress){
                await map3PayTransactionRelayer(UsertransactionInput,tokenammount,tokenammount,_sendAsWeth );
          setTransacting(false)
          }else{
            await map3PayTransactionRelayer(UsertransactionInput,tokenammount,0,_sendAsWeth)
          }
          setTransacting(false)
          handleSuccess(`transfer succesfull Thank you!`)

        } catch (err) {
          setTransacting(false)
            if (err.reason){
                handleError(` transfer failed please try again ${err.reason}`)
               }else{
                   handleError(` transfer failed please try again ${err.message}`)
               }

        }
        return


}






const oxSwapEventHandler = async (UsertransactionInput, User, handleSuccess,handleError, setSystemProcessing, setTransacting ) => {
        // situation where Tokens do not match
      // new inputed code
      let sendersTokenAddress = UsertransactionInput.sendersToken;
      // CHECK TO AVOID QUOTE ERROR IN THE CASE OF ETH TRANSACTION
      if ( sendersTokenAddress == Utils.EthAddress){
        console.log("weth address...", Utils.WethAddress)
        console.log("ETH address...", Utils.EthAddress)
        sendersTokenAddress = Utils.WethAddress;
      }


        const quotedAmmountToSell = await oxQuoteFetcher(
        // UsertransactionInput.sendersToken,
        sendersTokenAddress,
        UsertransactionInput.reciversToken,
        UsertransactionInput.amountToBeSent,
        handleError
        )
            console.log("this is amont to sell", quotedAmmountToSell)
            // const aprovalAmount = (quotedAmmountToSell *Utils.slippage).toFixed(0).toString() // change multiplier to come from Utils.slippage
            const aprovalAmount = (quotedAmmountToSell *UsertransactionInput.slippage).toFixed(0).toString() // change multiplier to come from Utils.slippage
            console.log("this is the approval amount: ", Utils.numberExponentToLarge(aprovalAmount))

            // let usersMap3SpendingTokenAwlloanceBallance = parseInt(await Utils.getSendersAllowanceBalance(UsertransactionInput.sendersToken,User), 10).toString() // Check for allowance balance?
            // let usersMap3SpendingTokenAwlloanceBallance = parseInt(await Utils.getSendersAllowanceBalance(sendersTokenAddress,User), 10).toString() // Check for allowance balance
            let usersMap3SpendingTokenAwlloanceBallance = await Utils.getSendersAllowanceBalanceInWei(sendersTokenAddress,User)

            console.log("usersMap3SpendingTokenAwlloanceBallance: ", usersMap3SpendingTokenAwlloanceBallance)

            // CHECK TO AVOID ALLOWANCE IN THE CASE OF ETH TRANSACTION
            if ( UsertransactionInput.sendersToken == Utils.EthAddress){
              usersMap3SpendingTokenAwlloanceBallance = aprovalAmount;
              console.log("equating approval amount to token ammount so we skip one transaction")
            }

      if(aprovalAmount - usersMap3SpendingTokenAwlloanceBallance > 1){
        console.log("please approve more tokens...")
        //alert("please approve more tokens")

        const tokenammount = Utils.numberExponentToLarge(aprovalAmount)



        try{

            await approveTransactionRelayer(UsertransactionInput,Utils.U256MAXVALUE, )
            //alert("approval succesful")
            handleSuccess(`approval succsesful.. please sign the next transaction to send funds`)

            } catch(err){
                if (err.reason){
                //alert("approval failed. from metamask")

                 handleError(` approval failed ${err.reason}`)
                return;
                }else{
                //alert("approval failed. from rpc")
                    handleError(` approval failed ${err.message}`)
                return;
                }
            }

    }else{
        // do something....
        console.log("we are all good, you have enough tokens approved...", aprovalAmount-usersMap3SpendingTokenAwlloanceBallance)
    }


        const oxQuoteResult = await oxQuoteRelayer(UsertransactionInput,sendersTokenAddress,User)
        try{

          if ( UsertransactionInput.sendersToken == Utils.EthAddress){
            await map3OxPayTransactionRelayer(oxQuoteResult,aprovalAmount)// tx value = buyamount
            //alert("NATIVE ETH Transaction Succesful")
              
          }else{
            await map3OxPayTransactionRelayer(oxQuoteResult,0)// tx value = 0
            //alert("ERC20 Transaction Succesful")


          }

            handleSuccess(`transfer succesfull Thank you!`)
        } catch(err){
            if (err.reason){
              //alert("transaction failed. from metamask")
             handleError(` transfer failed ${err.reason}`)
            return;
            }else{
              //alert("transaction failed. from rpc")
                handleError(` transfer failed ${err.message}`)
                
            return;
            }
        }

return

}

module.exports = {sameTokenEventHandler, oxSwapEventHandler}