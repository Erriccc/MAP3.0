import React from "react";
import Link from "next/link";
import {useState, useEffect, useLayoutEffect, useReducer} from "react"
import { useRouter } from "next/dist/client/router";
import { toast } from 'react-toastify';

import VendorsMap from "components/VendorsMap";
import { NextSeo } from 'next-seo';
import VendorSlider from '/components/ui/vendorCard';
import VerticalVendorSlider from '/components/ui/verticalVendorCard';
import LoadingSkeleton from '/components/ui/LoadingSkeleton';
import Hamburger from '/components/ui/hamburger';
import FilterExploreButton from '/components/ui/FilterExploreButton';
import LoadingView from '/components/ui/LoadingView';

import SearchButton from '/components/search/button';
import { useDrawer } from '/components/drawer-views/context';

import {mapDataRelayer} from '/Utilities/FrontEndUtilities/FEmapDataRelayer'

export default function Rentals () {
// This page shows the results of the search
  const router = useRouter();

  // REMEMBER NOT TO DELETE, THIS IS HOW YOU SET VENDORS LIST STATE
  let [tempDataInfo, setTempDataInfo] = useState([]);
  const [mapDataState, dispatchather] = useReducer(reducer,{dataFromServer:[],showDataFromServer: false, loadingInfo: true, FoundInfo: false });
  const [displayData, setDisplayData] = useState([]);

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

  const { map3Querry} = router.query;
  const { openDrawer } = useDrawer();
    let [isOpen, setIsOpen] = useState(false);
    let [isOpen2, setIsOpen2] = useState(false);


// import { useIsMounted } from 'lib/hooks/use-is-mounted';
// import { useWindowScroll } from 'lib/hooks/use-window-scroll';
// const isMounted = useIsMounted();
// let windowScroll = useWindowScroll();
// ${isMounted && windowScroll.y > 10? : }



useEffect(() => {
  // useLayoutEffect(() => {


{map3Querry &&
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
      setDisplayData(tempData)
      dispatchather({type:"FOUND"})
      console.log('done transfering')
      }
      
    })();
}
  }, [map3Querry]); // Note we are running the use effect every time we recieve a new search filter


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
    
      {mapDataState.showDataFromServer && 

              <div className=" ">

              <nav className={`fixed top-12 z-10 right-0`}
                          >
                    <div className="flex px-4 sm:px-6 lg:px-8 xl:px-10 3xl:px-12">

                      <div className="flex flex-col  items content-end mt-5 ">
                          <div className="m-2 rounded-full bg-gradient-to-b from-gray-50 to-gray-100 shadow-card backdrop-blur dark:from-dark dark:to-dark/80">
                            <SearchButton variant="transparent" className="dark:text-white"/>
                          </div>
                          <div className="m-2 rounded-full bg-gradient-to-b from-gray-50 to-gray-100 shadow-card backdrop-blur dark:from-dark dark:to-dark/80">
                            <Hamburger isOpen={isOpen} onClick={() => openDrawer('MOBILE_DASHBOARD_SIDEBAR')} variant="transparent" className="dark:text-white "/>
                        </div>

                        <div className="mx-auto my-3 cursor-pointer rounded-full shadow-card backdrop-blur ">
                            <FilterExploreButton onClick={() => openDrawer('PROFILES_DRAWER')} variant="transparent" className="text-white"/>
                        </div>
                      </div>
                    </div>
                  </nav>
              <div className="w-full  shrink-0 flex-col ">

                <div className="ml-5 absolute overflow-y-auto h-full py-10 px-3 z-10 left-0 hidden sm:block shrink-0  w-64  3xl:w-96  ">
                      <VerticalVendorSlider  className="" vendorsData={displayData}/>
                  </div>

                  {/* <div className="grow pt-6 pb-9"> */}

                      <div className="flex justify-center w-full  rounded-lg  bg-white shadow-card dark:bg-light-dark ">
                        {/* <VendorsMap locations={coOrdinates} setHighLight={setHighLight} /> */}
                        <VendorsMap searchResults={mapDataState.dataFromServer}  setDisplayData={setDisplayData} />
                      </div>
                  {/* </div> */}
                  <div className="z-10 absolute w-full p-6 bottom-0 sm:hidden">
                      <VendorSlider  className="" vendorsData={displayData}/>
                  </div>
          </div>

          </div>
          }
     

          {mapDataState.loadingInfo &&
          // <LoadingSkeleton/>
          <LoadingView/>

          }
     </>
  );
};