import React, { useState } from "react";
import Link from "next/link";
import { useMoralis, useWeb3ExecuteFunction  } from 'react-moralis';
import Apphero from 'components/Apphero';
import PayVendor from 'components/PayVendor';
import VendorQrCode from 'components/VendorQrCode';

import { useNotification, CreditCard } from "web3uikit";
import { useRouter } from "next/router";
import {Map3WebsiteUrl} from "../../Utilities/utils"





export default function PAY () {

  const { Moralis, account } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const dispatch = useNotification();
  let router = useRouter();

  const {walletAddress,vendorsName, vendorsToken,vendorsTokenSymbol} = router.query
  // console.log("router : ", router)
  // console.log("router.query : ", router.query)
  // // user is autenticated
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

  return (
    <div className="max-w-md relative al my-2 flex flex-col mx-auto justify-center">

         {account &&
         <>
            <div className="text-[#64748b] p-2 m-2 text-3xl font-semibold">

            <h4 className="text-blue-500 text-lg italic">

            {vendorsName} Map3Pay profile
              </h4>
            </div>
            <div>
              {console.log("is this your user object or address?",account, "from [walletAddress].js")}

              {/* 
              NOTE PASS VENDORS WALLET ADDRESS HERE AUTOMATICALY TO PAY VENDORS
              
              NOTE by checking for vendorsTokenSymbol we are making sure we have all our parameters before rendering 
              the payVendor and VendorQrcode componnents
              */}

            {vendorsTokenSymbol && <>
              <PayVendor
            User={account}
            walletAddress={walletAddress}
            vendorsToken={vendorsToken}
            vendorsName={vendorsName}
            vendorsTokenSymbol={vendorsTokenSymbol}
             />
              <VendorQrCode url={`${Map3WebsiteUrl}${router.asPath}`} />
			      </>}



            </div>
         </>
            }
         </div>

  );
};