import Utils from'/Utilities/utils';
 import{signUpTransactionRelayer, signUpTransactionSender} from "./FEsignUpTransactionRelayer"


// const signUpEventHandler = async (signer, UsertransactionInput, handleSuccess,handleError, setSystemProcessing) => {
    // const signUpEventHandler = async (signer, UsertransactionInput, handleSuccess,handleError, setSystemProcessing, openModal) => {
        const signUpEventHandler = async (wrappedProvider, UsertransactionInput, handleSuccess,handleError,setTransactionPopulated, setTxDetails  ) => {
    // setSystemProcessing(true)
    let txReciept;
    try{
 
        // const txReciept = await signUpTransactionRelayer(signer, UsertransactionInput,0 )
        txReciept = await signUpTransactionRelayer(wrappedProvider, UsertransactionInput,0 )
         
        } catch(err){
        //   setTransacting(false)
            // setSystemProcessing(false)
            if (err.reason){
            //alert("approval failed. from metamask")
            handleError(` signUp failed ${err.reason}`)
            return;
            }else{
            //alert("approval failed. from rpc")
                handleError(` signUp failed ${err.message}`)
            return;
            }
        }
        // setSystemProcessing(false)
        // handleSuccess(`Welcome, Thank you for joining Map3`)
        setTxDetails(txReciept)
        setTransactionPopulated(true);


}

//    const signUpEventExecutor = async (signer, UsertransactionInput, handleSuccess,handleError, setSystemProcessing) => {
    // const signUpEventExecutor = async (signer, UsertransactionInput, handleSuccess,handleError, setSystemProcessing, openModal) => {
    const signUpEventExecutor = async (wrappedSigner, compiledTxdetails, handleSuccess,handleError, setTransacting, setTransactionPopulated, setTxDetails, setTxReciept) => {
        let txReciept;
        setTransacting(true)
    try{
        
 
        // const txReciept = await signUpTransactionRelayer(signer, UsertransactionInput,0 )
        txReciept = await signUpTransactionSender(wrappedSigner, compiledTxdetails,0 )
        await txReciept.wait()

        } catch(err){
        //   setTransacting(false)
        setTransacting(false)
            if (err.reason){
            //alert("approval failed. from metamask")
            handleError(` signUp failed ${err.reason}`)
            return;
            }else{
            //alert("approval failed. from rpc")
                handleError(` signUp failed ${err.message}`)
            return;
            }
        }
        setTransacting(false)
        setTxReciept(txReciept)

}

const ValidateUserSignUpInput = async (UsertransactionInput, setValidationResponce,setvalidatingInput) => {

    console.log("UsertransactionInput values...", UsertransactionInput)
    setvalidatingInput(true)
    console.log(UsertransactionInput,"what we are validating ")
        //VALIDATE SENDER ADDRESS INPUT
        try{
            await Utils.getUserNativeBalanceInWei(UsertransactionInput.userWallet)

        }catch(e){
            setvalidatingInput(false);
            setValidationResponce("invalid user Wallet")
            return false;
        }
        console.log("validation passed for sender");

         //VALIDATE USER Name Input
       if (!UsertransactionInput.userName){
        setvalidatingInput(false);
        setValidationResponce("Please enter Username")
        return false;
       }else{
        console.log("validation passed for sender");
       }

        //VALIDATE currency ADDRESS INPUT
        try{
            await Utils.getUserNativeBalanceInWei(UsertransactionInput.userCurrency)

        }catch(e){
            setvalidatingInput(false);
            setValidationResponce("invalid currency address")
            return false;
        }
        console.log("validation passed for currency");

        setValidationResponce('Processing..')
        setvalidatingInput(false)

        return true;


}


module.exports = {signUpEventHandler,signUpEventExecutor, ValidateUserSignUpInput }//
