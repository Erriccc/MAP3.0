import Utils from'/Utilities/utils';
import{oxSwapEventHandler, sameTokenEventHandler, oxSwapERC20ToEth} from '/Utilities/FrontEndUtilities/FEpayEventHandler';

const paymentTypeLogicServer = async (_provider, UsertransactionInput, account, handleSuccess,handleError, setSystemProcessing , setTransacting) => {

    const wrappedProvider = new Utils.ethers.providers.Web3Provider(_provider);
    const wrappedSigner = wrappedProvider.getSigner();



/////// SWAP From ERC20 To ETH or Native Token
if(UsertransactionInput.reciversToken == Utils.EthAddress && UsertransactionInput.sendersToken !== Utils.EthAddress){
    try{
      await oxSwapERC20ToEth(wrappedSigner, UsertransactionInput, account, handleSuccess,handleError, setSystemProcessing,setTransacting);

    }catch(e){

    }

  }else if

  // /// SWAP ETH TO WETH
    (UsertransactionInput.sendersToken == Utils.EthAddress &&  UsertransactionInput.reciversToken == Utils.WethAddress ){

            try{
              await sameTokenEventHandler(wrappedSigner, UsertransactionInput, account, handleSuccess,handleError, setSystemProcessing, setTransacting, true);

            }catch(e){

            }

    } else{


      // listenForMap3Events();
          if (UsertransactionInput.sendersToken == UsertransactionInput.reciversToken) {
              try{
                    console.log("both tokens are the same", UsertransactionInput.sendersToken, UsertransactionInput.sendersToken)
                    await sameTokenEventHandler(wrappedSigner, UsertransactionInput, account, handleSuccess,handleError, setSystemProcessing, setTransacting,false);

              }catch(e){

              }
          } else {
            try{
                  console.log("different tokens", UsertransactionInput.sendersToken, UsertransactionInput.sendersToken)
                  await oxSwapEventHandler(wrappedSigner, UsertransactionInput, account, handleSuccess,handleError, setSystemProcessing,setTransacting );
                }catch(e){

                }
          }
    }






}

module.exports = {paymentTypeLogicServer}//
