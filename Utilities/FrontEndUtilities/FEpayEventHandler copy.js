const {oxQuoteFetcher} = require('/Utilities/FrontEndUtilities/FEoxPriceFetcher');
const {oxQuoteRelayer} = require('/Utilities/FrontEndUtilities/FEoxQuoteRelayer');
import Utils from'/Utilities/utils';

// import {Utils.numberExponentToLarge,Utils.WholeTOWeiDecimals,Utils.slippage,Utils.getSendersAllowanceBalance,Utils.EthAddress,Utils.WethAddress,getSendersAllowanceBalanceInWei,
//  } from'../Utilities/utils';
 import{approveTransactionRelayer} from "./FEapproveTransactionRelayer"
 import{map3PayTransactionRelayer} from "./FEmap3PayTransactionRelayer"
 import{map3OxPayTransactionRelayer} from "./FEmap3OxPayTransactionRelayer"
 import{oxSwapERC20ToEthTransactionRelayer} from "./FEoxSwapERC20ToEthTransactionRelayer"

//  let UsertransactionInput = {
//   sender: account, 
//   reciver: reciver,
//   sendersToken: sendersToken,
//   reciversToken: reciversToken,
//   amountToBeSent: amountToBeSent,
//   Utils.slippage: userSlippage
// }





const sameTokenEventHandler = async (signer, UsertransactionInput, User, toast,toast, setSystemProcessing , setTransacting, _sendAsWeth) => {
// alert('all new provider updates recieved... function 1')
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
              await approveTransactionRelayer(signer,UsertransactionInput,Utils.U256MAXVALUE)
            } catch(err){ 
                setTransacting(false)
                if (err.reason){
                 toast.error(` approval failed ${err.reason}`)
                return;
                }else{
                toast.error(` approval failed ${err.message}`)
                return;
                }
            }
            setTransacting(false)
            toast.success(`approval succsesful.. please sign the next transaction to send funds`)

        } 
//         i am having the exact problem. 
// i have a try{}catch(e){} block that helps me handle errors on my front end but the problem is.
// i am rejecting an erc20 approval transaction on my metamask mobile browser but meta mask does not throw the expected 4001 code error. However when i try the same steps with the same wallet connected to my pc chrome browser,  it throws.

        try{

          setTransacting(true)
          if ( UsertransactionInput.sendersToken == Utils.EthAddress){
                await map3PayTransactionRelayer(signer, UsertransactionInput,tokenammount,tokenammount,_sendAsWeth );
          setTransacting(false)
          }else{
            await map3PayTransactionRelayer(signer, UsertransactionInput,tokenammount,0,_sendAsWeth)
          }
          setTransacting(false)
          toast.success(`transfer succesfull Thank you!`)

        } catch (err) {
          setTransacting(false)
            if (err.reason){
                toast.error(` transfer failed please try again ${err.reason}`)
               }else{
                   toast.error(` transfer failed please try again ${err.message}`)
               }

        }
        return


}






const oxSwapEventHandler = async (signer, UsertransactionInput, User, toast,toast, setSystemProcessing, setTransacting ) => {
        // situation where Tokens do not match
// alert('all new provider updates recieved... function2')

        setSystemProcessing(true)

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
        toast
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
        setSystemProcessing(false)

      if(aprovalAmount - usersMap3SpendingTokenAwlloanceBallance > 1){
        console.log("please approve more tokens...")
        //alert("please approve more tokens")

        const tokenammount = Utils.numberExponentToLarge(aprovalAmount)


        setTransacting(true)
        try{

            await approveTransactionRelayer(signer, UsertransactionInput,Utils.U256MAXVALUE, )
            //alert("approval succesful")
            toast.success(`approval succsesful.. please sign the next transaction to send funds`)

            } catch(err){
              setTransacting(false)
                if (err.reason){
                //alert("approval failed. from metamask")

                 toast.error(` approval failed ${err.reason}`)
                return;
                }else{
                //alert("approval failed. from rpc")
                    toast.error(` approval failed ${err.message}`)
                return;
                }
            }
            setTransacting(false)

    }
    
    // else{
    //     // do something....
    //     console.log("we are all good, you have enough tokens approved...", aprovalAmount-usersMap3SpendingTokenAwlloanceBallance)
    // }

    setTransacting(true)

        let  oxQuoteResult 
        try{

          oxQuoteResult = await oxQuoteRelayer(UsertransactionInput,sendersTokenAddress,User)

        }catch(err){
          //alert("transaction failed. from rpc")
          setTransacting(false)
          toast.error(`failed to generate Quote ${err.message}`)
          return;
        }
        
        try{

          if ( UsertransactionInput.sendersToken == Utils.EthAddress){
            await map3OxPayTransactionRelayer(signer, oxQuoteResult,aprovalAmount)// tx value = buyamount
            //alert("NATIVE ETH Transaction Succesful")
          }else{
            await map3OxPayTransactionRelayer(signer, oxQuoteResult,0)// tx value = 0
            //alert("ERC20 Transaction Succesful")


          }
            setTransacting(false)
            toast.success(`transfer succesfull Thank you!`)
        } catch(err){
            setTransacting(false)
            if (err.reason){
              //alert("transaction failed. from metamask")
             toast.error(` transfer failed ${err.reason}`)
            return;
            }else{
              //alert("transaction failed. from rpc")
                toast.error(` transfer failed ${err.message}`)
            return;
            }
        }
        setTransacting(false)
return

}



  const oxSwapERC20ToEth = async (signer, UsertransactionInput, User, toast,toast, setSystemProcessing, setTransacting ) => {
    // situation where Tokens do not match
// alert('all new provider updates recieved... function 3')

    setSystemProcessing(true)
  let reciversTokenAddress = UsertransactionInput.reciversToken;
  let sendersTokenAddress = UsertransactionInput.sendersToken;
  let newUserInput;
  // CHECK TO AVOID QUOTE ERROR IN THE CASE OF ETH TRANSACTION
  if ( reciversTokenAddress == Utils.EthAddress){
    reciversTokenAddress = Utils.WethAddress;

      newUserInput = {sender:UsertransactionInput.sender,
      reciver:UsertransactionInput.reciver,sendersToken:UsertransactionInput.sendersToken,reciversToken:Utils.WethAddress,
      amountToBeSent:UsertransactionInput.amountToBeSent, slippage:UsertransactionInput.slippage}
    }

      let aprovalAmount;

        if (UsertransactionInput.sendersToken == Utils.WethAddress){
        console.log("ethers utils does not always get imported", Utils.ethers.utils)
        console.log("ethers utils does not always UsertransactionInput.amountToBeSent", UsertransactionInput.amountToBeSent)
        console.log(" UsertransactionInput.amountToBeSent*(10^18)", UsertransactionInput.amountToBeSent*Math.pow(10, 18))

        // let tempAmount = Utils.ethers.utils.parseEther(UsertransactionInput.amountToBeSent)//.toFixed(0).toString() // change multiplier to come from Utils.slippage
        let tempAmount = UsertransactionInput.amountToBeSent*Math.pow(10, 18)//.toFixed(0).toString() // change multiplier to come from Utils.slippage
        console.log("tempAmount", tempAmount)
   
        
        aprovalAmount =(tempAmount *UsertransactionInput.slippage).toFixed(0).toString()

        }else{

           const quotedAmmountToSell = await oxQuoteFetcher(
            UsertransactionInput.sendersToken,
            reciversTokenAddress,
            // UsertransactionInput.reciversToken,
            UsertransactionInput.amountToBeSent,
            toast
            )
          console.log("this is amont to sell", quotedAmmountToSell)
        aprovalAmount = (quotedAmmountToSell *UsertransactionInput.slippage).toFixed(0).toString() // change multiplier to come from Utils.slippage
    console.log(".... testing bug7 conditional of 4 and 5 got here")
        
      }
     
        console.log("this is the approval amount: ", Utils.numberExponentToLarge(aprovalAmount))

        let usersMap3SpendingTokenAwlloanceBallance = await Utils.getSendersAllowanceBalanceInWei(sendersTokenAddress,User)

        console.log("usersMap3SpendingTokenAwlloanceBallance: ", usersMap3SpendingTokenAwlloanceBallance)
      


        setSystemProcessing(false)

        setTransacting(true)


    if(aprovalAmount - usersMap3SpendingTokenAwlloanceBallance > 1){
      console.log("please approve more tokens...")
      //alert("please approve more tokens")

      const tokenammount = Utils.numberExponentToLarge(aprovalAmount)



      try{

          await approveTransactionRelayer(signer, UsertransactionInput,Utils.U256MAXVALUE, )
          //alert("approval succesful")
          toast.success(`approval succsesful.. please sign the next transaction to send funds`)

          } catch(err){
            setTransacting(false)
              if (err.reason){
              //alert("approval failed. from metamask")
              toast.error(` approval failed ${err.reason}`)
              return;
              }else{
              //alert("approval failed. from rpc")
                  toast.error(` approval failed ${err.message}`)
              return;
              }
          }

    }

    let oxQuoteResult;
    try{

        if (UsertransactionInput.sendersToken == Utils.WethAddress){
         
            oxQuoteResult={
              sellTokenAddress:Utils.WethAddress, // sellToken // Wrapped token
              buyTokenAddress: Utils.WethAddress, // buyToken // we dont need this in this case. but we send it to maintain compactibility
              allowanceTargetquote: Utils.Map3address,// spender // we dont need this in this case. but we send it to maintain compactibility
              OxDelegateAddress: Utils.Map3address,// swapTarget // we dont need this in this case. but we send it to maintain compactibility
              data: Utils.dummyHexData, // swapCallData // we dont need this in this case. but we send it to maintain compactibility
              allowanceBalance: aprovalAmount,// _tokenamount
              // buyAmount:  Utils.ethers.utils.parseEther(UsertransactionInput.amountToBeSent).toString(),//.toFixed(0).toString(), //(,18), // _sendAmount
              buyAmount:  String(UsertransactionInput.amountToBeSent*Math.pow(10, 18)),//.toFixed(0).toString(), //(,18), // _sendAmount
              
              // UsertransactionInput.amountToBeSent*Math.pow(10, 18)
              
              reciversAddress: UsertransactionInput.reciver// _toAddress
              }
        }else{
          // const oxQuoteResult = await oxQuoteRelayer(UsertransactionInput,sendersTokenAddress,User)
        oxQuoteResult = await oxQuoteRelayer(newUserInput,sendersTokenAddress,User)

        }
    
      }catch(err){
        setTransacting(false)
        toast.error(`failed to generate Quote ${err.message}`)
        return;

      }

      try{

          await oxSwapERC20ToEthTransactionRelayer(signer, oxQuoteResult,0)// tx value = 0

          toast.success(`transfer succesfull Thank you!`)
      } catch(err){
        setTransacting(false)
          if (err.reason){
            //alert("transaction failed. from metamask")
          toast.error(` transfer failed ${err.reason}`)
          return;
          }else{
            //alert("transaction failed. from rpc")
              toast.error(` transfer failed ${err.message}`)
              
          return;
          }
      }
      setTransacting(false)


  return

  }





module.exports = {sameTokenEventHandler, oxSwapEventHandler, oxSwapERC20ToEth}//