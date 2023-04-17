
import Utils from'/Utilities/utils'; 
const {oxQuoteFetcher} = require('/Utilities/FrontEndUtilities/FEoxPriceFetcher');

const PaymentInputValidator = async (UsertransactionInput, setValidationResponce,setvalidatingInput ) => {

    console.log("UsertransactionInput values...", UsertransactionInput)
    setvalidatingInput(true)
        //VALIDATE SENDER ADDRESS INPUT
        try{
            await Utils.getUserNativeBalanceInWei(UsertransactionInput.sender)

        }catch(e){
            setvalidatingInput(false);
            setValidationResponce("Please Sign in")
            return false;
        }
        console.log("validation passed for sender");

        //VALIDATE Reciver ADDRESS INPUT
        try{
            await Utils.getUserNativeBalanceInWei(UsertransactionInput.reciver)

        }catch(e){
            setvalidatingInput(false);
            setValidationResponce("press  + to add a reciver")
            return false;
        }
        console.log("validation passed for reciver");

        //VALIDATE sendersToken ADDRESS INPUT
        try{
            await Utils.getUserNativeBalanceInWei(UsertransactionInput.sendersToken)
        }catch(e){
            setvalidatingInput(false);
            setValidationResponce("invalid sendersToken address")
            return false;
        }
        console.log("validation passed for sendersToken");

        //VALIDATE reciversToken ADDRESS INPUT
        try{
            await Utils.getUserNativeBalanceInWei(UsertransactionInput.reciversToken)

        }catch(e){
            setvalidatingInput(false);
            setValidationResponce("invalid reciversToken address or ammount")
            return false;
        }
        console.log("validation passed for reciversToken");


        //VALIDATE sending amount is not more than users balance
        try{
            let quotedAmmountToSell;
            let aprovalAmount;
            let sendersBalance;
            if(UsertransactionInput.amountToBeSent <= 0 ){
                setvalidatingInput(false);
                setValidationResponce("amount must be greater than 0")
                return false;
            }
            // require users balance is valid for pure ETH transactions
            if(UsertransactionInput.reciversToken == Utils.EthAddress && UsertransactionInput.sendersToken == Utils.EthAddress ){

                let usersEthBalance = await Utils.getUserNativeBalance(UsertransactionInput.sender)

                    if(UsertransactionInput.amountToBeSent > usersEthBalance){

                    setvalidatingInput(false);
                    setValidationResponce("insufficient Native balance")
                    return false;
                }
                console.log("validation passed for Native balance");
            }

            // require users balance is valid for ERC20/ETH transactions
           else { 
                    let sendersToken = UsertransactionInput.sendersToken;
                    let reciversToken = UsertransactionInput.reciversToken;
                    // converting eth address to weth to get quotes
                    if(UsertransactionInput.reciversToken == Utils.EthAddress || UsertransactionInput.sendersToken == Utils.EthAddress ){
                        if(UsertransactionInput.sendersToken ==Utils.EthAddress){
                            console.log("sendersEthTpken Dectected validating sufficient balance in eth before making 0x api call")
                            let usersEthBalance = await Utils.getUserNativeBalance(UsertransactionInput.sender)
                            if(UsertransactionInput.amountToBeSent > usersEthBalance){
                                setvalidatingInput(false);
                                setValidationResponce("insufficient Native balance")
                                return false;
                            }
                            console.log("passed validation for sufficient eth balance")
                            sendersToken = Utils.WethAddress;
                        }else{
                            console.log("reciversEthToken Dectected")

                            reciversToken = Utils.WethAddress;
                        }
                    }
                    
                    // Conditions where senders address and recivers addressare the same
                    // note each of them could originally be 
                    if(sendersToken == reciversToken ){
                        console.log("detected same tokens, will skip 0x api call")
                        // sendersBalance = parseInt(await Utils.getUserErc20Balance(UsertransactionInput.sendersToken,UsertransactionInput.sender), 10).toString()
                        if(UsertransactionInput.sendersToken ==Utils.EthAddress ){
                        console.log("users token is eth")

                        // alert(aprovalAmount)
                    // WholeTOWeiDecimals
                        // aprovalAmount= Utils.ethers.utils.parseEther(UsertransactionInput.amountToBeSent)
                        aprovalAmount = parseInt(UsertransactionInput.amountToBeSent,18).toString();

                        console.log("aprovalAmount.. from validator..1", aprovalAmount)
                        sendersBalance = await Utils.getUserNativeBalanceInWei(UsertransactionInput.sender)
                        console.log("sendersBalance.. from validator..1", sendersBalance)

                        }else{
                        // aprovalAmount = parseInt(UsertransactionInput.amountToBeSent, await Utils.getTokenDecimal(sendersToken)).toString();
                        // aprovalAmount = parseInt(UsertransactionInput.amountToBeSent, await Utils.getTokenDecimal(sendersToken)).toString();
                        console.log("users token is weth")

                        aprovalAmount= await Utils.WholeTOWeiDecimals( sendersToken,UsertransactionInput.amountToBeSent)
                        console.log("aprovalAmount.. from validator..2", aprovalAmount)

                        sendersBalance = await Utils.getUserErc20BalanceInWei(sendersToken,UsertransactionInput.sender)
                        console.log("sendersBalance.. from validator..2", sendersBalance)

                        // sendersBalance = parseInt(await Utils.getUserErc20Balance(UsertransactionInput.sendersToken,UsertransactionInput.sender), 10).toString()
                        }
                        console.log("sendersBalance == aprovalAmount", sendersBalance, aprovalAmount)
                    }else{
                        console.log("attempting 0x call")
                        quotedAmmountToSell = await oxQuoteFetcher(
                            sendersToken,
                            reciversToken,
                            UsertransactionInput.amountToBeSent,
                            setValidationResponce
                            )
                        aprovalAmount = (quotedAmmountToSell *UsertransactionInput.slippage) // change multiplier to come from slippage
                        console.log("recived approval amount", aprovalAmount)
                        sendersBalance = await Utils.getUserErc20BalanceInWei(sendersToken,UsertransactionInput.sender)
                        console.log("aprovalAmount !== sendersBalance ", aprovalAmount,sendersBalance)
                        console.log("quotedAmmountToSell *UsertransactionInput.slippage.", quotedAmmountToSell *UsertransactionInput.slippage)
                    }

                    //SPECIAL CONDITION: where sending token was initially Native
                    if(UsertransactionInput.sendersToken ==Utils.EthAddress){
                        sendersBalance = await Utils.getUserNativeBalanceInWei(UsertransactionInput.sender)
                        console.log("sendersBalance from user spending eth situation.. remember to conver to weigh numbers..", sendersBalance)
                    }


                    console.log("sendersBalance AND aprovalAmount final Values 1", sendersBalance, aprovalAmount)

                        if(aprovalAmount > sendersBalance ){
                        console.log("sendersBalance AND aprovalAmount final Values tx will fail", sendersBalance, aprovalAmount)
                        setvalidatingInput(false);
                        setValidationResponce("insufficient balance, try adjusting the transaction slippage ")
                            return false;
                        }
                        else{
                            console.log("validation passed for amount to send");
                        }
            }
            
        } catch(e){
            setvalidatingInput(false);
            setValidationResponce("error converting and validating amount");
            return false;
        }



        //Require no ERC20 to Native Token Conversions
        // if ( UsertransactionInput.reciversToken == Utils.EthAddress && UsertransactionInput.sendersToken !== Utils.EthAddress){
        //     setvalidatingInput(false);
        //     setValidationResponce("ERC20 to Native transactions are not available atm, Try Native to ERC20, ERC20 to ERC20, or Native to Native");
        //     return false;
        // }else{
        //     console.log("validation no ERC20 to Native Token Conversions");
        // }
    setValidationResponce("Processing..")
    setvalidatingInput(false)


        return true;
}

module.exports = {PaymentInputValidator}

//  let UsertransactionInput = {
//   sender: account,
//   reciver: reciver,
//   sendersToken: sendersToken,
//   reciversToken: reciversToken,
//   amountToBeSent: amountToBeSent,
//   slippage: userSlippage
// }//