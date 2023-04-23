import React from "react";
import Link from "next/link";
import {useState, useEffect, useLayoutEffect, useReducer,useContext} from "react"
import { useRouter } from "next/dist/client/router";
import { toast } from 'react-toastify';
import { WalletContext } from 'lib/hooks/use-connect';
import DashboardLayout from 'layouts/_dashboard';

import { NextSeo } from 'next-seo';
import VendorSlider from '/components/ui/vendorCard';
import VerticalVendorSlider from '/components/ui/verticalVendorCard';
import LoadingSkeleton from '/components/ui/LoadingSkeleton';
import Hamburger from '/components/ui/hamburger';
import FilterExploreButton from '/components/ui/FilterExploreButton';
import LoadingView from '/components/ui/LoadingView';
import { SearchIcon } from '/components/icons/search';

import SearchButton from '/components/search/button';
import { useDrawer } from '/components/drawer-views/context';

import {mapDataRelayer} from '/Utilities/FrontEndUtilities/FEmapDataRelayer'
import {
  PlasmicComponent
} from '@plasmicapp/loader-nextjs';

export default function Rentals () {
// This page shows the results of the search
  const router = useRouter();
  const { address,isConnected,setCurrentUser, currentUser, provider,balance, connectToWallet, disconnectWallet } = useContext(WalletContext);

  // REMEMBER NOT TO DELETE, THIS IS HOW YOU SET VENDORS LIST STATE
  let [tempDataInfo, setTempDataInfo] = useState([]);
  const [mapDataState, dispatchather] = useReducer(reducer,{dataFromServer:[],showDataFromServer: false, loadingInfo: true, FoundInfo: false });
  const [displayData, setDisplayData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

function reducer(mapDataState, action){
  
    switch (action.type) {
      case "SHOW":
        return {dataFromServer: tempDataInfo, showDataFromServer: true, loadingInfo: false, FoundInfo: false}
      case "FOUND":
        return {dataFromServer:tempDataInfo, showDataFromServer: false, loadingInfo: false, FoundInfo: true}
      case "HIDE":
          return {dataFromServer: {}, showDataFromServer: false, loadingInfo: false, FoundInfo: false}
      default:
        return mapDataState

    }
}

  const map3Querry = "*";
  const { openDrawer } = useDrawer();

  function search() {
    if (!searchInput) return;

    // add more search filters here. rember to declare them as usestate first
    router.push({
      pathname: "/appvendors",
      query: {
        // location: searchInput, // Note location was changed to map3Querry
        map3Querry: searchInput // SET as Many filters as you want from here

      },
    });
console.log("this got here")
// setSearchInput("");
}



useEffect(() => {
  
    console.log("running useeffect to fetch search data",)
  //  if(mapDataState.loadingInfo){
    const userSearchInput = {string:map3Querry};
    
    (async()=> {
      let tempData = await mapDataRelayer(userSearchInput)
      if(await tempData == undefined){
        return
      }else{
        console.log("tempData...", await tempData)
        // setDataFromServer(tempData)
      setTempDataInfo(tempData)
      // setDisplayData(tempData)
      dispatchather({type:"FOUND"})
      console.log('done transfering')
      }
      
    })();
  }, [address,isConnected]); // Note we are running the use effect every time we recieve a new search filter


  useEffect(()  => {
    if(mapDataState.FoundInfo){
      console.log("testing values...", mapDataState.dataFromServer)
      console.log('testing value of tempDataInfo', tempDataInfo)
      console.log('tempDataInfo.length', tempDataInfo.length)
      if(tempDataInfo.length < 1){
        openDrawer('PROFILES_DRAWER')
        // router.push({
        //   pathname: '/ProfileSearchFilters',
         
        // })
        toast.warning('vendor not found! please refine your search')

      }
      dispatchather({type:"SHOW"})
    }else{
      console.log('skipping SHOW state')
      return
    }
      }, [tempDataInfo])


  return (
    <>
    <NextSeo title="map of crypto friendly Vendors" description="Map3 - find vendors that accept crypto near you"/>
    <DashboardLayout>
              
{/* <PlasmicComponent component='LandingPageIntro' /> */}

<PlasmicComponent
  component="LandingPageIntro"
  componentProps={{
    landingPageLearnMore: {
      render: () => ( <label className="flex w-full items-center">
      <input className="h-12 w-full appearance-none rounded-full border-2 border-gray-200 py-1 text-sm tracking-tighter text-gray-900 outline-none transition-all placeholder:text-gray-600 focus:border-gray-900 ltr:pr-5 ltr:pl-11 rtl:pl-5 rtl:pr-11 dark:border-gray-600 dark:bg-light-dark dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500 sm:ltr:pl-14 sm:rtl:pr-14 xl:ltr:pl-16 xl:rtl:pr-16" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && search()} placeholder={'Search...'} autoFocus={true}  autoComplete="on"/>
      <span className="pointer-events-none absolute flex h-full w-10 cursor-pointer items-center justify-center text-gray-600 hover:text-gray-900 ltr:left-0 ltr:pl-2 rtl:right-0 rtl:pr-2 dark:text-white sm:w-14 sm:ltr:pl-3 sm:rtl:pr-3 xl:w-16" onClick={search} >
        <SearchIcon className="h-4 w-4"/> 
        {/* search */}
      </span>
    </label>)
    }
  }}
/>



    {/* <PlasmicClaimPage
              imNotArtNav={{
                imNotArtNavLogo:{href:AppSetup.webRoute}
              }}
              claimButton={{ 
                canClaim:owner===undefined,
                onClick:() => {ClaimNow(nft.tagUid)}
              }}
              commingSoonOrRegisterWallet={{
                connectedAddress:owner&&owner,
                walletConnected:!(owner===undefined),
                registerWalletButton:{
                  ownerInfo:!(owner===undefined),
                  onClick:() => {linkSetup()}
                }
              }}
              uid={{uIdInput:nft.tagUid}}
            /> */}
  {mapDataState.showDataFromServer && 
                        <div className=" ">
                        <div className="w-full flex-col ">
                            <div className="w-full p-6">
                                <VendorSlider  className="" vendorsData={mapDataState?.dataFromServer && mapDataState.dataFromServer}/>
                            </div>
                    </div>
                    </div>
                    }
          {mapDataState.loadingInfo &&
          // <LoadingSkeleton/>
          <LoadingView/>

          }

    </DashboardLayout>

     </>
  );
};