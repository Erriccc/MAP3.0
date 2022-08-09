import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import cn from 'classnames';
import { ChevronDown } from '/components/icons/chevron-down';
import { useClickAway } from 'lib/hooks/use-click-away';
import { useLockBodyScroll } from 'lib/hooks/use-lock-body-scroll';
import { coinList } from 'data/static/coin-list'; //
import { Plus } from '../icons/plus';

// dynamic import
const ProfileSearchSelect = dynamic(() => import('/components/ui/ProfileSearchSelect'));
const decimalPattern = /^[0-9]*[.,]?[0-9]*$/;
export default function ProfileModalInput({ label, getCoinValue,  className, ...rest }) {
    // let [value, setValue] = useState('');
    let [selectedCoin, setSelectedCoin] = useState('');
    let [visibleCoinList, setVisibleCoinList] = useState(false);
    const modalContainerRef = useRef(null);//
    useClickAway(modalContainerRef, () => {
        setVisibleCoinList(false);
    });
    // useLockBodyScroll(visibleCoinList);
    function handleSelectedCoin(coin) {
        setSelectedCoin(coin);
        setVisibleCoinList(false);
        getCoinValue && getCoinValue(coin);

    }
    return (<>
      
    <div className={`ease-[cubic-bezier(0.33, 1, 0.68, 1)] relative mb-5 overflow-hidden rounded-lg bg-white shadow-card transition-all duration-[350ms] last:mb-0 hover:shadow-transaction dark:bg-light-dark `}>

        <button className="flex h-13 w-full items-center justify-between px-5 py-2 text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white" 
        onClick={() => setVisibleCoinList(true)}>
          <div>

          {label}

          </div>
          <div className="relative flex p-2 md:ml-3 h-8 w-8 m items-center justify-center bg-white/80 text-gray-600 shadow-large backdrop-blur rounded-lg dark:bg-brand/80 dark:text-gray-200" >
            {/* <ChevronDown className="ltr:ml-1.5 rtl:mr-1.5"/> */}
            <span className={`shrink-0 transition-transform duration-200 p-1 `}>

            <Plus className="mr-1"/>

              <span className="absolute top-1 right-1 flex h-3 w-3 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-80"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              
            </span>

          </div>
        </button>
    </div>
      <AnimatePresence>
        {visibleCoinList && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-gray-700 bg-opacity-60 p-4 text-center backdrop-blur xs:p-5">
            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-1/2 align-middle" aria-hidden="true">
              &#8203;
            </span>
            <motion.div initial={{ scale: 1.05 }} animate={{ scale: 1 }} exit={{ scale: 1.05 }} transition={{ duration: 0.3 }} ref={modalContainerRef} className="inline-block text-left align-middle">
              {/* <CoinSelectView onSelect={(selectedCoin) => handleSelectedCoin(selectedCoin)}/> */}
              <ProfileSearchSelect onSelect={(selectedCoin) => handleSelectedCoin(selectedCoin)}/>
              
            </motion.div>
          </motion.div>)}
      </AnimatePresence>
    </>);
}
ProfileModalInput.displayName = 'ProfileModalInput';
