import Button from '/components/ui/button';
import Utils from'/Utilities/utils';

import { WalletContext } from 'lib/hooks/use-connect';
import { useModal } from '/components/modal-views/context';
import { useMoralis } from 'react-moralis';

import { useContext, useEffect, useState } from 'react';
// import { ConnectButton} from "web3uikit";
import FeaturedCard from '/components/nft/featured-card';
import InputLabel from '/components/ui/input-label';
import { Switch } from '/components/ui/switch';
import cn from 'classnames';
import { useNotification } from "web3uikit";
import { useStepperContext } from "/Utilities/FrontEndUtilities/FEStepperContext";
import { useDropzone } from 'react-dropzone';
import Image from '/components/ui/image';
// import dynamic from 'next/dynamic';
import{signUpEventHandler,signUpEventExecutor, ValidateUserSignUpInput} from '/Utilities/FrontEndUtilities/FEsignUpHandler';

import ConfirmationModal from '/components/nft/confirmationModal'


import ProcessingView from '/components/ui/ProcessingView';

 

export default function Final() {
  const { openModal } = useModal();

const { userData, setUserData} = useStepperContext();
const  [files, setFiles] = useState({userData})
// let [systemProcessing, setSystemProcessing] = useState(false);
  // let [validatingInput, setvalidatingInput] = useState(false);
  // let [transacting, setTransacting] = useState(false);
  let [validatingInput, setvalidatingInput] = useState(false);
  let [validationResponce, setValidationResponce] = useState('Send');
  let [txReciept, setTxReciept] = useState();
  
  let [transacting, setTransacting] = useState(false);
  let [transactionPopulated, setTransactionPopulated] = useState(false);
  let [txDetails, setTxDetails] = useState();

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
      useEffect(() => {
        if(account){
            setUserData({ ...userData, ["userWallet"]: account });
            console.log("userdata before submission..", userData)
           }else{
           }
      }, [account])

      useEffect(() => {
    setTransactionPopulated(false)

    let UsertransactionInput = {
      userWallet: account,
      userName: userData.userName,
      email: userData.email ? userData.email: null,
      aboutVendor: userData.aboutVendor ? userData.aboutVendor : null,
      vendorKeywords: userData.vendorKeywords ?  userData.vendorKeywords: null,
      geoAddress: userData.geoAddress ? userData.geoAddress : null,
      imageUrl:userData.imageUrl ? userData.imageUrl: null,
      userImage:userData.userImage ? userData.userImage : null,
      websiteUrl: userData.websiteUrl ?  userData.websiteUrl: null,
      userCurrency: userData.userCurrency
  };
    (async function() {
      if(await ValidateUserSignUpInput(UsertransactionInput,setValidationResponce,setvalidatingInput)){
      console.log("All validation passed........... processing transaction")
      submitPayment(UsertransactionInput);
      }
      else{
        console.log("validation is false")
      }
    })();
      }, [account,userData])

      const submitPayment = async (UsertransactionInput) => {
        const wrappedProvider = new Utils.ethers.providers.Web3Provider(Moralis.connector.provider);
        const wrappedSigner = wrappedProvider.getSigner();
        try{
          await signUpEventHandler(wrappedProvider, UsertransactionInput, handleSuccess,handleError,setTransactionPopulated, setTxDetails  );
        }catch(e){
        }
      };
      
      const signUpExecutor = async (txDetails) => {
        const wrappedProvider = new Utils.ethers.providers.Web3Provider(Moralis.connector.provider);
        const wrappedSigner = wrappedProvider.getSigner();
        try{
          await signUpEventExecutor(wrappedSigner, txDetails, handleSuccess,handleError, setTransacting, setTransactionPopulated, setTxDetails, setTxReciept);

        }catch(e){
        }
      };












    return (
      <div className="container">
        <div className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
                Confirm Details
        </div>
        <div className="flex flex-col">
                <div className="relative h-40 w-40 overflow-hidden rounded-lg xl:h-50 2xl:h-60">
                       {userData.userImage &&( 
                       <img
                        src={URL.createObjectURL(userData.userImage[0]) }
                        style={{
                            width: '0px',
                            height: '0px',
                            minWidth:'100%',
                            maxWidth:'100%',
                            minHeight: "100%",
                            maxHeight: '100%'
                            
                        }}
                        // Revoke data uri after image is loaded
                        onLoad={() => { URL.revokeObjectURL(userData.userImage[0].preview) }}
                        alt="profile Image"
                        />
                        )
                        
                }{userData.imageUrl && (
                      <Image 
                      src={`/api/imagefetcher?url=${encodeURIComponent(
                          userData?.imageUrl
                        )}`}
                      layout="fill" 
                      // objectFit="cover" 
                      // width={150} height={150}
                     
                      alt="profile Image"/>

              // alt={name} width={48} height={48} className="rounded-[6px]"/>
                              )
                        }

                </div>
            
            <div className="border-y border-dashed border-gray-200 py-5 dark:border-gray-700 xl:py-6">
                <div className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
                    Name
                </div>
               { userData?.userName ? (<div className="text-sm leading-6 tracking-tighter text-gray-600 dark:text-gray-400">
                    {userData.userName}
                </div>):(
                    <div className="text-sm leading-6 tracking-tighter text-red-600 dark:text-red-400">
                        please enter a valid name to proceed
                    </div>
                )}
            </div>

            <div className="border-y border-dashed border-gray-200 py-5 dark:border-gray-700 xl:py-6">
                <div className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
                    Wallet Address
                </div>
                { account? (<div className="text-sm leading-6 tracking-tighter text-gray-600 dark:text-gray-400">
                    {account}
                </div>):(
                    <div className="text-sm leading-6 tracking-tighter text-red-600 dark:text-red-400">
                        please sign in with your desired wallet to continue
                    </div>
                )}

            </div>

            <div className="border-y border-dashed border-gray-200 py-5 dark:border-gray-700 xl:py-6">
                <div className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
                    Currency
                </div>

                { userData?.userCurrency  && userData?.currencySymbol? (
                <div className="flex flex-col text-sm leading-6 tracking-tighter text-gray-600 dark:text-gray-400">
                <span >symbol: {userData?.currencySymbol} </span> 
                <span>
                address: {userData?.userCurrency}
                </span>
            </div>
                ):(
                    <div className="text-sm leading-6 tracking-tighter text-red-600 dark:text-red-400">
                        please enter a valid Currency to proceed
                    </div>
                )}

            </div>
        </div>

        <div className="w-full flex justify-center my-4">
        {/* <Button shape="rounded" variant="solid" color="gray" className="bg-brand "  href="/appvendors?map3Querry=*"        >
                Submit Transaction
        </Button> */}
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
                signUpExecutor(txDetails && txDetails);
              })();
          }}
           >
            {txDetails && (<span>Submit Transaction</span>)}
          </Button>)}

        </div>

        {/* {validatingInput && (<ProcessingView status={"validating Input..."} arrayToDisplay={Utils.TypoEffectTexts.Validating}/>)} */}
        {/* {systemProcessing && (<ProcessingView status={"System Processing... "} arrayToDisplay={Utils.TypoEffectTexts.Processing}/>)} */}
        {txReciept && (<ConfirmationModal  txReciept={txReciept} setTxReciept={setTxReciept} confirmationTitle = "Payment was successful"/>)}
        
        {transacting && (<ProcessingView status={"Transacting..."} arrayToDisplay={Utils.TypoEffectTexts.Transacting}/>)}

      </div>
    );
  }


//     let UsertransactionInput = {
//       userWallet: account,
//       userName: userData.userName,
//       email: userData.email ? userData.email: null,
//       aboutVendor: userData.aboutVendor ? userData.aboutVendor : null,
//       vendorKeywords: userData.vendorKeywords ?  userData.vendorKeywords: null,
//       geoAddress: userData.geoAddress ? userData.geoAddress : null,
//       imageUrl:userData.imageUrl ? userData.imageUrl: null,
//       userImage:userData.userImage ? userData.userImage : null,
//       websiteUrl: userData.websiteUrl ?  userData.websiteUrl: null,
//       userCurrency: userData.userCurrency
//   };
//     (async function() {
//       if(await ValidateUserSignUpInput(UsertransactionInput,handleError,setvalidatingInput)){
//       console.log("All validation passed........... processing transaction")
//       submitPayment(UsertransactionInput);
//       }
//       else{
//         console.log("validation is false")
//       }
//     })();