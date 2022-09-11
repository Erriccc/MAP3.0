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
import{signUpEventHandler,ValidateUserSignUpInput} from '/Utilities/FrontEndUtilities/FEsignUpHandler';



import ProcessingView from '/components/ui/ProcessingView';

 

export default function Final() {
  const { openModal } = useModal();

const { userData, setUserData} = useStepperContext();
const  [files, setFiles] = useState({userData})
let [systemProcessing, setSystemProcessing] = useState(false);
  let [validatingInput, setvalidatingInput] = useState(false);
  let [transacting, setTransacting] = useState(false);
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

      const submitPayment = async (UsertransactionInput) => {
        const wrappedProvider = new Utils.ethers.providers.Web3Provider(Moralis.connector.provider);
        const wrappedSigner = wrappedProvider.getSigner();
        try{
          await signUpEventHandler(wrappedSigner, UsertransactionInput, handleSuccess,handleError, setSystemProcessing, openModal);
          // await signUpEventHandler(wrappedSigner, UsertransactionInput, handleSuccess,handleError, setSystemProcessing);
          // openModal('WALLET_CONNECT_VIEW')
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
        <Button shape="rounded" variant="solid" color="gray" className="bg-brand "  href="/appvendors?map3Querry=*"
         onClick={
          () => {
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
                if(await ValidateUserSignUpInput(UsertransactionInput,handleError,setvalidatingInput)){
                console.log("All validation passed........... processing transaction")
                submitPayment(UsertransactionInput);
                }
                else{
                  console.log("validation is false")
                }
              })();
          }}
        >
                Submit Transaction
        </Button>
        </div>

        {validatingInput && (<ProcessingView status={"validating Input..."} arrayToDisplay={Utils.TypoEffectTexts.Validating}/>)}
        {systemProcessing && (<ProcessingView status={"System Processing... "} arrayToDisplay={Utils.TypoEffectTexts.Processing}/>)}
        {transacting && (<ProcessingView status={"Transacting..."} arrayToDisplay={Utils.TypoEffectTexts.Transacting}/>)}

      </div>
    );
  }