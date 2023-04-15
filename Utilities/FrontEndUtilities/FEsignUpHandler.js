import Utils from'/Utilities/utils';
 import{signUpTransactionRelayer, signUpTransactionSender} from "./FEsignUpTransactionRelayer"


// const signUpEventHandler = async (signer, UsertransactionInput, toast, setSystemProcessing) => {
    // const signUpEventHandler = async (signer, UsertransactionInput, toast, setSystemProcessing, openModal) => {
        const signUpEventHandler = async (wrappedProvider, UsertransactionInput, toast,setTransactionPopulated, setTxDetails  ) => {
    // setSystemProcessing(true)
    let txReciept;
    try{
 
        txReciept = await signUpTransactionRelayer(wrappedProvider, UsertransactionInput,0 )
        } catch(err){
        //   setTransacting(false)
            // setSystemProcessing(false)
            if (err.reason){
            //alert("approval failed. from metamask")
            toast.error(` signUp failed ${err.reason}`)
            return;
            }else{
            //alert("approval failed. from rpc")
                toast.error(` signUp failed ${err}`)
            return;
            }
        }
        // setSystemProcessing(false)
        // toast.success(`Welcome, Thank you for joining Map3`)
        setTxDetails(txReciept)
        setTransactionPopulated(true);


}

//    const signUpEventExecutor = async (signer, UsertransactionInput, toast, setSystemProcessing) => {
    // const signUpEventExecutor = async (signer, UsertransactionInput, toast, setSystemProcessing, openModal) => {
    const signUpEventExecutor = async (wrappedSigner, compiledTxdetails,UsertransactionInput,toast, setTransacting, setTxReciept, setCurrentUser) => {
        let txReciept;
        let updatedDbUser;
        setTransacting(true)
    try{
        
        const returnedVendorProfileObject= await signUpTransactionSender(wrappedSigner, compiledTxdetails,0,UsertransactionInput)
        
        console.log(returnedVendorProfileObject,'returnedVendorProfileObject')
        txReciept = returnedVendorProfileObject.tx2
       
        updatedDbUser = returnedVendorProfileObject.dbUser
        } catch(err){
        //   setTransacting(false)
        setTransacting(false)
            if (err.reason){
            //alert("approval failed. from metamask")
            toast.error(` signUp failed ${err.reason}`)
            return;
            }else{
            //alert("approval failed. from rpc")
            toast.error(` signUp failed ${err}`)
            }
        }
        setTransacting(false)
        setCurrentUser(updatedDbUser)
        setTxReciept(txReciept)
}

const ValidateUserSignUpInput = async (UsertransactionInput, setValidationResponce,setvalidatingInput) => {

    console.log("UsertransactionInput values...", UsertransactionInput)
    setvalidatingInput(true)
    console.log(UsertransactionInput,"what we are validating ")
        //VALIDATE SENDER ADDRESS INPUT
        try{
            await Utils.getUserNativeBalanceInWei(UsertransactionInput.vendorsWalletAddress)

        }catch(e){
            setvalidatingInput(false);
            setValidationResponce("invalid user Wallet")
            return false;
        }
        console.log("validation passed for sender");

         //VALIDATE USER Name Input
       if (!UsertransactionInput.vendorsName){
        setvalidatingInput(false);
        setValidationResponce("Please enter Username")
        return false;
       }else{
        console.log("validation passed for sender");
       }

        //VALIDATE currency ADDRESS INPUT
        try{
            await Utils.getUserNativeBalanceInWei(UsertransactionInput.vendorsToken)

        }catch(e){
            setvalidatingInput(false);
            setValidationResponce("invalid currency address")
            return false;
        }
        console.log("validation passed for currency");

        if (
                UsertransactionInput.vendorsLat == null 
                || UsertransactionInput.vendorsLong == null
        ){
            setvalidatingInput(false);
            setValidationResponce("invalid street address")
            return false;
        }
        console.log("validation passed for street address");

        setValidationResponce('Processing..')
        setvalidatingInput(false)

        return true;


}


module.exports = {signUpEventHandler,signUpEventExecutor, ValidateUserSignUpInput }//
