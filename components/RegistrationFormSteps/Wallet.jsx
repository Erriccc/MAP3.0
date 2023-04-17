import { WalletContext } from 'lib/hooks/use-connect';
import { useMoralis } from 'react-moralis'
import { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { toast } from 'react-toastify';

import HelpSettingUpWallet from '/components/RegistrationFormSteps/HelpSettingUpWallet'

import { useStepperContext } from "/Utilities/FrontEndUtilities/FEStepperContext";

const UsefulResources = [
  {resourceType: 'Metamask Wallet', transactionUrl:"https://metamask.io/"},
  {resourceType: 'Trust Wallet', transactionUrl:"https://trustwallet.com/"},
]


export default function Wallet({ ...props }) {
  const { userData, setUserData, finalData, setFinalData } = useStepperContext();
  const { address,isConnected,authState, error, connectToWallet, disconnectWallet} = useContext(WalletContext);
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserData({ ...userData, [name]: value });
  // };


  useEffect(() => {
   if(isConnected){
    setUserData({ ...userData, ["userWallet"]: address });
    console.log("userdata before submission..", userData)
   }else{
   }
  }, [isConnected])
  

  return (
   
<div className="relative mx-auto max-w-full rounded-lg bg-white px-9 py-16 dark:bg-light-dark" {...props}>
      <h2 className="mb-4 text-center text-2xl font-medium uppercase text-gray-900 dark:text-white">
        Set Wallet Address
      </h2>
      <p className="text-center text-sm leading-loose tracking-tight text-gray-600 dark:text-gray-400">
        By connecting your wallet, you agree to our Terms of Service and our
        Privacy Policy.
      </p>
      <div className='mt-12 flex h-14 w-full cursor-pointer items-center justify-center rounded-lg '>
          {/* <ConnectButton />  */}
          {/* Connect Button Place Holder */}
    </div>

    <HelpSettingUpWallet/>

    </div>



  );
}