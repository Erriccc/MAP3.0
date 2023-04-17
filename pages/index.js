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

import SearchButton from '/components/search/button';
import { useDrawer } from '/components/drawer-views/context';

import {mapDataRelayer} from '/Utilities/FrontEndUtilities/FEmapDataRelayer'

export default function Rentals () {
// This page shows the results of the search
  const router = useRouter();
  const { address,isConnected,setCurrentUser, currentUser, provider,balance, connectToWallet, disconnectWallet } = useContext(WalletContext);

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

  const map3Querry = "*";
  const { openDrawer } = useDrawer();

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
    
      {mapDataState.showDataFromServer && 

              <div className=" ">
              <div className="w-full  shrink-0 flex-col ">
                  <div className="w-full p-6 bottom-0">
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