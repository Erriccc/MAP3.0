import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import cn from 'classnames';
import { ChevronDown } from '/components/icons/chevron-down';
import { useClickAway } from 'lib/hooks/use-click-away';
import { useLockBodyScroll } from 'lib/hooks/use-lock-body-scroll';
import { coinList } from 'data/static/coin-list'; //
import { sendersCoinList } from '/constants/coinListPolygon'; //

// dynamic import
const CoinSelectView = dynamic(() => import('/components/ui/coin-select-view'));
const decimalPattern = /^[0-9]*[.,]?[0-9]*$/;
export default function CoinInput({ label, getCoinValue, exchangeRate, className, ...rest }) {
    let [value, setValue] = useState(0);
    let [selectedCoin, setSelectedCoin] = useState(sendersCoinList[0]);
    let [visibleCoinList, setVisibleCoinList] = useState(false);
    const modalContainerRef = useRef(null);//
    useClickAway(modalContainerRef, () => {
        setVisibleCoinList(false);
    });
    useLockBodyScroll(visibleCoinList);
    const handleOnChange = (coin, event) => {
      if(event){
          if (event.target.value.match(decimalPattern)) { setValue(event.target.value)} else{ console.log("value does not match  decimal pattern")}
          let param = { coin: selectedCoin.code, value: event.target.value, address: coin.address };
          getCoinValue && getCoinValue(param)
      }else{
            let param = { coin: selectedCoin.code, value: value, address: coin.address };
            getCoinValue && getCoinValue(param)
      }
    };
    function handleSelectedCoin(coin) {
        setSelectedCoin(coin);
        setVisibleCoinList(false);
        handleOnChange(coin);
    }
    return (<>
      <div className={cn('group flex min-h-[70px] rounded-lg border border-gray-200 transition-colors duration-200 hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-600', className)}>
        <div className="w-1/2  md:w-1/3 border-r border-gray-200 p-3 transition-colors duration-200 group-hover:border-gray-900 dark:border-gray-700 dark:group-hover:border-gray-600">
          <span className="mb-1.5 block text-xs uppercase text-gray-600 dark:text-gray-400">
            {label}
          </span>
          
            <div className=" relative flex h-10 w-full items-center justify-center bg-white/80 text-gray-600 shadow-large backdrop-blur ltr:rounded-l-lg rtl:rounded-r-lg dark:bg-brand/80 dark:text-gray-200" >
                <button onClick={() => setVisibleCoinList(true)} className="flex items-center font-medium outline-none dark:text-gray-100">
                    {selectedCoin?.icon}{' '}
                        <span className="ltr:ml-2 rtl:mr-2">{selectedCoin?.code} </span>
                        <ChevronDown className="ltr:ml-1.5 rtl:mr-1.5"/>
                        <span className="absolute top-1 right-1 flex h-3 w-3 items-center justify-center">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-80"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                      </span>
              </button>

          </div>
            
        </div>

        <div className="flex flex-1 flex-col text-right">
          <input type="text" value={value} placeholder="0.0" inputMode="decimal" onChange={(e) => {handleOnChange(selectedCoin,e)}} className="w-full rounded-tr-lg rounded-br-lg border-0 pb-0.5 text-right text-lg outline-none focus:ring-0 dark:bg-light-dark" {...rest}/>
          <span className="font-xs px-3 text-gray-400">
            = ${exchangeRate ? exchangeRate : '0.00'}
          </span>
        </div>
      </div>
      <AnimatePresence>
        {visibleCoinList && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-gray-700 bg-opacity-60 p-4 text-center backdrop-blur xs:p-5">
            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-full align-middle" aria-hidden="true">
              &#8203;
            </span>
            <motion.div initial={{ scale: 1.05 }} animate={{ scale: 1 }} exit={{ scale: 1.05 }} transition={{ duration: 0.3 }} ref={modalContainerRef} className="inline-block text-left align-middle">
              <CoinSelectView onSelect={(selectedCoin) => handleSelectedCoin(selectedCoin)}/>
            </motion.div>
          </motion.div>)}
      </AnimatePresence>
    </>);
}
CoinInput.displayName = 'CoinInput';
