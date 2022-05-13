import React from "react";
import Link from "next/link";
import {useState, useEffect, usemap3Querry} from "react"
import { useRouter } from "next/dist/client/router";
import { Button, Icon, useNotification } from "web3uikit";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import VendorsMap from "components/VendorsMap";
import SearchVendorInfo from "components/SearchVendorInfo";


export default function Rentals () {
// This page shows the results of the search

// Here we access the map3Querry filter set from the nav search.
// we intend to use this data to querry our database and build the front end for vendors that match that critariea
  const router = useRouter();
  const [highLight, setHighLight] = useState();
  const { Moralis, account } = useMoralis();

  // REMEMBER NOT TO DELETE THIS IS HOW YOU SET VENDORS LIST STATE
  
  // const [vendorsList, setvendorsList] = useState(); 
  
  // REMEMBER NOT TO DELETE THIS IS HOW YOU SET VENDORS LIST STATE

  const [coOrdinates, setCoOrdinates] = useState([]);
  const contractProcessor = useWeb3ExecuteFunction();
  const dispatch = useNotification();
  const { map3Querry} = router.query;

  console.log(map3Querry);

  const vendorsList = [
    {
      // attributes: {
        name: "Barber Shop on broadway",
        city: "New York",
        description: "fade trims lineup tapper dreads",
        imgUrl:
          "https://ipfs.moralis.io:2053/ipfs/QmS3gdXVcjM72JSGH82ZEvu4D7nS6sYhbi5YyCw8u8z4pE/media/3",
        lat: "40.716862",
        long: "-73.999005",
        walletAddress:"0xa9110224Df672c266569931F4e03f009651149E6",
        distance: "3", // distance from  you
        currency:"0xd9145CCE52D386f254917e481eB44e9943F39138", // display currency accepted It just joined the party

      // },
    },
    {
      // attributes: {
        name: "cofee Shop on division",
        city: "Chicago",
        description: "cofee latte expresso iced cofee",
        imgUrl:
          "https://ipfs.moralis.io:2053/ipfs/QmS3gdXVcjM72JSGH82ZEvu4D7nS6sYhbi5YyCw8u8z4pE/media/3",
        lat: "40.716862",
        long: "-60.999005",
        walletAddress:"0ya9110224Df672c266569931F4e03f009651149E6",
        distance: "4", // distance from  you
        currency:"0x9bF88fAe8CF8BaB76041c1db6467E7b37b977dD7",

      // },
    },
    {
      // attributes: {
        name: "Resturant on Georgia Avenue",
        city: "DC",
        description: "fries wings burgers burrito fast food",
        imgUrl:
          "https://ipfs.moralis.io:2053/ipfs/QmS3gdXVcjM72JSGH82ZEvu4D7nS6sYhbi5YyCw8u8z4pE/media/3",
        lat: "40.716862",
        long: "-70.999005",
        walletAddress:"0za9110224Df672c266569931F4e03f009651149E6",
        distance: "5", // distance from  you
        currency:"0x9bF88fAe8CF8BaB76041c1db6467E7b37b977dD7",
      // },
    },
  ];
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


  // This wwill be where we set our contract functions params and transactions like Pay
  // const bookRental = async function (start, end, id, dayPrice) { // This is where we need our own contract functions, params and abi
  //         for (
  //           var arr = [], dt = new Date(start);
  //           dt <= end;
  //           dt.setDate(dt.getDate() + 1)
  //         ) {
  //           arr.push(new Date(dt).toISOString().slice(0, 10)); // yyyy-mm-dd
  //         }

  //         let options = {
  //           contractAddress: "0xa9110224Df672c266569931F4e03f009651149E6",
  //           functionName: "addDatesBooked",
  //           abi: [
  //             {
  //               "inputs": [
  //                 {
  //                   "internalType": "uint256",
  //                   "name": "id",
  //                   "type": "uint256"
  //                 },
  //                 {
  //                   "internalType": "string[]",
  //                   "name": "newBookings",
  //                   "type": "string[]"
  //                 }
  //               ],
  //               "name": "addDatesBooked",
  //               "outputs": [],
  //               "stateMutability": "payable",
  //               "type": "function"
  //             }
  //           ],
  //           params: {
  //             id: id,
  //             newBookings: arr,
  //           },
  //           msgValue: Moralis.Units.ETH(dayPrice * arr.length),
  //         }
  //     console.log(arr);

  //     await contractProcessor.fetch({
  //       params: options,
  //       onSuccess: () => {
  //         handleSuccess();
  //       },
  //       onError: (error) => {
  //         handleError(error.data.message)
  //       }
  //     });

  // }

  return (
    <div className=" mx-auto relative al m-2">

      {map3Querry &&
            // display search results
      <div className="rentalsContent flex justify-center">
        <div className="rentalsContentL px-5 ">
        <div className="flex">
          <h1 className="text-3xl font-semibold mt-2 mb-6 text-blue-500">Map</h1>
          <span className="text-lg font-semibold my-auto">3.0</span>
          <h1 className="text-3xl font-semibold mx-1 px-1 mt-2 mb-6 text-[#64748b]">results for {map3Querry} </h1>
        </div>

        {vendorsList.map(({ name,city, walletAddress,imgUrl,distance,description}) => (

        <SearchVendorInfo

        key={walletAddress}
         name={name}
         city={city}
         imgUrl={imgUrl}
         description={description}
         distance={distance}
         walletAddress={walletAddress}

         />
              )
            )}
          <div/>
      </div>
      <section className=" hidden xl:px-5 xl:inline-flex xl:min-w-[600px]">
          {/* Note this is where the map3Querrys variable comes from */}
          <VendorsMap locations={coOrdinates} setHighLight={setHighLight} /> 
        </section>
      </div>
          }
     </div>
  );
};

