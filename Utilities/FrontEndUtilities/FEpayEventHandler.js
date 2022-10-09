const {oxQuoteFetcher} = require('/Utilities/FrontEndUtilities/FEoxPriceFetcher');
const {oxQuoteRelayer} = require('/Utilities/FrontEndUtilities/FEoxQuoteRelayer');
import Utils from'/Utilities/utils';
 
// import {Utils.numberExponentToLarge,Utils.WholeTOWeiDecimals,Utils.slippage,Utils.getSendersAllowanceBalance,Utils.EthAddress,Utils.WethAddress,getSendersAllowanceBalanceInWei,
//  } from'../Utilities/utils';
 import{approveTransactionSender} from "./FEapproveTransactionRelayer"
 import{map3PayTransactionRelayer, map3PayTransactionSender} from "./FEmap3PayTransactionRelayer"
 import{map3OxPayTransactionRelayer, map3OxPayTransactionSender} from "./FEmap3OxPayTransactionRelayer"
 import{oxSwapERC20ToEthTransactionRelayer, oxSwapERC20ToEthTransactionSender} from "./FEoxSwapERC20ToEthTransactionRelayer"

 const returnAmountToBeSent = async (UsertransactionInput,chainId) =>{
  let tempTokenammount;
  let tempUsersMap3SpendingTokenAwlloanceBallance;

      if (UsertransactionInput.sendersToken == UsertransactionInput.reciversToken) {
           console.log("sameTokenEventHandler")
          tempTokenammount = await  Utils.WholeTOWeiDecimals(UsertransactionInput.sendersToken,UsertransactionInput.amountToBeSent,chainId)
          tempUsersMap3SpendingTokenAwlloanceBallance = await Utils.getSendersAllowanceBalanceInWei(UsertransactionInput.sendersToken,UsertransactionInput.sender,chainId)

      } else {
        console.log("oxSwapEventHandler")
        let reciversTokenAddress = UsertransactionInput.reciversToken;
        if ( UsertransactionInput.reciversToken == Utils.EthAddress){
          reciversTokenAddress = Utils.WethAddress(chainId);
        }

        let quotedAmmountToSell;
          if (UsertransactionInput.sendersToken == Utils.WethAddress(chainId)){
            quotedAmmountToSell = UsertransactionInput.amountToBeSent * Math.pow(10, 18)
          }else{ 
          quotedAmmountToSell = await oxQuoteFetcher(
          UsertransactionInput.sendersToken,
          reciversTokenAddress,
          UsertransactionInput.amountToBeSent,chainId
          )}
              console.log("this is amont to sell from returnAmountToBeSent", quotedAmmountToSell)
              const aprovalAmount = (quotedAmmountToSell *UsertransactionInput.slippage).toFixed(0).toString() // change multiplier to come from Utils.slippage
              console.log("this is the approval amount from returnAmountToBeSent: ", Utils.numberExponentToLarge(aprovalAmount))
  
              let  usersMap3SpendingTokenAwlloanceBallance = await Utils.getSendersAllowanceBalanceInWei(UsertransactionInput.sendersToken,UsertransactionInput.sender,chainId)

              tempTokenammount = aprovalAmount;
              tempUsersMap3SpendingTokenAwlloanceBallance = usersMap3SpendingTokenAwlloanceBallance;
      }
    console.log('end of returnAmountToBeSent funciton call')
    return {tempTokenammount,tempUsersMap3SpendingTokenAwlloanceBallance}

}

 const approveTransaction = async (signer, UsertransactionInput, txdata) =>{
  console.log("signer, UsertransactionInput, txdata from approve executor..", signer, UsertransactionInput, txdata)

  let txDtl = await approveTransactionSender(signer, UsertransactionInput, txdata )
  console.log(await txDtl.wait(), "txDtl.wait")
}

const sameTokenTransaction = async (signer, txdata,txValue) => {
  return await map3PayTransactionSender (signer, txdata,  txValue)
}

// This Functions generates the required bytecode and transaction details required for same token
//transfers
const sameTokenEventHandler = async (signer, UsertransactionInput, User,handleError ,  _sendAsWeth,chainId) => {
        let constructedTx;
        console.log("initiating simple SameTokenTransfer")
        let tokenammount;
        let sendersTokenAddress = UsertransactionInput.sendersToken;

        if ( sendersTokenAddress == Utils.EthAddress){
        sendersTokenAddress = Utils.WethAddress(chainId);
        tokenammount = await  Utils.WholeTOWeiDecimals(sendersTokenAddress,UsertransactionInput.amountToBeSent,chainId)
        console.log("tokenAmount is in eth")
        }else{
        tokenammount = await  Utils.WholeTOWeiDecimals(sendersTokenAddress,UsertransactionInput.amountToBeSent,chainId)
        console.log("tokenAmount is in ERC20")

        }
        console.log("token amount vs converted token amount", UsertransactionInput.amountToBeSent,tokenammount)
        
        let usersMap3SpendingTokenAwlloanceBallance = await Utils.getSendersAllowanceBalanceInWei(sendersTokenAddress,User,chainId)

        console.log("usersMap3SpendingTokenAwlloanceBallance: ", usersMap3SpendingTokenAwlloanceBallance)

      
      // CHECK TO AVOID QUOTE ERROR IN THE CASE OF ETH TRANSACTION
      if ( UsertransactionInput.sendersToken == Utils.EthAddress){
        // sendersTokenAddress = Utils.WethAddress(chainId);
        usersMap3SpendingTokenAwlloanceBallance = tokenammount;

      }
//         i am having the exact problem. 
// i have a try{}catch(e){} block that helps me handle errors on my front end but the problem is.
// i am rejecting an erc20 approval transaction on my metamask mobile browser but meta mask does not throw the expected 4001 code error. However when i try the same steps with the same wallet connected to my pc chrome browser,  it throws.

        try{

          if ( UsertransactionInput.sendersToken == Utils.EthAddress){
            constructedTx = await map3PayTransactionRelayer(signer, UsertransactionInput,tokenammount,tokenammount,_sendAsWeth );
          }else{
            constructedTx = await map3PayTransactionRelayer(signer, UsertransactionInput,tokenammount,0,_sendAsWeth)
          }
        } catch (err) {
            if (err.reason){
                handleError(` transfer failed please try again ${err.reason}`)
               }else{
                   handleError(` transfer failed please try again ${err.message}`)
               }

        }
        return constructedTx


}

















const oxSwapTransaction = async (signer,txdata, txValue) => {
  return await map3OxPayTransactionSender(signer,txdata, txValue)
}

// This Functions generates the required bytecode and transaction details required for 
// swaps between tokens 
  const oxSwapEventHandler = async (signer, UsertransactionInput, User,handleError,chainId) => {
        // situation where Tokens do not match
// alert('all new provider updates recieved... function2')
        let constructedTx;
      // new inputed code
      let sendersTokenAddress = UsertransactionInput.sendersToken;
      // CHECK TO AVOID QUOTE ERROR IN THE CASE OF ETH TRANSACTION
      if ( sendersTokenAddress == Utils.EthAddress){
        console.log("weth address...", Utils.WethAddress(chainId))
        console.log("ETH address...", Utils.EthAddress)
        sendersTokenAddress = Utils.WethAddress(chainId);
      }


        const quotedAmmountToSell = await oxQuoteFetcher(
        // UsertransactionInput.sendersToken,
        sendersTokenAddress,
        UsertransactionInput.reciversToken,
        UsertransactionInput.amountToBeSent,
        // handleError
        )
            console.log("this is amont to sell", quotedAmmountToSell)
            const aprovalAmount = (quotedAmmountToSell *UsertransactionInput.slippage).toFixed(0).toString() // change multiplier to come from Utils.slippage
            console.log("this is the approval amount: ", Utils.numberExponentToLarge(aprovalAmount))

            let usersMap3SpendingTokenAwlloanceBallance = await Utils.getSendersAllowanceBalanceInWei(sendersTokenAddress,User,chainId)

            console.log("usersMap3SpendingTokenAwlloanceBallance: ", usersMap3SpendingTokenAwlloanceBallance)

            // CHECK TO AVOID ALLOWANCE IN THE CASE OF ETH TRANSACTION
            if ( UsertransactionInput.sendersToken == Utils.EthAddress){
              usersMap3SpendingTokenAwlloanceBallance = aprovalAmount;
              console.log("equating approval amount to token ammount so we skip one transaction")
            }
        let  oxQuoteResult 
        try{

          oxQuoteResult = await oxQuoteRelayer(UsertransactionInput,sendersTokenAddress,User)

        }catch(err){
          handleError(`failed to generate Quote ${err.message}`)
          return;
        }
        
        try{

          if ( UsertransactionInput.sendersToken == Utils.EthAddress){
            constructedTx = await map3OxPayTransactionRelayer(signer, oxQuoteResult,aprovalAmount)// tx value = buyamount
          }else{
            constructedTx = await map3OxPayTransactionRelayer(signer, oxQuoteResult,0)// tx value = 0
          }
        } catch(err){
            if (err.reason){
             handleError(` transfer failed ${err.reason}`)
            return;
            }else{
                handleError(` transfer failed ${err.message}`)
            return;
            }
        }
  return constructedTx

}















  const oxSwapERC20ToEthTransaction = async (signer, txdata, txValue) => {
   return await oxSwapERC20ToEthTransactionSender (signer, txdata, txValue )
  }


// This Functions generates the required bytecode and transaction details required for 
// swaps from erc20 to native tokens.

    const oxSwapERC20ToEth = async (signer, UsertransactionInput, User,handleError,chainId) => {
      let constructedTx;
      let reciversTokenAddress = UsertransactionInput.reciversToken;
      let sendersTokenAddress = UsertransactionInput.sendersToken;
      let newUserInput;
      // CHECK TO AVOID QUOTE ERROR IN THE CASE OF ETH TRANSACTION
      if ( reciversTokenAddress == Utils.EthAddress){
        reciversTokenAddress = Utils.WethAddress(chainId);

          newUserInput = {sender:UsertransactionInput.sender,
          reciver:UsertransactionInput.reciver,sendersToken:UsertransactionInput.sendersToken,reciversToken:Utils.WethAddress(chainId),
          amountToBeSent:UsertransactionInput.amountToBeSent, slippage:UsertransactionInput.slippage}
        }

          let aprovalAmount;

            if (UsertransactionInput.sendersToken == Utils.WethAddress(chainId)){
            console.log("ethers utils does not always get imported", Utils.ethers.utils)
            console.log("ethers utils does not always UsertransactionInput.amountToBeSent", UsertransactionInput.amountToBeSent)
            console.log(" UsertransactionInput.amountToBeSent*(10^18)", UsertransactionInput.amountToBeSent*Math.pow(10, 18))

            let tempAmount = UsertransactionInput.amountToBeSent*Math.pow(10, 18)//.toFixed(0).toString() // change multiplier to come from Utils.slippage
            console.log("tempAmount", tempAmount)
      
            aprovalAmount =(tempAmount *UsertransactionInput.slippage).toFixed(0).toString()

            }else{
              const quotedAmmountToSell = await oxQuoteFetcher(
                UsertransactionInput.sendersToken,
                reciversTokenAddress,
                // UsertransactionInput.reciversToken,
                UsertransactionInput.amountToBeSent,chainId
                )
              console.log("this is amont to sell", quotedAmmountToSell)
            aprovalAmount = (quotedAmmountToSell *UsertransactionInput.slippage).toFixed(0).toString() // change multiplier to come from Utils.slippage
          }
        
            console.log("this is the approval amount: ", Utils.numberExponentToLarge(aprovalAmount))

            let usersMap3SpendingTokenAwlloanceBallance = await Utils.getSendersAllowanceBalanceInWei(sendersTokenAddress,User,chainId)

            console.log("usersMap3SpendingTokenAwlloanceBallance: ", usersMap3SpendingTokenAwlloanceBallance)
          

        let oxQuoteResult;
        try{

            if (UsertransactionInput.sendersToken == Utils.WethAddress(chainId)){
            
                oxQuoteResult={
                  sellTokenAddress:Utils.WethAddress(chainId), // sellToken // Wrapped token
                  buyTokenAddress: Utils.WethAddress(chainId), // buyToken // we dont need this in this case. but we send it to maintain compactibility
                  allowanceTargetquote: Utils.Map3address,// spender // we dont need this in this case. but we send it to maintain compactibility
                  OxDelegateAddress: Utils.Map3address,// swapTarget // we dont need this in this case. but we send it to maintain compactibility
                  data: Utils.dummyHexData, // swapCallData // we dont need this in this case. but we send it to maintain compactibility
                  allowanceBalance: aprovalAmount,// _tokenamount
                  // buyAmount:  Utils.ethers.utils.parseEther(UsertransactionInput.amountToBeSent).toString(),//.toFixed(0).toString(), //(,18), // _sendAmount
                  buyAmount:  String(UsertransactionInput.amountToBeSent*Math.pow(10, 18)),//.toFixed(0).toString(), //(,18), // _sendAmount
                  reciversAddress: UsertransactionInput.reciver// _toAddress
                  }
            }else{
            oxQuoteResult = await oxQuoteRelayer(newUserInput,sendersTokenAddress,User,chainId)
            }
        
          }catch(err){
            handleError(`failed to generate Quote ${err.message}`)
            return;
          }

          try{

            constructedTx = await oxSwapERC20ToEthTransactionRelayer(signer, oxQuoteResult,0)// tx value = 0
          } catch(err){
              if (err.reason){
              handleError(` transfer failed ${err.reason}`)
              return;
              }else{
                  handleError(` transfer failed ${err.message}`)
              return;
              }
          }


      return constructedTx

  }





module.exports = {sameTokenEventHandler, oxSwapEventHandler, oxSwapERC20ToEth,
  approveTransaction, sameTokenTransaction, oxSwapTransaction, oxSwapERC20ToEthTransaction,
  returnAmountToBeSent
}//