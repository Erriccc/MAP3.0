import Image from '/components/ui/image';
import { ArrowUp } from '/components/icons/arrow-up';
import { Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from "swiper";
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


    return (
    <div >
      <div className="bg-cover bg-center" 
      // style="background-image: url(...)"
      style={{ backgroundImage:`url(${imgUrl})`,
      width: '100%',
      height: '100%',
    }}
      >
          <div className="relative flex h-full w-full flex-col justify-between bg-gradient-to-t from-black p-5 md:p-6">

<AnchorLink 
            href = {{
              pathname: '/pay/[walletAddress]',
              query: {
                  walletAddress: walletAddress
              },
            }}
            >
          {imgUrl && (
              <img className="h-12 w-12  p-1 rounded-lg ring-2 ring-gray-300 dark:ring-gray-500" 
              src = {imgUrl}
              alt="name"
              />
                )}
          <div className="p-4">
              <h2 className="truncate text-lg font-medium -tracking-wider text-white">
                {name}
              </h2>
               
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

          </AnchorLink>
          </div>
          </div>

    {/* <div className={cn('group relative overflow-hidden rounded-lg transition-transform hover:-translate-y-1', className)}> */}
        
    </div>);
}

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
            slidesPerView: 3,
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
      <Swiper 
      modules={[Autoplay,Pagination, Navigation, Scrollbar, A11y]} 
      spaceBetween={10} slidesPerView={2} 
      scrollbar={{ draggable: true }} 
      breakpoints={sliderBreakPoints} 
      observer={true} dir="ltr"
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      
      
      
      >
        {vendorsData.map((vendor) => (
        
        <SwiperSlide key={vendor.vendorsWalletAddress}>
          <div className=''>
            
            <VendorCollectionCard id={vendor.vendorsWalletAddress} name={vendor.vendorsName} 
            walletAddress={vendor.vendorsWalletAddress}
            vendorsToken={vendor.vendorsToken}
             imgUrl={vendor.vendorsImageUrl} 
             description={vendor.vendorsBio}
             
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