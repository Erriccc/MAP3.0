import Image from '/components/ui/image';
import metamaskLogo from 'assets/images/metamask.svg';
import { WalletContext } from 'lib/hooks/use-connect';
import { useModal } from '/components/modal-views/context';
import { useMoralis } from 'react-moralis'
import { useContext, useEffect } from 'react';
import Button from '/components/ui/button';
import HelpSettingUpWallet from '/components/RegistrationFormSteps/HelpSettingUpWallet'

// import { ConnectButton, Icon, Select, DatePicker, Input, Button } from "web3uikit";


export default function SelectWallet({ ...props }) {
    const { address, error, connectToWallet, disconnectWallet} = useContext(WalletContext);
    const { closeModal } = useModal();
    const {isAuthenticated, account} = useMoralis()

    // useEffect(() => {
    //     if (address)
    //         // closeModal();
    //         console.log('addresss dectected from select-wallet componnent')
    // }, [address, closeModal]);
    return (<div className="relative z-50 mx-auto max-w-full rounded-lg bg-white px-9 py-16 dark:bg-light-dark" {...props}>
      <h2 className="mb-4 text-center text-2xl font-medium uppercase text-gray-900 dark:text-white">
        Connect Wallet
      </h2>
      <p className="text-center text-sm leading-loose tracking-tight text-gray-600 dark:text-gray-400">
        {/* By connecting your wallet, you agree to our Terms of Service and our
        Privacy Policy. */}
        please connect your a wallet to get access to key features
      </p>
    <HelpSettingUpWallet moduleTitle={"need a new wallet?"}/>

{/* YOO THIS IS WHERE YOU EDIT CONNECTION */}

      {/* <div className="mt-12 flex h-14 w-full cursor-pointer items-center justify-between rounded-lg bg-gradient-to-l from-[#ffdc24] to-[#ff5c00] px-4 text-base text-white transition-all hover:-translate-y-0.5" onClick={connectToWallet}>
        <span>MetaMask</span>
        <span className="h-auto w-9">
          <Image src={metamaskLogo} alt="metamask"/>
        </span>
      </div> */}
            <div className='mt-10 flex h-14 w-1/2 mx-auto cursor-pointer items-center justify-center rounded-lg bg-gradient-to-l from-[#ffdc24] to-[#ff5c00]  ' 
            // onClick={closeModal}
            onClick={async ()=>{
              closeModal()
              await connectToWallet(true)
            }}
            
            >
              <span>Web Wallet</span>
            </div>
            <div className='mt-5 flex h-14 w-1/2 mx-auto cursor-pointer items-center justify-center rounded-lg bg-gradient-to-l from-blue-400  to-blue-100' 
            // onClick={closeModal}
            onClick={async ()=>{
              closeModal()
              await connectToWallet(false)
            }}
            
            >
              <span>Wallet Conect</span>
            </div>

      {error && (<p className="mt-3 text-center text-xs text-red-500">
          Please install Metamask or other wallet providers in order to connect
          wallet.
        </p>)}
    </div>);
}
