import React, { useState, useEffect } from 'react';
import { useNotification } from "web3uikit";
const {oxPriceFetcher} = require('/Utilities/FrontEndUtilities/FEoxPriceFetcher');
import Utils from'/Utilities/utils';
import{PaymentInputValidator} from '/Utilities/FrontEndUtilities/FEpaymentUserInputValidator'
import{oxSwapEventHandler, sameTokenEventHandler, oxSwapERC20ToEth} from '/Utilities/FrontEndUtilities/FEpayEventHandler';
import { useMoralis, } from 'react-moralis';
import { useRouter } from "next/dist/client/router"; // use to reroute after transaction is processed
// import dynamic from 'next/dynamic';
import Spinner from '/components/spinner';
import cn from 'classnames';
import { NextSeo } from 'next-seo';
import PayAnonymousLayout from 'layouts/PayAnonymousLayout';
import Slider from 'rc-slider';
import Button from '/components/ui/button';
import TransactionInfo from '/components/ui/transaction-info';
import { SwapIcon } from '/components/icons/swap-icon';
import Collapse from '/components/ui/collapse';
import LoadingView from '/components/ui/LoadingView';

import ProfileModalInput from  '/components/ui/ProfileModalInput';
import ProcessingView from  '/components/ui/ProcessingView';
import ReciversCoinInput from  '/components/reciversCoinInput';
import SendersCoinInput from  '/components/sendersCoinInput';


export default function PayAnonymous() {
    const { Moralis, account } = useMoralis();

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
    const handleNoAccount= () => {
      dispatch({
        type: "error",
        message: `You need to connect your wallet to book a rental`,
        title: "Not Connected",
        position: "topR",
      });
    };
// add input for expected slippage amount to complete swap!
    const submitPayment = async (UsertransactionInput) => {

/////// SWAP From ERC20 To ETH or Native Token
  if(UsertransactionInput.reciversToken == Utils.EthAddress && UsertransactionInput.sendersToken !== Utils.EthAddress){
    try{
      await oxSwapERC20ToEth(UsertransactionInput, account, handleSuccess,handleError, setSystemProcessing,setTransacting);

    }catch(e){

    }

  }else if

  // /// SWAP ETH TO WETH
    (UsertransactionInput.sendersToken == Utils.EthAddress &&  UsertransactionInput.reciversToken == Utils.WethAddress ){

            try{
              await sameTokenEventHandler(UsertransactionInput, account, handleSuccess,handleError, setSystemProcessing, setTransacting, true);

            }catch(e){

            }

    } else{


      // listenForMap3Events();
          if (UsertransactionInput.sendersToken == UsertransactionInput.reciversToken) {
              try{
                    console.log("both tokens are the same", UsertransactionInput.sendersToken, UsertransactionInput.sendersToken)
                    await sameTokenEventHandler(UsertransactionInput, account, handleSuccess,handleError, setSystemProcessing, setTransacting,false);

              }catch(e){

              }
          } else {
            try{
                  console.log("different tokens", UsertransactionInput.sendersToken, UsertransactionInput.sendersToken)
                  await oxSwapEventHandler(UsertransactionInput, account, handleSuccess,handleError, setSystemProcessing,setTransacting );
                }catch(e){

                }
          }
    }

    };


    
    const [sendersTokenBalance, setSendersTokenBalance] = React.useState("0");
    const [rate, setRate] = React.useState(1); // Echange rate .. gotten from 0x api
    const [quote, setQuote] = React.useState("select tokens"); //  Quote is the current rate multiplied by the amount of cryptocurrency to be bouth
    const [totalQuoteWithSlippage, setTotalQuoteWithSlippage] = React.useState("select tokens"); //  estimate that includes slippage
    const [sendersToken, setSendersToken] = React.useState(Utils.EthAddress);
    const [reciversToken, setReciversToken] = React.useState(Utils.EthAddress); 
    const [amountToBeSent, setamountToBeSent] = React.useState(0.01);
    let [toggleCoin, setToggleCoin] = useState(false);
    let [reciver, setReciver] = useState("");
    let [tempSlippage, setTempSlippage] = useState(Utils.slippage);
    let [userSlippage, setUserSlippage] = useState(Utils.slippage);
    let [systemProcessing, setSystemProcessing] = useState(false);
    let [validatingInput, setvalidatingInput] = useState(false);
    let [transacting, setTransacting] = useState(false);
    


    /// USER EXPIRIENCE TOOLS
    useEffect(()=>{
        const fetchPrice = async () => {
            // this function comes from the utililty folder
       try{ 
        let quotePrice = await oxPriceFetcher(
            sendersToken,
            reciversToken,
            amountToBeSent,
            handleError)
            if (isNaN(quotePrice) ){
              setRate(quotePrice)
              setQuote(quotePrice)
              setTotalQuoteWithSlippage(quotePrice)
            }else{
              setRate(quotePrice)
              setQuote(quotePrice*amountToBeSent)
              setTotalQuoteWithSlippage(quote*userSlippage)
            }
            
        }catch(e){
          setQuote("quote Failed")

        }
}
        const loadUsersBalances = async () => {
            try{
            if(sendersToken == Utils.EthAddress){
              setSendersTokenBalance(await Utils.getUserNativeBalance(account))
            }else{
              setSendersTokenBalance(await Utils.getUserErc20Balance(sendersToken,account))
            }
          } catch(e){
            return
          }

        }

        fetchPrice()
        loadUsersBalances()
      }, [sendersToken, reciversToken,amountToBeSent, userSlippage, quote]);


      return (<>
        <NextSeo title="Swap" description="Map3 - React Next Web3 NFT Crypto Dashboard Template"/>
        <PayAnonymousLayout>
          <div className="mb-5 border-b border-dashed border-gray-200 pb-5 dark:border-gray-800 xs:mb-7 xs:pb-6">
                <ProfileModalInput label={`Reciver: ${reciver}`}
                getCoinValue={(value) => {
                console.log('Reciver value:', value)
                setReciver(value)
                }}
                />
                  
            <div className={cn('relative flex gap-3', toggleCoin ? 'flex-col-reverse' : 'flex-col')}>
              <ReciversCoinInput label={'Recivers Token'}
              getCoinValue={(data) => {
                console.log('Recivers coin value:', data)
                setReciversToken(data.address)
                setamountToBeSent(data.value)
            
            }}
              />
              <div className="absolute top-1/2 left-1/2 z-[1] -mt-4 -ml-4 rounded-full bg-white shadow-large dark:bg-gray-600">
                <Button size="mini" color="gray" shape="circle" variant="transparent" onClick={() => setToggleCoin(!toggleCoin)}>
                  <SwapIcon className="h-auto w-3"/>
                </Button>
              </div>
              <SendersCoinInput label={'Senders Token'} currencybalance={sendersTokenBalance} exchangeRate={quote}
                getCoinValue={(data) => {
                console.log('senders coin value:', data)
                setSendersToken(data.address)
                }}
                />
            </div>
          </div>
          <div className="flex flex-col gap-4 xs:gap-[18px]">
          <Collapse label={`Transaction Details`}>
          <div className="flex flex-col gap-4 xs:gap-[18px] p-3 ">
                    <TransactionInfo label={'conversion rate'} value ={rate}/>
                    <TransactionInfo label={`estimate Price:`} value={quote}/>
                    <TransactionInfo label={`Price + slippage:`} value={totalQuoteWithSlippage}/>
                    <TransactionInfo label={'Price Slippage'} value={`${tempSlippage}%`}/> 
                    <div className="p-1">
                    <Slider  min={0} max={100} value={tempSlippage} handleStyle={{padding:"8px", color: "red"}}  onChange={(value) => {
                      let realValue = 1+(value/100)
                      setTempSlippage(value)
                      setUserSlippage(realValue)
                      }}/>
                    </div>
                    </div>
            </Collapse>
          </div>
          <Button size="large" shape="rounded" fullWidth={true} className="mt-6 uppercase xs:mt-8 xs:tracking-widest"
           onClick={
            () => {

                let UsertransactionInput = {
                    sender: account,
                    reciver: reciver,
                    sendersToken: sendersToken,
                    reciversToken: reciversToken,
                    amountToBeSent: amountToBeSent,
                    slippage: userSlippage
                };
                (async function() {
                  if(await PaymentInputValidator(UsertransactionInput,handleError,setvalidatingInput)){
                    // if(true){
                  console.log("All validation passed........... processing transaction")
                  submitPayment(UsertransactionInput);


                  }
                  else{
                    console.log("validation is false")
                  }
                })();
            }}
           >
            SEND
          </Button>
        {validatingInput && (<ProcessingView status={"validating Input..."} arrayToDisplay={Utils.TypoEffectTexts.Validating}/>)}
        {systemProcessing && (<ProcessingView status={"System Processing... "} arrayToDisplay={Utils.TypoEffectTexts.Processing}/>)}
        {transacting && (<ProcessingView status={"Transacting..."} arrayToDisplay={Utils.TypoEffectTexts.Transacting}/>)}


        </PayAnonymousLayout>
      </>);

          }
