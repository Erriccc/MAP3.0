import React, { useState, useEffect } from 'react';
import { useNotification } from "web3uikit";
const {oxPriceFetcher} = require('/Utilities/FrontEndUtilities/FEoxPriceFetcher');
import Utils from'/Utilities/utils';
import{PaymentInputValidator} from '/Utilities/FrontEndUtilities/FEpaymentUserInputValidator'
import{oxSwapEventHandler, sameTokenEventHandler, oxSwapERC20ToEth} from '/Utilities/FrontEndUtilities/FEpayEventHandler';
import { useMoralis, } from 'react-moralis';
import { useRouter } from "next/dist/client/router"; // use to reroute after transaction is processed
import dynamic from 'next/dynamic';
import Spinner from '/components/spinner';
import cn from 'classnames';
import InputLabel from '/components/ui/input-label';

import { useStepperContext } from "/Utilities/FrontEndUtilities/FEStepperContext";
const SendersCoinInput = dynamic(() => import('/components/SendersCoinInput'));


export default function Currency() {
  const { userData, setUserData } = useStepperContext();
  const [ethTokenAddress, setEthTokenAddress ] = useState(Utils.EthAddress);
  const [isValidCurrency, setIsValidCurrency ] = useState(false);
  const [sendersToken, setSendersToken] = React.useState(); // token address for user signing up
  const [senderstokenCode, setSenderstokenCode] = React.useState("ETH"); // token address for user signing up
  let [validatingCurrency, setValidatingCurrency] = useState(true)

  
  const [amountToBeSent, setamountToBeSent] = React.useState(0.01);
  const [quote, setQuote] = React.useState("select token"); //  Quote is the current rate multiplied by the amount of cryptocurrency to be bouth

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const dispatch = useNotification();
  const handleSuccess= (msg) => {
     dispatch({
       type: "success",
       message: msg,
       title: "Done",
       position: "bottomR",
     });
   };
 const handleError= (msg) => {
   dispatch({
     type: "error",
     message: `${msg}`,
     title: "failed",
     position: "bottomR",
   });
 };
 const handleCurrencyWarning= (msg) => {
    dispatch({
      type: "warning",
      message: `${msg}`,
      title: "failed",
      position: "bottomR",
    });
  };
    /// USER EXPIRIENCE TOOLS
    useEffect(()=>{
        const fetchPrice = async () => {
            // this function comes from the utililty folder
       try{ 
        let quotePrice = await oxPriceFetcher(
            sendersToken,
            ethTokenAddress,
            amountToBeSent,
            handleError)
            if (isNaN(quotePrice) ){
                console.log(quotePrice, 'quotePrice is NAN')
                handleCurrencyWarning("insufficient liquidity for this asset, pick other asset to enable cross currency transactions")
                setQuote(quotePrice)
                setIsValidCurrency(false)

            }else{
                    setIsValidCurrency(true)
                    handleSuccess("Valid Currency")
              setQuote("Valid Currency")
              setUserData({ ...userData, ["userCurrency"]: sendersToken, ["currencySymbol"]: senderstokenCode});
            //   setUserData({ ...userData, ["currencySymbol"]: senderstokenCode });

              
            }
            
        }catch(e){
            handleError("error validating this currency")
            setIsValidCurrency(false)
            setQuote("quote Failed")

        }
}
    if(sendersToken && validatingCurrency == true ){
        setValidatingCurrency(false)
        fetchPrice()
    }

      }, [validatingCurrency, sendersToken, senderstokenCode]);

  return (
    <div className="flex flex-col ">
            <InputLabel title="Currrency" important subTitle="find your currency" />
            <SendersCoinInput label={'Senders Token'}  exchangeRate={quote}
                getCoinValue={(data) => {
                setSendersToken(data.address)
                setSenderstokenCode(data.coin)
                setValidatingCurrency(true)
                }}
            />


      
    </div>
  );
}