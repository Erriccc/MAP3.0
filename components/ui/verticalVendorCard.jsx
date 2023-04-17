import Image from '/components/ui/image';
import { ArrowUp } from '/components/icons/arrow-up';
// import { Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {useState, useEffect, useLocation} from "react"
import { useRouter } from "next/dist/client/router";
import {getTokenSymbol} from'../../Utilities/utils';
import ParamTab, { TabPanel } from '/components/ui/param-tab';
import Scrollbar from '/components/ui/scrollbar';

import cn from 'classnames';
import AnchorLink from '/components/ui/links/anchor-link';
export  function VendorCollectionCard({ walletAddress, name, vendorsToken, imgUrl,description, className = '' }) {

  const [vendorsTokenSymbol,setVendorsTokenSymbol] = useState("ETH")

      useEffect(() => {
        (async () => {
            const vendtoTokenSymbol = await getTokenSymbol(vendorsToken)
            console.log("running vendtoTokenSymbol", vendtoTokenSymbol)
        setVendorsTokenSymbol(vendtoTokenSymbol)
        })();
      }, []);


    return (
    <div className={cn('  overflow-hidden rounded-lg ', className)}>
      
      <div className="bg-cover bg-center" 
      // style="background-image: url(...)"
      style={{ backgroundImage:`url(${imgUrl})`,
      width: '100%',
      height: '100%',
    }}
      >
      
      <div className=" flex h-full w-full flex-col justify-between bg-gradient-to-t from-black p-5 md:p-6">
        <AnchorLink 
        href = {{
          pathname: '/pay/[walletAddress]',
          query: {
              walletAddress: walletAddress
          },
        }}

        // className=" h-full w-full"
        />
        {imgUrl && (
              <img className="h-12 w-12  p-1 rounded-lg ring-4 ring-gray-300 dark:ring-gray-500" 
              src = {imgUrl}
              alt="name"
              />
                )}
        <div className="pt-5">
          
          <div className="mb-1.5 text-lg font-medium -tracking-wider text-white">
            {name}
          </div>
          <AnchorLink 
        href = {{
          pathname: '/pay/[walletAddress]',
          query: {
              walletAddress: walletAddress
          },
        }}
          className="relative mt-3.5 inline-flex items-center rounded-3xl bg-white/20 p-2 backdrop-blur-[40px]">
             <div className="truncate text-sm -tracking-wide text-white ltr:ml-2 ltr:pr-2 rtl:mr-2 rtl:pl-2">
              {vendorsTokenSymbol}
            </div>
          </AnchorLink>


          
        </div>
      </div>
    </div>
    </div>
    );
}
 
export default function VerticalVendorSlider({ vendorsData }) {
    return (
    
    // <div>
      <Scrollbar style={{ height: 'calc(100% - 1px)' }}>
     
      <div className="grid gap-x-2 gap-y-3 grid-cols-1 xl:gap-x-5 xl:gap-y-5 4xl:grid-cols-2">
      {/* <div className=" flex  sm:flex-col p-4"> */}
      {/* <div className={`grid gap-x-2 gap-y-3 grid-cols-1 grid-rows-${vendorsData.length} p-2 `}> */}

        {vendorsData.map((vendor) => (
            <VendorCollectionCard id={vendor.walletAddress} name={vendor.name} 
            walletAddress={vendor.vendorsWalletAddress}
            vendorsToken={vendor.vendorsToken}
             imgUrl={vendor.vendorsImageUrl} 
             description={vendor.vendorsBio}
             key={vendor.vendorsWalletAddress}
             
            />

          ))}
      </div>
      </Scrollbar>

    // {/* </div> */}
    );//
}

//   key={walletAddress}
//    name={name}
//    city={city}
//    imgUrl={imgUrl}
//    description={description}
//    distance={distance}
//    walletAddress={walletAddress}
//    vendorsToken={vendorsToken}
//   //  vendorsTokenSymbol={vendorsTokenSymbol}