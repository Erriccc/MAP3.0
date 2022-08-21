import React from "react";
import Link from "next/link";
import {useState, useEffect, usemap3Querry} from "react"
import { useRouter } from "next/dist/client/router";
import { Button, Icon, useNotification } from "web3uikit";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import VendorsMap from "components/VendorsMap";
import SearchVendorInfo from "components/SearchVendorInfo";
import vendorsData from "constants/testdata.json"
import DashboardLayout from 'layouts/_dashboard';
import { NextSeo } from 'next-seo';
import VendorSlider from '/components/ui/vendorCard';
import { coinSlideData } from 'data/static/coin-slide-data';


export default function Rentals () {
// This page shows the results of the search

// Here we access the map3Querry filter set from the nav search.
// we intend to use this data to querry our database and build the front end for vendors that match that critariea
  const router = useRouter();
  const [highLight, setHighLight] = useState();
  const { Moralis, account } = useMoralis();

  // REMEMBER NOT TO DELETE, THIS IS HOW YOU SET VENDORS LIST STATE
  
  // const [vendorsList, setvendorsList] = useState(); 
  
  // REMEMBER NOT TO DELETE, THIS IS HOW YOU SET VENDORS LIST STATE

  const [coOrdinates, setCoOrdinates] = useState([]);
  const contractProcessor = useWeb3ExecuteFunction();
  const dispatch = useNotification();
  const { map3Querry} = router.query;

  console.log(map3Querry);

  const handleSuccess= () => {
    dispatch({
      type: "success",
      // message: `Nice! Your Transaction was succesful ${map3Querry.destination}!!`,
      message: `Nice! Your Transaction was succesful!!`,
      title: "Booking Succesful",
      position: "topL",
    });
  };

  const handleError= (msg) => {
    dispatch({
      type: "error",
      message: `${msg}`,
      title: "Booking Failed",
      position: "topL",
    });
  };

  const handleNoAccount= () => {
    dispatch({
      type: "error",
      message: `You need to connect your wallet to book a rental`,
      title: "Not Connected",
      position: "topL",
    });
  };



  return (
    <>
    <NextSeo title="Map of Vendors" description="Map3 - find vendors that accept crypto near you"/>
    <DashboardLayout>
      {map3Querry &&

            //  // display search results
                  <div className="flex flex-col	">
                  <div className="mb-4 w-full sm:mb-0 sm:w-4/5 sm:ltr:pr-6 sm:rtl:pl-6 ">
                    {/* <VendorSlider coins={coinSlideData}/> */}
                    <VendorSlider vendorsData={vendorsData}/>
                  </div>


                  {/*  NOTE DO NOT CHANGE THIS LINE OR MAP UI WILL CHANGE  */}

                  <section className="hidden xl:inline-flex xl:min-w-[600px]">
          {/* <Map searchResults={searchResults} /> */}
          <VendorsMap locations={coOrdinates} setHighLight={setHighLight} /> 

        </section>
                  {/* <div className="flex justify-center sm:w-4/5 sm:ltr:pr-6 sm:rtl:pl-6  rounded-lg  bg-white p-6 shadow-card dark:bg-light-dark sm:p-8 "> */}
                    {/* Note this is where the map3Querrys variable comes from */}
                    {/* <VendorsMap locations={coOrdinates} setHighLight={setHighLight} />  */}
                  {/* </div> */}
                </div>
          }
     {/* </div> */}
     </DashboardLayout>
     </>
  );
};
