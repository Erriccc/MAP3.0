import Button from '/components/ui/button';
import Utils from'/Utilities/utils';

import { WalletContext } from 'lib/hooks/use-connect';
import { useModal } from '/components/modal-views/context';
import { useMoralis } from 'react-moralis'
import { useContext, useEffect, useState } from 'react';
import { ConnectButton} from "web3uikit";
import FeaturedCard from '/components/nft/featured-card';
import InputLabel from '/components/ui/input-label';
import { Switch } from '/components/ui/switch';
import cn from 'classnames';
import { useNotification } from "web3uikit";
import { useStepperContext } from "/Utilities/FrontEndUtilities/FEStepperContext";
import { useDropzone } from 'react-dropzone';
import Image from '/components/ui/image';
import dynamic from 'next/dynamic';
import{signUpEventHandler,ValidateUserSignUpInput} from '/Utilities/FrontEndUtilities/FEsignUpHandler';



const ProcessingView = dynamic(() => import('/components/ui/ProcessingView'));



export default function Final() {

const { userData, setUserData} = useStepperContext();
const  [files, setFiles] = useState({userData})
let [systemProcessing, setSystemProcessing] = useState(false);
  let [validatingInput, setvalidatingInput] = useState(false);
  let [transacting, setTransacting] = useState(false);
      const {account} = useMoralis()
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

        try{
          await signUpEventHandler(UsertransactionInput, handleSuccess,handleError, setSystemProcessing, setTransacting);
        }catch(e){
        }
      };












    return (
      <div className="container">
        <div className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
                Confirm Details
        </div>
        <div className="flex flex-col">
                <div className="relative h-25 w-full overflow-hidden rounded-lg sm:h-30 md:h-40 xl:h-50 2xl:h-60">
                       {userData.userImage ?( 
                       <img
                        src={URL.createObjectURL(userData.userImage[0]) }
                        style={{
                            width: 'auto',
                            height: 'auto'
                        }}
                        // Revoke data uri after image is loaded
                        onLoad={() => { URL.revokeObjectURL(userData.userImage[0].preview) }}
                        alt="profile Image"
                        />
                        ):(
                <Image 
                // src={authorData?.cover_image?.thumbnail}
                src={`/api/imagefetcher?url=${encodeURIComponent(
                    userData.imageUrl
                  )}`}
                layout="fill" objectFit="cover" alt="profile Image"/>
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
                { userData?.userWallet ? (<div className="text-sm leading-6 tracking-tighter text-gray-600 dark:text-gray-400">
                    {userData.userWallet}
                </div>):(
                    <div className="text-sm leading-6 tracking-tighter text-red-600 dark:text-red-400">
                        please enter a valid Wallet Address to proceed
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
                userWallet: userData.userWallet,
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