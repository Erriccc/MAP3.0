import { WalletContext } from 'lib/hooks/use-connect';
import { useModal } from '/components/modal-views/context';
import { useMoralis } from 'react-moralis'
import { useContext, useEffect, useState } from 'react';
// import { ConnectButton} from "web3uikit";
import FeaturedCard from '/components/nft/featured-card';
import InputLabel from '/components/ui/input-label';
import { Switch } from '/components/ui/switch';
import cn from 'classnames';
import { useNotification } from "web3uikit";
import HelpSettingUpWallet from '/components/RegistrationFormSteps/HelpSettingUpWallet'

import { useStepperContext } from "/Utilities/FrontEndUtilities/FEStepperContext";

const UsefulResources = [
    {resourceType: 'metamask for Mobile', transactionUrl:"https://www.google.com"},
    {resourceType: 'metamask for Pc', transactionUrl:"https://www.google.com"},
    {resourceType: 'Trust Wallet for Mobile', transactionUrl:"https://www.google.com"},
    {resourceType: 'Trust Wallet for Pc', transactionUrl:"https://www.google.com"},
]


export default function Wallet({ ...props }) {
  const { userData, setUserData, finalData, setFinalData } = useStepperContext();
  let [needsHelp, setNeedsHelp] = useState(false);

  const { address, error, connectToWallet, disconnectWallet} = useContext(WalletContext);
    const {account} = useMoralis()
    const dispatch = useNotification();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserData({ ...userData, [name]: value });
  // };


  useEffect(() => {
   if(account){
    setUserData({ ...userData, ["userWallet"]: account });
    console.log("userdata before submission..", userData)
   }else{
   }
  }, [account])
  

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