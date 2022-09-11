import React, { useState, useEffect, useLayoutEffect, useReducer, useContext } from 'react';

import Link from "next/link";
import { useMoralis} from 'react-moralis'
import Apphero from 'components/Apphero'
import { useNotification} from "web3uikit";
import { useRouter } from "next/dist/client/router";
import { NextSeo } from 'next-seo';
import { useCopyToClipboard } from 'lib/hooks/use-copy-to-clipboard';
import DashboardLayout from 'layouts/_dashboard';
import Button from '/components/ui/button';
import Image from '/components/ui/image';
import { Copy } from '/components/icons/copy';
import { Check } from '/components/icons/check';
import AuthorInformation from '/components/author/author-information';
import { useUrlContext } from "/Utilities/FrontEndUtilities/FEUrlContext";
import { UrlContext } from "/Utilities/FrontEndUtilities/FEUrlContext";
import { useModal } from '/components/modal-views/context';
import{paymentTypeLogicServer} from '/Utilities/FrontEndUtilities/FEpaymentTypeLogicServer';
import { WalletContext } from 'lib/hooks/use-connect';

// {vendorDataState.dataFromServer?.walletAddress}


import vendorsData from "constants/testdata.json"
import LoadingView from '/components/ui/LoadingView';
import {payProfileDataFetcherRelayer} from '/Utilities/FrontEndUtilities/FEpayProfileDataFetcherRelayer'

const {oxPriceFetcher} = require('/Utilities/FrontEndUtilities/FEoxPriceFetcher');
import Utils from'/Utilities/utils';
import{PaymentInputValidator} from '/Utilities/FrontEndUtilities/FEpaymentUserInputValidator'
import{oxSwapEventHandler, sameTokenEventHandler, oxSwapERC20ToEth} from '/Utilities/FrontEndUtilities/FEpayEventHandler';
import cn from 'classnames';

import Collapse from '/components/ui/collapse';
import PayVendorLayout from 'layouts/PayVendorLayout';
import TransactionInfo from '/components/ui/transaction-info';
import Slider from 'rc-slider';
// import dynamic from 'next/dynamic';

import ProcessingView from '/components/ui/ProcessingView';
import VendorReciverCoinInput from '/components/VendorReciverCoinInput';
import SendersCoinInput from '/components/sendersCoinInput';


const PayVendorPage = () => {
  let router = useRouter();
  const {walletAddress} = router.query;
  const { Moralis, account } = useMoralis();
  const { address} = useContext(WalletContext);

  const { currentUrl,setCurrentUrl} = useUrlContext();
  const { openModal } = useModal();
  

    // const address = account;
    let [copyButtonStatus, setCopyButtonStatus] = useState(false);
    let [_, copyToClipboard] = useCopyToClipboard();
    const handleCopyToClipboard = () => {
        copyToClipboard(vendorDataState.dataFromServer?.walletAddress);
        setCopyButtonStatus(true);
        setTimeout(() => {
            setCopyButtonStatus(copyButtonStatus);
        }, 2500);
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
      await paymentTypeLogicServer(Moralis.connector.provider, UsertransactionInput, account, handleSuccess,handleError, setSystemProcessing , setTransacting)

    };



    const [userData, setUserData] = useState({});
    const [addressIsVendor, setAddressIsVendor] = useState(false)
    const [sendersTokenBalance, setSendersTokenBalance] = React.useState("0");
    const [rate, setRate] = React.useState(1); // Echange rate .. gotten from 0x api
    const [quote, setQuote] = React.useState("select tokens"); //  Quote is the current rate multiplied by the amount of cryptocurrency to be bouth
    const [totalQuoteWithSlippage, setTotalQuoteWithSlippage] = React.useState("select tokens"); //  estimate that includes slippage
    const [sendersToken, setSendersToken] = React.useState(Utils.EthAddress);
    const [reciversToken, setReciversToken] = React.useState(); 
    const [reciversTokenInfo, setReciversTokenIfo] = React.useState(); 
    const [amountToBeSent, setamountToBeSent] = React.useState(0.01);
    let [reciver, setReciver] = useState(Utils.EthAddress);
    let [tempSlippage, setTempSlippage] = useState(Utils.slippage);
    let [userSlippage, setUserSlippage] = useState(Utils.slippage);
    let [systemProcessing, setSystemProcessing] = useState(false);
    let [validatingInput, setvalidatingInput] = useState(false);
    let [transacting, setTransacting] = useState(false);


    // let [tempDataInfo, setTempDataInfo] = useState([]);
    const [vendorDataState, dispatchather] = useReducer(reducer,{dataFromServer:{},showDataFromServer: false, loadingInfo: true, FoundInfo: false });
      // const [displayData, setDisplayData] = useState([]);
    
    function reducer(vendorDataState, action){
      
        switch (action.type) {
          case "SHOW":
            return {dataFromServer: userData, showDataFromServer: true, loadingInfo: false, FoundInfo: false}
          case "FOUND":
            return {dataFromServer:userData, showDataFromServer: false, loadingInfo: false, FoundInfo: true}
          case "HIDE":
              return {dataFromServer: {}, showDataFromServer: false, loadingInfo: false, FoundInfo: false}
          default:
            return vendorDataState
    
        }
    }


    useEffect(()  => {
      if(vendorDataState.FoundInfo){
        console.log("testing values...", vendorDataState.dataFromServer)
        console.log('testing value of userData', userData)
        console.log('testing value of reciversTokenInfo', reciversTokenInfo)
        // console.log('tempDataInfo.length', tempDataInfo.length)
        if(setAddressIsVendor){
        console.log('switching to show')
        dispatchather({type:"SHOW"})
           
        }
      }else{
        console.log('skipping SHOW state')
        return
      }
        }, [addressIsVendor, vendorDataState.FoundInfo])















  useEffect(() => {
  let isMounted = true;
  
    // let fetchedUserData = vendorsData; 
    if (walletAddress) {
      setCurrentUrl(`${Utils.Map3WebsiteUrl}${router.asPath}`);


      (async function() {
        const returnData = await payProfileDataFetcherRelayer(walletAddress);
    
        console.log( returnData, 'returnData from client')

        if(returnData.isVendor == false){
          console.log('invalid User, pushing to regular pay page')
          router.push("/pay")
        }else{
          // VendorsCurrencyInfo
          // vendorsDetails
        setReciversTokenIfo(returnData.vendorData.VendorsCurrencyInfo);
        setReciversToken(returnData.vendorData.VendorsCurrencyInfo.address);
        setReciver(walletAddress);
        setUserData(returnData.vendorData.vendorsDetails[0]);
        setAddressIsVendor(true)
        dispatchather({type:"FOUND"})
        console.log('.done dispensing data....')


        }
    
      })();
    
    }
    document.documentElement.style.removeProperty('overflow');
    return () => { isMounted = false };
}, [walletAddress, router, address, account])






    /// USER EXPIRIENCE TOOLS
    useEffect(()=>{
      let isMounted = true;
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
        document.documentElement.style.removeProperty('overflow');

        return () => { isMounted = false };
      }, [sendersToken, reciversToken,amountToBeSent, account, userSlippage, quote, vendorDataState.FoundInfo]);




  // // // UNCOMMENT to AUTHENTICATE!!!!
  // if (!account) {
  //   // if (process.browser){
  //   //   router.push({
  //   //     pathname: "/"
  //   //   });
  //   // }
  //   return (
  //     <Apphero/>
  //   )
  // }
    return (<>
      <NextSeo title="Profile" description="Map3 Profiles - find crypto friendly businesses near you, and make crypto payments in your preferred currency."/>
      {vendorDataState.showDataFromServer && (
      // {walletAddress && userData && (

      <DashboardLayout>
        {/* Profile Cover Image */}
        <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]">
          <Image 
          src={`/api/imagefetcher?url=${encodeURIComponent(
            vendorDataState.dataFromServer?.imgUrl
          )}`}
          layout="fill" objectFit="cover" alt="Cover Image"/>
        </div>

        {/* Profile Container */}
        <div className="mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
          {/* Profile Image */}
          <div className="relative z-5 mx-auto -mt-12 h-24 w-24 shrink-0 overflow-hidden rounded-full border-[5px] border-white shadow-large dark:border-gray-500 sm:-mt-14 sm:h-28 sm:w-28 md:mx-0 md:-mt-16 md:h-32 md:w-32 xl:mx-0 3xl:-mt-20 3xl:h-40 3xl:w-40 3xl:border-8">
            <Image 
            src={`/api/imagefetcher?url=${encodeURIComponent(
              vendorDataState.dataFromServer?.imgUrl
            )}`}
             layout="fill" objectFit="cover" className="rounded-full" alt="Author"/>
          </div>
          {/* Profile Info */}
          <div className="flex w-full flex-col pt-4 md:flex-row md:pt-10 lg:flex-row xl:pt-12">
            <div className="shrink-0 border-dashed border-gray-200 dark:border-gray-700 md:w-72 ltr:md:border-r md:ltr:pr-7 rtl:md:border-l md:rtl:pl-7 lg:ltr:pr-10 lg:rtl:pl-10 xl:ltr:pr-14 xl:rtl:pl-14 2xl:w-80 3xl:w-96 3xl:ltr:pr-16 3xl:rtl:pl-16">
              <div className="text-center ltr:md:text-left rtl:md:text-right">
                {/* Name */}
                <h2 className="text-xl font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl">
                  {vendorDataState.dataFromServer?.name}
                </h2>

                {/* Username */}
                <div className="mt-1 text-sm font-medium tracking-tighter text-gray-600 dark:text-gray-400 xl:mt-3">
                  {/* @{authorData?.user_name} */}
                  @{vendorDataState.dataFromServer?.email}
                </div>
                
                {/* User ID and Address */}
                <div className="mt-5 inline-flex h-9 items-center rounded-full bg-white shadow-card dark:bg-light-dark xl:mt-6">
                  <div className="inline-flex h-full shrink-0 grow-0 items-center rounded-full bg-gray-900 px-4 text-xs text-white sm:text-sm">
                    {reciversTokenInfo?.code}
                  </div>
                  <div className="text w-28 grow-0 truncate text-ellipsis bg-center text-xs text-gray-500 ltr:pl-4 rtl:pr-4 dark:text-gray-300 sm:w-32 sm:text-sm">
                    {vendorDataState.dataFromServer?.walletAddress}
                  </div>
                  <div className="flex cursor-pointer items-center px-4 text-gray-500 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" title="Copy Address" onClick={handleCopyToClipboard}>
                    {copyButtonStatus ? (<Check className="h-auto w-3.5 text-green-500"/>) : (<Copy className="h-auto w-3.5"/>)}
                  </div>
                </div>


                <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-y border-dashed border-gray-200 py-5 text-center dark:border-gray-700 ">
                  <Button color="white" className="shadow-card dark:bg-light-dark md:h-10 md:px-5 xl:h-12 xl:px-7"  onClick={() => openModal('SHARE_VIEW')}>
                    Share
                  </Button>
                </div>


              </div>
              <AuthorInformation map3Url={Utils.Map3WebsiteUrl} userPath={router.asPath} className="hidden md:block" data={vendorDataState.dataFromServer}/>
            </div>

            <div className="grow pt-6 pb-9 md:-mt-2.5 md:pt-1.5 md:pb-0 md:ltr:pl-7 md:rtl:pr-7 lg:ltr:pl-10 lg:rtl:pr-10 xl:ltr:pl-14 xl:rtl:pr-14 3xl:ltr:pl-16 3xl:rtl:pr-16">
              <PayVendorLayout>
          <div className="mb-5 border-b border-dashed border-gray-200 pb-5 dark:border-gray-800 xs:mb-7 xs:pb-6">
           
          {/* reciversTokenInfo */}
            <VendorReciverCoinInput
            label={'Receivers Token'}
            // tokenAddress={reciversToken && reciversToken}
            tokenInfo={reciversTokenInfo && reciversTokenInfo}
            getCoinValue={(data) => {
              console.log('Receivers coin value:', data)
              setamountToBeSent(data.value)
          }}
            />

            <div className={cn('relative flex gap-3',  'flex-col')}>
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
        </PayVendorLayout>
            </div>
            <AuthorInformation map3Url={Utils.Map3WebsiteUrl} userPath={router.asPath}  data={vendorDataState.dataFromServer}/>

          </div>
        </div>
      </DashboardLayout>
)}
{vendorDataState.loadingInfo &&
          <LoadingView/>

          }

    </>);
};
export default PayVendorPage;


