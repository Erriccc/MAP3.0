import React, { useState, useEffect, useContext } from 'react';
import { useNotification } from "web3uikit";
const {oxPriceFetcher} = require('/Utilities/FrontEndUtilities/FEoxPriceFetcher');
import Utils from'/Utilities/utils';
import{PaymentInputValidator} from '/Utilities/FrontEndUtilities/FEpaymentUserInputValidator'
import{paymentTypeLogicServer, paymentTypeLogicExecutor} from '/Utilities/FrontEndUtilities/FEpaymentTypeLogicServer';
import { useMoralis, } from 'react-moralis';
import { useRouter } from "next/dist/client/router"; // use to reroute after transaction is processed
import { WalletContext } from 'lib/hooks/use-connect';
import TransactionRecieptModal from '/components/nft/TransactionRecieptModal.jsx'

import Spinner from '/components/spinner';
import cn from 'classnames';
import { NextSeo } from 'next-seo';
import PayAnonymousLayout from 'layouts/PayAnonymousLayout';
import Slider from 'rc-slider';
import Button from '/components/ui/button';
import TransactionInfo from '/components/ui/transaction-info';
import { SwapIcon } from '/components/icons/swap-icon';
import Collapse from '/components/ui/collapse';

import  ProfileModalInput from  '/components/ui/ProfileModalInput';
import  ProcessingView from  '/components/ui/ProcessingView';
import  ReciversCoinInput from  '/components/reciversCoinInput';
import  SendersCoinInput from  '/components/sendersCoinInput';



export default function PayAnonymous() {
    const { Moralis, account } = useMoralis();
    const { address} = useContext(WalletContext);

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
        position: "bottomR",
      });
    };
// add input for expected slippage amount to complete swap!
    const submitPayment = async (UsertransactionInput) => {
    await paymentTypeLogicServer
    (Moralis.connector.provider, UsertransactionInput,handleSuccess,handleError,setTransactionPopulated, setTxDetails)
    };
    const sendPayment = async (txDetails) => {
      // (_provider, UsertransactionInput, handleSuccess,handleError, setSystemProcessing ,setTransactionPopulated, setTxDetails)
    await paymentTypeLogicExecutor(txDetails,setTransacting,Moralis.connector.provider,handleSuccess,handleError, setTransactionPopulated, setTxDetails, setTxReciept)
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
    let [validatingInput, setvalidatingInput] = useState(false);
    let [validationResponce, setValidationResponce] = useState('Send');
    let [txReciept, setTxReciept] = useState();
    
    let [transacting, setTransacting] = useState(false);
    let [transactionPopulated, setTransactionPopulated] = useState(false);
    let [txDetails, setTxDetails] = useState();
    
 

    /// USER EXPIRIENCE TOOLS
    useEffect(()=>{
      let isMounted = true;

        const fetchPrice = async () => {
          // this function comes from the utililty folder
          setTransactionPopulated(false)
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
        let UsertransactionInput = {
          sender: account,
          reciver: reciver,
          sendersToken: sendersToken,
          reciversToken: reciversToken,
          amountToBeSent: amountToBeSent,
          slippage: userSlippage
      };
      (async function() {
        // if(await PaymentInputValidator(UsertransactionInput,handleError,setvalidatingInput)){
        if(await PaymentInputValidator(UsertransactionInput,setValidationResponce, setvalidatingInput)){
          // if(true){
        console.log("All validation passed........... processing transaction")
        submitPayment(UsertransactionInput);


        }
        else{
          console.log("validation is false")
        }
      })();
        loadUsersBalances()
        document.documentElement.style.removeProperty('overflow');
        return () => { isMounted = false };
      }, [sendersToken, reciversToken,amountToBeSent, userSlippage, quote, account, address, reciver]);


      return (<>
        <NextSeo title="map3 pay" description="Map3 - find crypto friendly businesses near you, and make crypto payments in your preferred currency."/>
        <PayAnonymousLayout>
          <div className="mb-5 border-b border-dashed border-gray-200 pb-5 dark:border-gray-800 xs:mb-7 xs:pb-6">
                <ProfileModalInput label={`Receiver: ${reciver}`}
                getCoinValue={(value) => {
                console.log('Receiver value:', value)
                setReciver(value)
                }}
                />
                  
            <div className={cn('relative flex gap-3', toggleCoin ? 'flex-col-reverse' : 'flex-col')}>
              <ReciversCoinInput label={'Receivers Token'}
              getCoinValue={(data) => {
                console.log('Receivers coin value:', data)
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
          {!transactionPopulated &&(<Button size="large" shape="rounded" fullWidth={true} disabled className="mt-6 uppercase xs:mt-8 xs:tracking-widest"
           >
            {validatingInput || validationResponce === 'Processing..'? 
            (<div>
            
             <svg role="status" className="inline w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-white fill-gray-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                        </svg>
            Validating...
            </div>):(
               <div>{validationResponce}</div>
            )
            }
          </Button>)}
          {txDetails && transactionPopulated &&(<Button size="large" shape="rounded" fullWidth={true} className="mt-6 uppercase xs:mt-8 xs:tracking-widest"
           onClick={
            () => {
              (async function() {
                sendPayment(txDetails && txDetails);
              })();
          }}
           >
            {txDetails?.approveTx? (<span>APPROVE</span>):(<span>SEND</span>)}
            {/* {!txDetails?.approveTx && (<span>SEND</span>)} */}
          </Button>)}
        {/* {validatingInput && (<ProcessingView status={"validating Input..."} arrayToDisplay={Utils.TypoEffectTexts.Validating}/>)} */}
        {/* {systemProcessing && (<ProcessingView status={"System Processing... "} arrayToDisplay={Utils.TypoEffectTexts.Processing}/>)} */}
        {txReciept && (<TransactionRecieptModal  txReciept={txReciept} setTxReciept={setTxReciept} confirmationTitle = "Payment was successful"/>)}
        {transacting && (<ProcessingView status={"Transacting..."} arrayToDisplay={Utils.TypoEffectTexts.Transacting}/>)}


        </PayAnonymousLayout>
      </>);

          }
          