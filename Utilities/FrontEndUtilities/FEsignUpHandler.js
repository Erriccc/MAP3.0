import Utils from'/Utilities/utils';
 import{signUpTransactionRelayer} from "./FEsignUpTransactionRelayer"


// const signUpEventHandler = async (signer, UsertransactionInput, handleSuccess,handleError, setSystemProcessing) => {
    const signUpEventHandler = async (signer, UsertransactionInput, handleSuccess,handleError, setSystemProcessing, openModal) => {
    setSystemProcessing(true)
    try{
 
        const txReciept = await signUpTransactionRelayer(signer, UsertransactionInput,0 )
             await txReciept.wait()
        //alert("approval succesful")
        txReciept &&  openModal('SIGN_UP_CONFIRMATION')
        txReciept &&  console.log('txReciept for sign up transaction...', txReciept)
        // handleSuccess(`Success!`)

        } catch(err){
        //   setTransacting(false)
            setSystemProcessing(false)
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
        setSystemProcessing(false)
        handleSuccess(`Welcome, Thank you for joining Map3`)


}



const ValidateUserSignUpInput = async (UsertransactionInput, handleError,setvalidatingInput) => {

    console.log("UsertransactionInput values...", UsertransactionInput)
    setvalidatingInput(true)
    console.log(UsertransactionInput,"what we are validating ")
        //VALIDATE SENDER ADDRESS INPUT
        try{
            await Utils.getUserNativeBalanceInWei(UsertransactionInput.userWallet)

        }catch(e){
            setvalidatingInput(false);
            handleError("invalid user Wallet")
            return false;
        }
        console.log("validation passed for sender");

        //VALIDATE currency ADDRESS INPUT
        try{
            await Utils.getUserNativeBalanceInWei(UsertransactionInput.userCurrency)

        }catch(e){
            setvalidatingInput(false);
            handleError("invalid currency address")
            return false;
        }
        console.log("validation passed for currency");


        setvalidatingInput(false)

        return true;


}


module.exports = {signUpEventHandler,ValidateUserSignUpInput }//
