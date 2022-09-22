// import Image from '/components/ui/image';
// import metamaskLogo from 'assets/images/metamask.svg';
// import { WalletContext } from 'lib/hooks/use-connect';
// import { useModal } from '/components/modal-views/context';
// import { useMoralis } from 'react-moralis'
// import { useContext, useEffect } from 'react';
// import ActiveLink from '/components/ui/links/active-link';
 
// export default function ConfirmationModal({  confirmationTitle }) {
//     // const { address, error, connectToWallet, disconnectWallet} = useContext(WalletContext);
//     // const { closeModal } = useModal();
//     const {isAuthenticated, account} = useMoralis()
//     const { address, error, connectToWallet, disconnectWallet} = useContext(WalletContext);


//     return (<div className="relative z-50 mx-auto max-w-full rounded-lg bg-white px-9 py-16 dark:bg-light-dark" >
//       <h2 className="mb-4 text-center text-2xl font-medium uppercase text-gray-900 dark:text-white">
//         THANK YOU
//       </h2>
      
//        <p className="text-center text-sm leading-loose tracking-tight text-gray-600 dark:text-gray-400">
//         {/* {...props,} */}
//         {confirmationTitle}
//       </p>
 
//       <p className="text-center text-sm leading-loose tracking-tight text-gray-600 dark:text-gray-400">
//         You have just recieved 3 free transactions for signing up today. invite friends to enjoy this new way of payment.
//       </p>

//       {/* <div className='mt-10 flex h-14 w-1/2 mx-auto cursor-pointer items-center justify-center rounded-lg bg-blue-200 ' 
//         onClick={async ()=>{
//         //   closeModal()
//         }}
//       > */}
//         <ActiveLink href={'/'} className="mt-10 flex h-14 w-1/2 mx-auto cursor-pointer items-center justify-center rounded-lg bg-blue-200 ">
//             Home
//         </ActiveLink>
//       {/* </div> */}
//       <div className='mt-5 flex h-14 w-1/2 mx-auto cursor-pointer items-center justify-center rounded-lg bg-blue-200 ' 
//         onClick={async ()=>{
//         // closeModal()
//       }}
//       >
//               <span>Send feedback</span>
//       </div>

//     </div>);
// }
 

import { useState, useRef,useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClickAway } from 'lib/hooks/use-click-away';

import { WalletContext } from 'lib/hooks/use-connect';
import { useModal } from '/components/modal-views/context';
import { useMoralis } from 'react-moralis'
import Utils from'/Utilities/utils';

// import { useContext, useEffect } from 'react';
import ActiveLink from '/components/ui/links/active-link';
 
export default function ConfirmationModal({  confirmationTitle, txReciept, setTxReciept }) {
    // const { address, error, connectToWallet, disconnectWallet} = useContext(WalletContext);
    const { closeModal } = useModal();
    const {isAuthenticated, account} = useMoralis()
    const { address, error, connectToWallet, disconnectWallet} = useContext(WalletContext);

    let [visibleCoinList, setVisibleCoinList] = useState(true);

    const modalContainerRef = useRef(null);
    useClickAway(modalContainerRef, () => {
        setVisibleCoinList(false);
    });

    useEffect(()=>{
      if(txReciept){
        setVisibleCoinList(true);
      }
    }, [txReciept]);
    

    console.log('transaction reciept from TransactionRecieptModal', txReciept)
    return (
      <AnimatePresence>
     {visibleCoinList && ( <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className=" fixed flex flex-col content-center inset-0 z-50 overflow-y-auto overflow-x-hidden bg-gray-700 bg-opacity-60 p-4 text-center backdrop-blur xs:p-5">
    {/* This element is to trick the browser into centering the modal contents. */}
    <span className="h-1/5 align-middle" aria-hidden="true">
              &#8203;
            </span>
        {/* <div className="relative z-50 mx-auto max-w-full rounded-lg bg-white px-9 py-16 dark:bg-light-dark" > */}
              <h2 className="mb-4 text-center text-2xl font-medium uppercase text-gray-900 dark:text-white">
                {confirmationTitle}
              </h2>
              <p className="text-center text-sm leading-loose tracking-tight text-gray-600 dark:text-gray-400">
                  You have just recieved 3 free transactions for signing up today. invite friends to enjoy this new way of payment.
              </p>
            {/* <p className="text-center text-sm leading-loose tracking-tight text-gray-600 dark:text-gray-400">
              {confirmationTitle}
            </p> */}
            <ActiveLink href={'/'} className="mt-10 flex h-14 w-1/2 mx-auto cursor-pointer items-center justify-center rounded-lg bg-blue-200 ">
                Home
            </ActiveLink>
          {/* </div> */}
          <div className='mt-5 flex h-14 w-1/2 mx-auto cursor-pointer items-center justify-center rounded-lg bg-blue-200 ' 
              onClick={async ()=>{
              setTxReciept(null)
              setVisibleCoinList(false);
                }}
          >
                  <span>Send feedback</span>
          </div>
          <div className='mt-5 flex h-14 w-1/2 mx-auto cursor-pointer items-center justify-center rounded-lg bg-red-500 ' 
              onClick={async ()=>{
              setTxReciept(null)
              setVisibleCoinList(false);
                }}
          >
                  <span>Close</span>
          </div>


          
            {/* </div> */}
      </motion.div>)}
    </AnimatePresence>
    );
}
  