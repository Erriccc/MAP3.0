import { NextSeo } from 'next-seo';
import TradeLayout from 'layouts/_trade-layout';
import Button from '/components/ui/button';
import CoinInput from '/components/ui/coin-input';
import TransactionInfo from '/components/ui/transaction-info';
import { Plus } from '/components/icons/plus';
import ActiveLink from '/components/ui/links/active-link';
import { SwapIcon } from '/components/icons/swap-icon';

const LiquidityPage = () => {
    return (<>
      <NextSeo title="Liquidity" description="Map3 - Find vendors that accept any crypto"/>
      <TradeLayout>
        <div className="mb-5 border-b border-dashed border-gray-200 pb-5 dark:border-gray-800 xs:mb-7 xs:pb-6">
          <div className="relative flex flex-col gap-3">
            <CoinInput label={'From'} exchangeRate={0.0} defaultCoinIndex={0} getCoinValue={(data) => console.log('From coin value:', data)}/>
            <div className="absolute top-1/2 left-1/2 z-[1] -mt-4 -ml-4 rounded-full bg-white shadow-large dark:bg-gray-600">
              <Button size="mini" color="gray" shape="circle" variant="transparent">
                {/* <Plus className="h-auto w-3"/> */}
                <SwapIcon className="h-auto w-3"/>

              </Button>
            </div>
            <CoinInput label={'To'} exchangeRate={0.0} defaultCoinIndex={1} getCoinValue={(data) => console.log('To coin value:', data)}/>
          </div>
        </div>
        <div className="flex flex-col gap-4 xs:gap-[18px]">
          <TransactionInfo label={'13.77 eth per btc'} value={'0%'}/>
          <TransactionInfo label={'0.072631 Btc per ETH'} value={'Share of Pool'}/>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-2.5 xs:mt-8">
          <ActiveLink href="/liquidity-position">
            <Button size="large" shape="rounded" fullWidth={true} className="uppercase">
              Approve BTC
            </Button>
          </ActiveLink>
          <ActiveLink href="/liquidity-position">
            <Button size="large" shape="rounded" fullWidth={true} className="uppercase">
              Approve ETH
            </Button>
          </ActiveLink>
        </div>
      </TradeLayout>
    </>);
};
export default LiquidityPage;
