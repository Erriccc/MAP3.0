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
      position: "bottomR",
    });
  };

  const handleError= (msg) => {
    dispatch({
      type: "error",
      message: `${msg}`,
      title: "Booking Failed",
      position: "bottomR",
    });
  };

  const handleNoAccount= () => {
    dispatch({
      type: "error",
      message: `You need to connect your wallet to book a rental`,
      title: "Not Connected",
      position: "bottomR",
    });
  };


  // useEffect(() => {
  //   async function fetchvendorsList() {
  //     // // const Rentals = Moralis.Object.extend("Vendors"); // Vendors should be the name of our class in the database 
  //     // const Vendors = Moralis.Object.extend("Vendors"); // Vendors should be the name of our class in the database 
  //     // const query = new Moralis.Query(Vendors);
  //     // // const query = new Moralis.Query(Rentals);
  //     // query.equalTo("city", map3Querry);
  //     // // query.greaterThanOrEqualTo("maxGuests_decimal", map3Querry.guests);
  //     // const result = await query.find();

  //     let cords = [];
  //     vendorsList.forEach((e) => {
  //       // result.forEach((e) => {
  //       cords.push({ lat: e.attributes.lat, lng: e.attributes.long });
  //     });

  //     // // Note we have to uncomment the vendors list when we go live on the database
  //     setCoOrdinates(cords);
  //     // setvendorsList(result);
  //     setvendorsList(StaticvendorsList);
  //     console.log('This is the setvendors function, I run everytime you search')
  //   }

  //   fetchvendorsList();
  // }, [map3Querry]); // Note we are running the use effect every time we recieve a new search filter

  return (
    <>
    <NextSeo title="Map of Vendors" description="Map3 - find vendors that accept crypto near you"/>
    <DashboardLayout>
    {/* <div className=" mx-auto relative al m-2"> */}

        
        {/* <div className="xl:overflow-y-auto xl:max-h-screen xl:h-full">  */}
        {/* {vendorsData.map((
          { name,city, walletAddress,imgUrl,distance,description,vendorsToken}) => (
        <SearchVendorInfo

        key={walletAddress}
         name={name}
         city={city}
         imgUrl={imgUrl}
         description={description}
         distance={distance}
         walletAddress={walletAddress}
         vendorsToken={vendorsToken}
        //  vendorsTokenSymbol={vendorsTokenSymbol}

         />
              )
            )} */}
            {/* </div>
          <div/>
      </div> */}
               
      {map3Querry &&

            //  // display search results
                  <div className="flex flex-col	">
                     {/* <div className="flex">
                      <h1 className="text-3xl font-semibold mt-2 mb-6 text-blue-500">Map</h1>
                      <span className="text-lg font-semibold my-auto">3.0</span>
                      <h1 className="text-3xl font-semibold mx-1 px-1 mt-2 mb-6 text-[#64748b]">results for {map3Querry} </h1>
                    </div> */}
                
                  
                  

                  <div className="mb-4 w-full sm:mb-0 sm:w-4/5 sm:ltr:pr-6 sm:rtl:pl-6 ">
                    {/* <VendorSlider coins={coinSlideData}/> */}
                    <VendorSlider vendorsData={vendorsData}/>
                  </div>


                  {/*  NOTE DO NOT CHANGE THIS LINE OR MAP UI WILL CHANGE  */}
                  <div className="flex justify-center sm:w-4/5 sm:ltr:pr-6 sm:rtl:pl-6  rounded-lg  bg-white p-6 shadow-card dark:bg-light-dark sm:p-8 ">
                    {/* Note this is where the map3Querrys variable comes from */}
                    <VendorsMap locations={coOrdinates} setHighLight={setHighLight} /> 
                  </div>
                </div>
          }
     {/* </div> */}
     </DashboardLayout>
     </>
  );
};

