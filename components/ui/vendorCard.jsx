import Image from '/components/ui/image';
import { ArrowUp } from '/components/icons/arrow-up';
import { Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {useState, useEffect, useLocation} from "react"
import { useRouter } from "next/dist/client/router";
import {getTokenSymbol} from'../../Utilities/utils';

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


    return (<div className={cn('group relative overflow-hidden rounded-lg transition-transform hover:-translate-y-1', className)}>
      <div className="relative flex aspect-[6/4] w-full justify-center overflow-hidden rounded-lg">
        <Image 
        src={`/api/imagefetcher?url=${encodeURIComponent(
          imgUrl
        )}`}
        layout="fill" quality={100} objectFit="cover" alt={name}/>
      </div>
      <div className="absolute top-0 left-0 z-[5] flex h-full w-full flex-col justify-between bg-gradient-to-t from-black p-5 md:p-6">
        <AnchorLink 
        href={`/pay/${walletAddress}?vendorsToken=${vendorsToken}?vendorsName=${name}&vendorsTokenSymbol=${vendorsTokenSymbol}`}
        className="absolute top-0 left-0 z-10 h-full w-full"/>
        <div className="flex justify-between gap-3">
          <div className="inline-flex h-8 shrink-0 items-center rounded-2xl bg-white/20 px-4 text-xs font-medium uppercase -tracking-wide text-white
          backdrop-blur-[40px]">
            {/* {vendorsTokenSymbol} */}
            VENDOR or Non-Vendor ?
          </div>
          {imgUrl && (<div className="h-16 w-16 rounded-lg bg-white/20 p-2 backdrop-blur-[40px]">
              <Image 
              src={`/api/imagefetcher?url=${encodeURIComponent(
                imgUrl
              )}`}

              alt={name} width={48} height={48} className="rounded-[6px]"/>
            </div>)}
        </div>
        <div className="block">
          <h2 className="mb-1.5 truncate text-lg font-medium -tracking-wider text-white">
            {name}
          </h2>
          <div className="text-sm font-medium -tracking-wide text-[#B6AAA2]">
            {description}
          </div>
          <AnchorLink 
        href={`/pay/${walletAddress}?vendorsToken=${vendorsToken}?vendorsName=${name}&vendorsTokenSymbol=${vendorsTokenSymbol}`}
          className="relative z-10 mt-3.5 inline-flex items-center rounded-3xl bg-white/20 p-2 backdrop-blur-[40px]">
            <div className="flex shrink-0 items-center">
            </div>

            <div className="truncate text-sm -tracking-wide text-white ltr:ml-2 ltr:pr-2 rtl:mr-2 rtl:pl-2">
              {vendorsTokenSymbol}
            </div>
          </AnchorLink>
        </div>
      </div>
    </div>);
}









// <div className="flex shrink-0 items-center">
// <Image 
// //@ts-ignore
// // src={imgUrl} 
// src={`/api/imagefetcher?url=${encodeURIComponent(
// imgUrl
// )}`}
// alt={name} width={24} height={24} className="rounded-full"/>
// </div>

// <div className="truncate text-sm -tracking-wide text-white ltr:ml-2 ltr:pr-2 rtl:mr-2 rtl:pl-2">
// {vendorsTokenSymbol}
// </div>




export default function VendorSlider({ vendorsData }) {
    const sliderBreakPoints = {
        768: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1080: {
            slidesPerView: 3,
            spaceBetween: 24,
        },
        1280: {
            slidesPerView: 2,
            spaceBetween: 24,
        },
        1700: {
            slidesPerView: 3,
            spaceBetween: 24,
        },
        2200: {
            slidesPerView: 4,
            spaceBetween: 24,
        },
    };
    return (<div>
      <Swiper modules={[Scrollbar, A11y]} spaceBetween={24} slidesPerView={1} scrollbar={{ draggable: true }} breakpoints={sliderBreakPoints} observer={true} dir="ltr">
        {vendorsData.map((vendor) => (<SwiperSlide key={vendor.walletAddress}>
          <div className=''>
            
            <VendorCollectionCard id={vendor.walletAddress} name={vendor.name} 
            walletAddress={vendor.walletAddress}
            vendorsToken={vendor.vendorsToken}
             imgUrl={vendor.imgUrl} 
             description={vendor.description}
             
            />
            </div>
          </SwiperSlide>))}
      </Swiper>
    </div>);//
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