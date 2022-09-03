// import Image from 'next/image'
// import Link from 'next/link'
// import { useMoralis } from 'react-moralis'
// import Apphero from 'components/Apphero'
// import { useRouter } from "next/dist/client/router";
// import Router from 'next/router';
// import { ConnectButton, Icon, Select, Input, Button } from "web3uikit";
// import DashboardLayout from 'layouts/_dashboard';



// export default function Home() {


// // Router.push('/pay')

//   const router = useRouter()
//   const { Moralis, account } = useMoralis();

//   // // UNCOMMENT to AUTHENTICATE!!!!
//   // const {isAuthenticated} = useMoralis()
//   if (!account) {
//     return (
//       <Apphero/>
//     )
//   }

// if (process.browser){
//   router.push({
//     pathname: "/pay"
//   });
// }
//   // return (
    
//     // HOW TTO CONDITIONALY ADD CLASS OR STYLE
//     // className={`${active && 'text-blue-100'}`}


//     // <div className="">
//     //       <main className="">
//     //         <div>
//     //         Display Content about app and more information and instructionfa-spin
//     //         This Page should have its own nav, it is a one page app. 
//     //         <div>
//     //           Mini Navigation 
//     //         </div>
//     //         <div>Pay Anyone componnent</div>
//     //         <div>About Us</div>
//     //         <div>Maybe some blogs to describe app features</div>
//     //         </div>
//     //       </main>
//     // </div>
//     // )
// }











import { NextSeo } from 'next-seo';
import DashboardLayout from 'layouts/_dashboard';
import Image from '/components/ui/image';
import CoinSlider from '/components/ui/coin-card';

import VendorSlider from '/components/ui/vendorCard';
import OverviewChart from '/components/ui/overview-chart';
import LiquidityChart from '/components/ui/liquidity-chart';
import VolumeChart from '/components/ui/volume-chart';
import TopPools from '/components/ui/top-pools';
import { ChevronForward } from '/components/icons/chevron-forward';
import { Plus } from '/components/icons/plus';
import TransactionTable from '/components/transaction/transaction-table';
import TopCurrencyTable from '/components/top-currency/currency-table';
import { coinSlideData } from 'data/static/coin-slide-data';
//images
import AuthorImage from 'assets/images/author.jpg';
export const getStaticProps = async () => {
    return {
        props: {},
    };
};
const HomePage = () => {
    return (<>
      <NextSeo title="Map3 Home Page" description="Map3 - find crypto friendly businesses near you, and make crypto payments in your preferred currency."/>
      <DashboardLayout>
        <div className="flex flex-wrap">
          <div className="mb-8 w-full sm:mb-0 sm:w-1/2 sm:ltr:pr-6 sm:rtl:pl-6 md:w-[calc(100%-256px)] lg:w-[calc(100%-288px)] 2xl:w-[calc(100%-320px)] 3xl:w-[calc(100%-358px)]">
            <CoinSlider coins={coinSlideData}/>
          </div>

          {/* <div className="w-full sm:w-1/2 md:w-64 lg:w-72 2xl:w-80 3xl:w-[358px]">
            <div className="flex h-full flex-col justify-center rounded-lg bg-white p-6 shadow-card dark:bg-light-dark xl:p-8">
              <div className="relative mx-auto mb-6 h-20 w-20 shrink-0 overflow-hidden rounded-full border-4 border-white drop-shadow-main dark:border-gray-400 lg:h-24 lg:w-24">
                <Image src={AuthorImage} alt="Author" className="rounded-full" placeholder="blur" layout="fill" objectFit="cover"/>
              </div>
              <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
                VENDORS NAME
              </h3>
              <div className="mb-7 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
                $10,86,000
              </div>

              <button className="flex h-10 w-full items-center whitespace-nowrap rounded-lg border-2 border-dashed border-gray-500 bg-gray-100 px-6 text-sm uppercase tracking-wider text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white lg:h-12 3xl:h-13">
                <span className="mr-3.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white lg:h-6 lg:w-6">
                  <Plus className="lg:w-aut h-auto w-2.5"/>
                </span>
                <span className="mr-3.5 flex-grow text-justify text-xs lg:text-sm">
                  TRANSACT
                </span>
                <ChevronForward />
              </button>
            </div>
          </div> */}
          
        </div>

        <div className="mt-8 grid gap-6 sm:my-10 md:grid-cols-2">
          <LiquidityChart />
          <VolumeChart />
        </div>

        <div className="my-8 sm:my-10">
          <TopCurrencyTable />
        </div>

        <div className="flex flex-wrap">
          <div className="w-full lg:w-[calc(100%-288px)] ltr:lg:pr-6 rtl:lg:pl-6 2xl:w-[calc(100%-320px)] 3xl:w-[calc(100%-358px)]">
            <TransactionTable />
          </div>
          <div className="order-first mb-8 grid w-full grid-cols-1 gap-6 sm:mb-10 sm:grid-cols-2 lg:order-1 lg:mb-0 lg:flex lg:w-72 lg:flex-col 2xl:w-80 3xl:w-[358px]">
            <OverviewChart />
            <TopPools />
          </div>
        </div>
      </DashboardLayout>
    </>);
};
export default HomePage;
