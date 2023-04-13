import { WalletContext } from 'lib/hooks/use-connect';
import { useModal } from '/components/modal-views/context';
import { useMoralis } from 'react-moralis'
import { useContext, useEffect, useState} from 'react';
import Button from '/components/ui/button';
import { PowerIcon } from '/components/icons/power';
import { useRouter } from "next/dist/client/router";
import routes from 'config/routes';

import HelpSettingUpWallet from '/components/RegistrationFormSteps/HelpSettingUpWallet'

export default function SelectWallet({ ...props }) {
  const { address,isConnected, magicEmail, error, connectToWallet, disconnectWallet} = useContext(WalletContext);
    const router = useRouter();

    
    const { closeModal } = useModal();
    const [inputEmail, setInputEmail] = useState();

    const handleSubmit = async (e) => {
      e.preventDefault()
      closeModal()
      await connectToWallet(inputEmail)
    }
    return (
    
    <div className="relative z-50 mx-auto max-w-full rounded-lg bg-white px-9 py-16 dark:bg-light-dark" {...props}>
      <h2 className="mb-4 text-center text-2xl font-medium uppercase text-gray-900 dark:text-white">
        Connect Wallet
      </h2>
      <p className="text-center text-sm leading-loose tracking-tight text-gray-600 dark:text-gray-400">
        {/* By connecting your wallet, you agree to our Terms of Service and our
        Privacy Policy. */}
        please connect your a wallet to get access to key features
      </p>
    <HelpSettingUpWallet moduleTitle={"need a new wallet?"}/>

        {/* DISPLAY SIGN IN/UP BUTTON  */}

      <div>
      <form onSubmit={handleSubmit}>

      <input
                          onChange={(e) => setInputEmail(e.target.value)}
                          type="email"
                          placeholder="Email address..."
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        />
      </form>

                  
                  {/* <div className='mt-5 flex h-14 w-1/2 mx-auto cursor-pointer items-center justify-center rounded-lg bg-gradient-to-l from-blue-400  to-blue-100' 
                  onClick={async ()=>{
                    closeModal()
                    await connectToWallet(inputEmail)
                  }}
                  
                  >
                    <span>SignIn/Up</span>
                  </div>
               <div className='mt-10 flex h-14 w-1/2 mx-auto cursor-pointer items-center justify-center rounded-lg bg-red-200 ' 
        onClick={async ()=>{
          closeModal()
          await disconnectWallet()
        }}
      >
        <span>Sign Out</span>
      </div>  */}
      </div> 
  
                  

            

      {error && (<p className="mt-3 text-center text-xs text-red-500">
          Please install Metamask or other wallet providers in order to connect
          wallet.
        </p>)}
    </div>);
}
