import { useState, useRef,useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useClickAway } from 'lib/hooks/use-click-away';
import { useTypedPhrases } from 'lib/hooks/useTypedPhrases';
import { useLockBodyScroll } from 'lib/hooks/use-lock-body-scroll';


// dynamic import
// const CoinSelectView = dynamic(() => import('/components/ui/coin-select-view'));
const decimalPattern = /^[0-9]*[.,]?[0-9]*$/;




export default function ProcessingView({status, arrayToDisplay, className, ...rest }) {
    let [visibleCoinList, setVisibleCoinList] = useState(true);
    const modalContainerRef = useRef(null);
    useClickAway(modalContainerRef, () => {
        setVisibleCoinList(false);
    });
    // useLockBodyScroll(visibleCoinList);
    let TypedStaus = useTypedPhrases([status],0);
    let displayedTypedPhrase = useTypedPhrases(arrayToDisplay);

    
    return (<>
      <AnimatePresence>
       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className=" fixed flex flex-col content-center inset-0 z-50 overflow-y-auto overflow-x-hidden bg-gray-700 bg-opacity-60 p-4 text-center backdrop-blur xs:p-5">
            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="h-1/5 align-middle" aria-hidden="true">
              &#8203;
            </span>
            <div className='h-1/5 align-middle '>

                                                        <h2 className='text-gray-300 font-bold text-2xl italic' > {TypedStaus}</h2>
             </div>
            <div >
             
              <div className=" font-bold text-xl text-center text-green-500 hover:text-green-800 p-4 mx-2" >
                                                        {/* <svg role="status" className="inline w-8 h-18 mr-2 text-gray-200 animate-spin dark:text-white fill-gray-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                        </svg> */}
                                                        
                                
                                <h2 className=' blinking-cursor text-blue-300 ' > {displayedTypedPhrase}
                                </h2>
                            </div>
            </div>
          </motion.div>
          
      </AnimatePresence>
    </>);
}
ProcessingView.displayName = 'ProcessingView';
