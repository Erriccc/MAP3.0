import { useState, useContext, useEffect,useLayoutEffect} from "react";
import Utils from'/Utilities/utils';
import DashboardLayout from 'layouts/_dashboard';
import { NextSeo } from 'next-seo';
// import dynamic from 'next/dynamic';
import { PowerIcon } from '/components/icons/power';
import { toast } from 'react-toastify';

import { useStepperContext } from "/Utilities/FrontEndUtilities/FEStepperContext";
import ConfirmationModal from '/components/nft/confirmationModal.jsx' 
import { WalletContext } from 'lib/hooks/use-connect';
import { useModal } from '/components/modal-views/context';
import Button from '/components/ui/button';

import HelpSettingUpWallet from '/components/RegistrationFormSteps/HelpSettingUpWallet'
import routes from 'config/routes';

import { useRouter } from "next/dist/client/router";





function RegisterVendor() {
  const { userData, setUserData } = useStepperContext();
  const { address,isConnected, magicEmail, error, connectToWallet, disconnectWallet} = useContext(WalletContext);
    const [inputEmail, setInputEmail] = useState();

    const router = useRouter()


  useEffect(() => {

    let isMounted = true;
    console.log('refreshing...')
    document.documentElement.style.removeProperty('overflow');
    return () => { isMounted = false };

  }, [address,isConnected])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await connectToWallet(inputEmail)
  }



  return (
    <>
    <NextSeo title="sign up" description="0xMaps - sign up new vendor profiles"/>
    <DashboardLayout>

        <div className="relative mx-auto max-w-full rounded-lg bg-white px-9 py-16 dark:bg-light-dark">
      <h2 className="mb-4 text-center text-2xl font-medium uppercase text-gray-900 dark:text-white">
        Quick SignUp
      </h2>
      <p className="text-center text-sm leading-loose tracking-tight text-gray-600 dark:text-gray-400">
        Join Our Community
      </p>
    <HelpSettingUpWallet moduleTitle={"new to web3 wallets?"}/>
      {isConnected ? (
        <div className='flex flex-col'>
          <Button size="large" shape="rounded"  className="mt-6 flex mx-auto justify-center items-center uppercase xs:mt-8 xs:tracking-widest"
              onClick={async ()=>{
                await disconnectWallet()}}>
                {/* <PowerIcon /> */}
                Discconnect
              </Button>

            <Button size="large" shape="rounded"  className="mt-6 flex mx-auto justify-center items-center uppercase xs:mt-8 xs:tracking-widest"
                  onClick={async ()=>{
                    router.push({
                      pathname: routes.completeSetup
                    });
                  }}
                  >Become A Vendor</Button>
      </div>
      ):(
        <div>
            <form onSubmit={handleSubmit}>

                <input
                onChange={(e) => setInputEmail(e.target.value)}
                type="email"
                placeholder="Email address..."
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                />
            </form>



        {/* <input
                onChange={(e) => setInputEmail(e.target.value)}
                type="email"
                placeholder="Sign Up With Email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              />
        <div className='mt-5 flex h-14 w-1/2 mx-auto cursor-pointer items-center justify-center rounded-lg bg-gradient-to-l from-blue-400  to-blue-100' 
        // onClick={closeModal}
        onClick={async ()=>{
          // closeModal()
          await connectToWallet(inputEmail)
        }}
        
        >
          <span>Welcome</span>
        </div> */}
    </div>
      )}

                

      {error && (<p className="mt-3 text-center text-xs text-red-500">
          Please install Metamask or other wallet providers in order to connect
          wallet.
        </p>)}
    </div>








        

      {/* navigation button */}
      {/* <ConfirmationModal confirmationTitle = "Payment was successful"/> */}
      
    {/* </div> */}
    </DashboardLayout>
      </>
  );
}

export default RegisterVendor;


// {
//     aboutVendor: "bio here"
// email: "hello email"
// geoAddress: "2548 w augusta blvd"
// imageUrl: "https://cdn.pixabay.com/photo/2015/09/21/14/24/supermarket-949913__340.jpg"
// userName: "hello name"
// userWallet: "0x6fe4668722e3195fa897217a4bdd6ee1d289543f"
// vendorKeywords: "test, key, words, for, new, vendor"
// websiteUrl: "websiteurl.com"
// }

// userImage: Array(1)
// 0: File {path: 'benefit-two.png', preview: 'blob:http://localhost:3000/f609e4cd-5d1d-4794-9a80-3c4688a5b3af', name: 'benefit-two.png', lastModified: 1655080987124, lastModifiedDate: Sun Jun 12 2022 19:43:07 GMT-0500 (Central Daylight Time), …}
// length: 1
