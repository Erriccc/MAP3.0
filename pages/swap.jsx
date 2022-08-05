import { useState } from 'react';
import cn from 'classnames';
import { NextSeo } from 'next-seo';
import TradeLayout from 'layouts/_trade-layout'; 
import PayAnonymousLayout from 'layouts/PayAnonymousLayout'; 
import Slider from 'rc-slider';


import Button from '/components/ui/button';
import CoinInput from '/components/ui/coin-input';
import SendersCoinInput from '../components/sendersCoinInput'
import TransactionInfo from '/components/ui/transaction-info';
import { SwapIcon } from '/components/icons/swap-icon';
import Collapse from '/components/ui/collapse';
import ProfileSearchSelect from '/components/ui/ProfileSearchSelect';
import ProfileModalInput from '/components/ui/ProfileModalInput';



const SwapPage = () => {
    let [toggleCoin, setToggleCoin] = useState(false);
    let [reciver, setReciver] = useState("");
    let [userSlippage, setUserSlippage] = useState(5);
    return (<>
      <NextSeo title="Swap" description="Map3 - React Next Web3 NFT Crypto Dashboard Template"/>
      <PayAnonymousLayout>
        <div className="mb-5 border-b border-dashed border-gray-200 pb-5 dark:border-gray-800 xs:mb-7 xs:pb-6">
           {/* <Collapse label={`Set Reciver: ${reciver}`} initialOpen>  */}
                {/* <Collapse label={`Set Reciver: ${reciver}`}> 
                <ProfileSearchSelect onSelect={(value) => setReciver(value)}/>
                </Collapse> */}
                {/* <ProfileModalInput onSelect={(value) => setReciver(value)}/> */}

                <ProfileModalInput label={`Set Reciver: ${reciver}`} 
                getCoinValue={(value) => {
                console.log('Reciver value:', value)
                setReciver(value)
                }}
                />
              
          
          <div className={cn('relative flex gap-3', toggleCoin ? 'flex-col-reverse' : 'flex-col')}>
            <CoinInput label={'From'} exchangeRate={0.0} defaultCoinIndex={0} getCoinValue={(data) => console.log('From coin value:', data)}/>
            <div className="absolute top-1/2 left-1/2 z-[1] -mt-4 -ml-4 rounded-full bg-white shadow-large dark:bg-gray-600">
              <Button size="mini" color="gray" shape="circle" variant="transparent" onClick={() => setToggleCoin(!toggleCoin)}>
                <SwapIcon className="h-auto w-3"/>
              </Button>
            </div>
            <SendersCoinInput label={'Senders Token'} exchangeRate={0.0} defaultCoinIndex={1} getCoinValue={(data) => console.log('To coin value:', data)}/>
          </div>
        </div>
                
        <div className="flex flex-col gap-4 xs:gap-[18px]">
              
        {/* <Collapse label={`Transaction Details`} initialOpen>  */}
        <Collapse label={`Transaction Details`}> 
        <div className="flex flex-col gap-4 xs:gap-[18px] p-3">
                    {/* UPDATE SLIPPPAGE */}
                  <TransactionInfo label={'Rate'}/>
                  <TransactionInfo label={'Network Fee'}/>
                  <TransactionInfo label={'Price Slippage'} value={`${userSlippage}%`}/> 
                  <div className="p-2 ">
                  <Slider  min={0} max={100} value={userSlippage}  onChange={(value) => setUserSlippage(value)}/>
                  </div>
                  </div>
          </Collapse>
         
        </div>
        <Button size="large" shape="rounded" fullWidth={true} className="mt-6 uppercase xs:mt-8 xs:tracking-widest">
          SEND
        </Button>
      </PayAnonymousLayout>
    </>);
};
export default SwapPage;


// <Collapse label="Collection" initialOpen>
// <CollectionSelect onSelect={(value) => console.log(value)}/>
// <ProfileSearchSelect onSelect={(value) => console.log(value)}/>
// </Collapse>