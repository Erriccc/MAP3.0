// RegisterVendor

import React from "react";
import Link from "next/link";
import { useMoralis, useWeb3ExecuteFunction  } from 'react-moralis';
import Apphero from 'components/Apphero';
import RegisterVendor from 'components/RegisterVendor';
import { useNotification, CreditCard } from "web3uikit";
import DashboardLayout from 'layouts/_dashboard';
import { NextSeo } from 'next-seo';




export default function PAY () {

  const { Moralis, account } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const dispatch = useNotification();

  // user is autenticated
  const {isAuthenticated} = useMoralis()
  // if (!account) {
  //   return (
  //     <Apphero/>
  //   )
  // }
//   const handleSuccess= () => {
//     dispatch({
//       type: "success",
//       message: `Nice! You are going to ${searchFilters.destination}!!`,
//       title: "Booking Succesful",
//       position: "bottomR",
//     });
//   };

//   const handleError= (msg) => {
//     dispatch({
//       type: "error",
//       message: `${msg}`,
//       title: "Booking Failed",
//       position: "bottomR",
//     });
//   };

//   const handleNoAccount= () => {
//     dispatch({
//       type: "error",
//       message: `You need to connect your wallet to book a rental`,
//       title: "Not Connected",
//       position: "bottomR",
//     });
//   };



  return (
    <>
    <NextSeo title="sign up" description="Map3 - sign up new vendor profiles"/>
    <DashboardLayout>
    <div className="max-w-md relative al my-2 flex flex-col mx-auto justify-center">

         {account &&
         <>
            <div className="text-[#64748b] p-2 m-2 text-3xl font-semibold">
             Become a Vendor Today
            </div>
            <div>
              {/* 
              NOTE PASS VENDORS WALLET ADDRESS HERE AUTOMATICALY TO PAY VENDORS
              */}
            <RegisterVendor/>
            </div>
         </>
            }
         </div>
      </DashboardLayout>
      </>
  );
};