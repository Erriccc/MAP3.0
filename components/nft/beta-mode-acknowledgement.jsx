import Image from '/components/ui/image';
import metamaskLogo from 'assets/images/metamask.svg';
import { WalletContext } from 'lib/hooks/use-connect';
import { useModal } from '/components/modal-views/context';
import { useMoralis } from 'react-moralis'
import { useContext, useEffect } from 'react';
import { useRouter } from "next/dist/client/router";
import routes from 'config/routes';

export default function BetaModeAcknowledgement({ ...props }) {
    // const { address, error, connectToWallet, disconnectWallet} = useContext(WalletContext);
    const { closeModal } = useModal();
    const {isAuthenticated, account} = useMoralis()
    const { address, magicEmail,error, isConnected,authState, connectToWallet, disconnectWallet} = useContext(WalletContext);
    const router = useRouter();


    return (<div className="relative z-50 mx-auto max-w-full rounded-lg bg-white px-9 py-16 dark:bg-light-dark" {...props}>
      <h2 className="mb-4 text-center text-2xl font-medium uppercase text-gray-900 dark:text-white">
        WE ARE CURRENTLY IN BETA MODE
      </h2>
      {/* <p className="text-center text-sm leading-loose tracking-tight text-gray-600 dark:text-gray-400">
        By using this website, you agree to our Terms of Service and our
        Privacy Policy.
      </p> */}
       <p className="text-center text-sm leading-loose tracking-tight text-gray-600 dark:text-gray-400">
        The beta program provides early access to new features and bug fixes, please document and report issues and give feedback to help make Map3 better.
         Do not use the beta program if you are not comfortable with running software that is beign tested, may have bugs and/or 
        incomplete features that might put your data and funds at risk.
      </p>

      <div className='mt-10 flex h-14 w-1/2 mx-auto cursor-pointer items-center justify-center rounded-lg bg-red-200 ' 
        onClick={async ()=>{
          closeModal()
          await disconnectWallet()
        }}
      >
        <span>Sign Out</span>
      </div>
      <div className='mt-5 flex h-14 w-1/2 mx-auto cursor-pointer items-center justify-center rounded-lg bg-blue-200 ' onClick={closeModal}>
              <span>CONTINUE</span>
      </div>
      <div className='mt-5 flex h-14 w-1/2 mx-auto cursor-pointer items-center justify-center rounded-lg bg-blue-200 ' 
      onClick={async ()=>{
        closeModal()
        router.push({
          pathname: routes.completeSetup
        });
      }}
      >
              <span>Become A Vendor</span>
      </div>


      {/* {error && (<p className="mt-3 text-center text-xs text-red-500">
          we encountered an error: {error}
        </p>)} */}
    </div>);
}
