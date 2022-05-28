import React, { useState } from "react";
import Link from "next/link";
import { useMoralis, useWeb3ExecuteFunction  } from 'react-moralis';
import Apphero from 'components/Apphero';
import PayVendor from 'components/PayVendor';
import { useNotification, CreditCard } from "web3uikit";
import { useRouter } from "next/router";





export default function PAY () {

  const { Moralis, account } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const dispatch = useNotification();
  let router = useRouter();

  const {walletAddress,vendorsName, vendorsToken,vendorsTokenSymbol} = router.query
  // user is autenticated
  const {isAuthenticated} = useMoralis()
  if (!isAuthenticated) {
    return (
      <Apphero/>
    )
  }
//   const handleSuccess= () => {
//     dispatch({
//       type: "success",
//       message: `Nice! You are going to ${searchFilters.destination}!!`,
//       title: "Booking Succesful",
//       position: "topL",
//     });
//   };

//   const handleError= (msg) => {
//     dispatch({
//       type: "error",
//       message: `${msg}`,
//       title: "Booking Failed",
//       position: "topL",
//     });
//   };

//   const handleNoAccount= () => {
//     dispatch({
//       type: "error",
//       message: `You need to connect your wallet to book a rental`,
//       title: "Not Connected",
//       position: "topL",
//     });
//   };



// const  getVendorsTokenSymbol = async () => {
//   const vendtoTokenSymbol = await getTokenSymbol(vendorsToken)
//   setVendorsTokenSymbol(vendtoTokenSymbol)
//   // return vendtoTokenSymbol

// }
// getVendorsTokenSymbol()

// (async () => {
//   //     const vendtoTokenSymbol = await getTokenSymbol(vendorsToken)
//   //     setVendorsTokenSymbol(vendtoTokenSymbol)
//   //     return vendtoTokenSymbol
//   const vendorsTokenSymbol = await getVendorsTokenSymbol()
//   setVendorsTokenSymbol(vendorsTokenSymbol)

//     })();


  return (
    <div className="max-w-md relative al my-2 flex flex-col mx-auto justify-center">

         {account &&
         <>
            <div className="text-[#64748b] p-2 m-2 text-3xl font-semibold">

            <h4 className="text-blue-500 text-lg italic">

            {vendorsName} Map3.0 profile
              
              </h4>
            </div>
            <div>
              {console.log("is this your user object or address?",account)}
              {/* 
              NOTE PASS VENDORS WALLET ADDRESS HERE AUTOMATICALY TO PAY VENDORS
              */}
            <PayVendor
            User={account}
            walletAddress={walletAddress}
            vendorsToken={vendorsToken}
            vendorsName={vendorsName}
            vendorsTokenSymbol={vendorsTokenSymbol}
             />
            </div>
         </>
            }
         </div>

  );
};