import Utils from'/Utilities/utils';
import{oxSwapEventHandler, sameTokenEventHandler, oxSwapERC20ToEth,
  approveTransaction, sameTokenTransaction, oxSwapTransaction, oxSwapERC20ToEthTransaction,
  returnAmountToBeSent,

} from '/Utilities/FrontEndUtilities/FEpayEventHandler';
import{approveTransactionRelayer} from "./FEapproveTransactionRelayer"

const paymentTypeLogicServer = 
async (_provider, UsertransactionInput, handleSuccess,handleError, setTransactionPopulated, setTxDetails) => 
{
  setTxDetails(null)
  setTransactionPopulated(false)

  // alert('got here')
    const wrappedProvider = new Utils.ethers.providers.Web3Provider(_provider);
    const wrappedSigner = wrappedProvider.getSigner();
    let finalConstructedTxData;


  let sendersTokenAddress = UsertransactionInput.sendersToken;
  let tokenammount;
  let usersMap3SpendingTokenAwlloanceBallance;

  if ( sendersTokenAddress == Utils.EthAddress){
    console.log('eth transaction')
    usersMap3SpendingTokenAwlloanceBallance = 1
    tokenammount = usersMap3SpendingTokenAwlloanceBallance
  }else{
    console.log('non eth transaction')
    let {tempTokenammount,tempUsersMap3SpendingTokenAwlloanceBallance } = await returnAmountToBeSent(UsertransactionInput)
    usersMap3SpendingTokenAwlloanceBallance = tempUsersMap3SpendingTokenAwlloanceBallance
    tokenammount = tempTokenammount
  }


  if ( tokenammount - usersMap3SpendingTokenAwlloanceBallance > 1){

    console.log("please approve more tokens")
            try{
              finalConstructedTxData = await approveTransactionRelayer(wrappedProvider,Utils.U256MAXVALUE);
            } catch(err){
                if (err.reason){
                 handleError(` approval failed ${err.reason}`)
                return;
                }else{
                handleError(` approval failed ${err.message}`)
                return;
                }
            }
            let returnTxdetails  = {...finalConstructedTxData, UsertransactionInput}
            console.log('returnTxdetails',returnTxdetails)
            handleSuccess(`please  approve to continue`)
            setTxDetails(returnTxdetails)
            setTransactionPopulated(true);
  }
  else{     

    /////// SWAP From ERC20 To ETH or Native Token
          if(UsertransactionInput.reciversToken == Utils.EthAddress && UsertransactionInput.sendersToken !== Utils.EthAddress){
              try{
                finalConstructedTxData = await oxSwapERC20ToEth(wrappedProvider, UsertransactionInput, UsertransactionInput.sender,handleError);

              }catch(e){

              }

            }else if

            // /// SWAP ETH TO WETH
              (UsertransactionInput.sendersToken == Utils.EthAddress &&  UsertransactionInput.reciversToken == Utils.WethAddress ){

                      try{
                        finalConstructedTxData = await sameTokenEventHandler(wrappedProvider, UsertransactionInput, UsertransactionInput.sender,handleError,true);

                      }catch(e){

                      }

              } else{


                // listenForMap3Events();
                    if (UsertransactionInput.sendersToken == UsertransactionInput.reciversToken) {
                        try{
                              console.log("both tokens are the same", UsertransactionInput.sendersToken, UsertransactionInput.sendersToken)
                              finalConstructedTxData = await sameTokenEventHandler(wrappedProvider, UsertransactionInput, UsertransactionInput.sender,handleError,false);

                        }catch(e){

                        }
                    } else {
                      try{
                            console.log("different tokens", UsertransactionInput.sendersToken, UsertransactionInput.sendersToken)
                            finalConstructedTxData = await oxSwapEventHandler(wrappedProvider, UsertransactionInput, UsertransactionInput.sender,handleError,);
                          }catch(e){

                          }
                    }
              }
              let returnTxdetails  = {...finalConstructedTxData, UsertransactionInput}
            console.log('returnTxdetails',returnTxdetails)
              // handleSuccess(`transaction generated, please send to continue`)
              setTxDetails(returnTxdetails)
              setTransactionPopulated(true);
            }






}

const paymentTypeLogicExecutor = 
async (compiledTxdetails,setTransacting, _provider, handleSuccess,handleError, setTransactionPopulated, setTxDetails, setTxReciept) => 
{
  // alert('got here')
    const wrappedProvider = new Utils.ethers.providers.Web3Provider(_provider);
    const wrappedSigner = wrappedProvider.getSigner();

    let transactionReciept;

// NOTE CHECK IF   finalConstructedTxData.approveTx ? 


  if ( compiledTxdetails.approveTx){
    setTransacting(true)
    try{
      await approveTransaction(wrappedSigner,compiledTxdetails.UsertransactionInput, compiledTxdetails)
      handleSuccess(`Approval succesfull, please hit send`)
    }catch(err){
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
      await paymentTypeLogicServer (_provider, compiledTxdetails.UsertransactionInput,handleSuccess,handleError, setTransactionPopulated, setTxDetails)

  }
  else{     
      console.log('submitiing tx')
      console.log('compiledTxdetails.UsertransactionInput..', compiledTxdetails.UsertransactionInput)
    /////// SWAP From ERC20 To ETH or Native Token
          if(compiledTxdetails.UsertransactionInput.reciversToken == Utils.EthAddress && compiledTxdetails.UsertransactionInput.sendersToken !== Utils.EthAddress){
              console.log('SWAP From ERC20 To ETH or Native Token')
            setTransacting(true)

            try{
              transactionReciept = await oxSwapERC20ToEthTransaction(wrappedSigner, compiledTxdetails,compiledTxdetails.txValue);
              }catch(err){
                  setTransacting(false)
                  if (err.reason){
                  handleError(` transfer failed ${err.reason}`)
                  return;
                  }else{
                  handleError(` transfer failed ${err.message}`)
                  return;
                  }
              }
              setTransacting(false)

            }
            else if
            // /// SWAP ETH TO WETH
              (compiledTxdetails.UsertransactionInput.sendersToken == Utils.EthAddress &&  compiledTxdetails.UsertransactionInput.reciversToken == Utils.WethAddress ){
                console.log('SWAP ETH TO WETH')
                setTransacting(true)

                      try{
                        transactionReciept = await sameTokenTransaction(wrappedSigner, compiledTxdetails,compiledTxdetails.txValue);

                      }catch(err){
                        setTransacting(false)
                        if (err.reason){
                        handleError(` transfer failed ${err.reason}`)
                        return;
                        }else{
                        handleError(` transfer failed ${err.message}`)
                        return;
                        }
                    }
                    setTransacting(false)
              } 
              else{

                  if (compiledTxdetails.UsertransactionInput.sendersToken == compiledTxdetails.UsertransactionInput.reciversToken) {
                      setTransacting(true)
                      try{
                              console.log("both tokens are the same", compiledTxdetails.UsertransactionInput.sendersToken, compiledTxdetails.UsertransactionInput.sendersToken)
                              transactionReciept = await sameTokenTransaction(wrappedSigner, compiledTxdetails,compiledTxdetails.txValue);
                      }catch(err){
                              setTransacting(false)
                              if (err.reason){
                              handleError(` transfer failed ${err.reason}`)
                              return;
                              }else{
                              handleError(` transfer failed ${err.message}`)
                              return;
                              }
                          }
                          setTransacting(false)
                  } else {
                      setTransacting(true)
                      try{
                            console.log("different tokens", compiledTxdetails.UsertransactionInput.sendersToken, compiledTxdetails.UsertransactionInput.sendersToken)
                            transactionReciept = await oxSwapTransaction(wrappedSigner, compiledTxdetails,compiledTxdetails.txValue);
                          }catch(err){
                            setTransacting(false)
                            if (err.reason){
                            handleError(` transfer failed ${err.reason}`)
                            return;
                            }else{
                            handleError(` transfer failed ${err.message}`)
                            return;
                            }
                        }
                        setTransacting(false)
                    }
              }
              setTxReciept(transactionReciept)
            }


}

module.exports = {paymentTypeLogicServer, paymentTypeLogicExecutor}//
