import Image from '/components/ui/image';
import metamaskLogo from 'assets/images/metamask.svg';
import { WalletContext } from 'lib/hooks/use-connect';
import { useModal } from '/components/modal-views/context';
import { useMoralis } from 'react-moralis'
import { useContext, useEffect } from 'react';
import ActiveLink from '/components/ui/links/active-link';
 
export default function TransactionrecieptModal({  confirmationTitle }) {
    // const { address, error, connectToWallet, disconnectWallet} = useContext(WalletContext);
    // const { closeModal } = useModal();
    const {isAuthenticated, account} = useMoralis()
    const { address, error, connectToWallet, disconnectWallet} = useContext(WalletContext);


    return (<div className="relative z-50 mx-auto max-w-full rounded-lg bg-white px-9 py-16 dark:bg-light-dark" >
      <h2 className="mb-4 text-center text-2xl font-medium uppercase text-gray-900 dark:text-white">
        THANK YOU
      </h2>
      
       <p className="text-center text-sm leading-loose tracking-tight text-gray-600 dark:text-gray-400">
        {/* {...props,} */}
        {confirmationTitle}
      </p>

      {/* <div className='mt-10 flex h-14 w-1/2 mx-auto cursor-pointer items-center justify-center rounded-lg bg-blue-200 ' 
        onClick={async ()=>{
        //   closeModal()
        }}
      > */}
        <ActiveLink href={'/'} className="mt-10 flex h-14 w-1/2 mx-auto cursor-pointer items-center justify-center rounded-lg bg-blue-200 ">
            Home
        </ActiveLink>
      {/* </div> */}
      <div className='mt-5 flex h-14 w-1/2 mx-auto cursor-pointer items-center justify-center rounded-lg bg-blue-200 ' 
    onClick={async ()=>{
        // closeModal()
      }}
      >
              <span>Send feedback</span>
      </div>


      {/* {error && (<p className="mt-3 text-center text-xs text-red-500">
          we encountered an error: {error}
        </p>)} */}
    </div>);
}
 