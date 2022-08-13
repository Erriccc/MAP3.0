import React from "react";
import Link from "next/link";
import {useState, useEffect, usemap3Querry} from "react"
import { useRouter } from "next/dist/client/router";
import { Button, Icon, useNotification } from "web3uikit";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import VendorsMap from "components/VendorsMap";
import vendorsData from "constants/testdata.json"
import { NextSeo } from 'next-seo';
import VendorSlider from '/components/ui/vendorCard';
import VerticalVendorSlider from '/components/ui/verticalVendorCard';
import Hamburger from '/components/ui/hamburger';
import SearchButton from '/components/search/button';
import { useDrawer } from '/components/drawer-views/context';



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

  const { openDrawer } = useDrawer();
    let [isOpen, setIsOpen] = useState(false);


// import { useIsMounted } from 'lib/hooks/use-is-mounted';
// import { useWindowScroll } from 'lib/hooks/use-window-scroll';
// const isMounted = useIsMounted();
// let windowScroll = useWindowScroll();
// ${isMounted && windowScroll.y > 10? : }



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

      {map3Querry &&

<div className=" ">

<nav className={`fixed top-0 z-40 right-0`}
            >
      <div className="flex px-4 sm:px-6 lg:px-8 xl:px-10 3xl:px-12">

        <div className="flex flex-col  items content-end mt-12">
            <div className="m-2 rounded-full bg-gradient-to-b from-gray-50 to-gray-100 shadow-card backdrop-blur dark:from-dark dark:to-dark/80">
              <SearchButton variant="transparent" className="dark:text-white"/>
            </div>
            <div className="m-2 rounded-full bg-gradient-to-b from-gray-50 to-gray-100 shadow-card backdrop-blur dark:from-dark dark:to-dark/80">
              <Hamburger isOpen={isOpen} onClick={() => openDrawer('DASHBOARD_SIDEBAR')} variant="transparent" className="dark:text-white "/>
          </div>
        </div>
      </div>
    </nav>
<div className="w-full  shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">

      <div className="ml-5 absolute overflow-y-auto h-full py-10 px-3 z-40 left-0 hidden sm:block shrink-0  w-64  3xl:w-96  ">
            <VerticalVendorSlider  className="" vendorsData={vendorsData}/>
        </div>

        <div className="grow pt-6 pb-9">

          <div className="flex justify-center w-full sm:ltr:pr-6 sm:rtl:pl-6  rounded-lg  bg-white p-6 shadow-card dark:bg-light-dark ">
              <VendorsMap locations={coOrdinates} setHighLight={setHighLight} />
            </div>
        </div>
        <div className="z-40 absolute w-full p-6 bottom-0 sm:hidden">
            <VendorSlider  className="" vendorsData={vendorsData}/>
        </div>
</div>

</div>
          }
     </>
  );
};


