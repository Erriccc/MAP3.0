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
          <ConnectButton /> 
    </div>




      <div className="flex items-center justify-between gap-4 mt-5">
                        <InputLabel  subTitle="need Help setting up a wallet?"/>
                        <div className="shrink-0">
                        <Switch checked={needsHelp} onChange={() => setNeedsHelp(!needsHelp)}>
                            <div className={cn(needsHelp ? 'bg-brand' : 'bg-gray-200 dark:bg-gray-700', 'relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors duration-300')}>
                            <span className={cn(needsHelp
                    ? 'bg-white ltr:translate-x-5 rtl:-translate-x-5 dark:bg-light-dark'
                    : 'bg-white ltr:translate-x-0.5 rtl:-translate-x-0.5 dark:bg-light-dark', 'inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform duration-200')}/>
                            </div>
                        </Switch>
                        </div>
                    </div>
                    {needsHelp && (
                        <div className="border-y border-dashed border-gray-200 py-5 dark:border-gray-700 xl:py-6">
                                <div className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
                                Resource Links
                                </div>
                                        {UsefulResources?.map((item, index) => (
                                        <div key={index}>
                                        <FeaturedCard item={item} className="mb-3 first:mb-0"/>
                                        </div>
                                        ))}
                         </div>
                    )}

      {error && (
      <div>
      <p className="mt-3 text-center text-xs text-red-500">
          Please install Metamask or other wallet providers in order to connect
          wallet.
        </p>
        </div>
        )
        }
    </div>



  );
}