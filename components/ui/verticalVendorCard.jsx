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
    <div className={cn(' relative overflow-hidden rounded-lg transition-transform hover:-translate-y-1', className)}>
      {/* <div className="relative flex aspect-[8/11] w-full justify-center overflow-hidden rounded-lg"> */}
      <div className="relative flex aspect-[10/12] w-full justify-center overflow-hidden rounded-lg">
        <Image 
        src={`/api/imagefetcher?url=${encodeURIComponent(
          imgUrl
        )}`}
        layout="fill" quality={100} objectFit="cover" alt={name}/>
      </div>
      <div className="absolute top-0 left-0 z-[5] flex h-full w-full flex-col justify-between bg-gradient-to-t from-black p-5 md:p-6">
        <AnchorLink 
        href = {{
          pathname: '/newPay/[walletAddress]',
          query: {
              walletAddress: walletAddress
          },
        }}

        className="absolute top-0 left-0 z-10 h-full w-full"/>
        <div className="flex justify-between gap-2">
          {imgUrl && (<div className="h-12 w-12 rounded-lg bg-white/20 p-2 backdrop-blur-[40px]">
              <Image 
              src={`/api/imagefetcher?url=${encodeURIComponent(
                imgUrl
              )}`}

              alt={name} width={48} height={48} className="rounded-[6px]"/>
            </div>)}
        </div>
        <div className="">
          <div className="mb-1.5 text-lg font-medium -tracking-wider text-white">
            {name}
          </div>
          <AnchorLink 

        href = {{
          pathname: '/newPay/[walletAddress]',
          query: {
              walletAddress: walletAddress
          },

        }}
          className="relative z-10 mt-3.5 inline-flex items-center rounded-3xl bg-white/20 p-2 backdrop-blur-[40px]">
             <div className="truncate text-sm -tracking-wide text-white ltr:ml-2 ltr:pr-2 rtl:mr-2 rtl:pl-2">
              {vendorsTokenSymbol}
            </div>
          </AnchorLink>


          
        </div>
      </div>
    </div>);
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
            walletAddress={vendor.walletAddress}
            vendorsToken={vendor.vendorsToken}
             imgUrl={vendor.imgUrl} 
             description={vendor.description}
             key={vendor.walletAddress}
             
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