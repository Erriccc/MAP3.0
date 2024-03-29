import React, { useState } from "react";
import Link from "next/link";
import { useMoralis, useWeb3ExecuteFunction  } from 'react-moralis';
import Apphero from 'components/Apphero';
import PayVendor from 'components/payVendor';
import VendorQrCode from 'components/VendorQrCode';
import DashboardLayout from 'layouts/_dashboard';
import { useRouter } from "next/router";
import {Map3WebsiteUrl} from "../../../Utilities/utils"
import { toast } from 'react-toastify';





export default function PAY () {

  const { Moralis, account } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  let router = useRouter();

  const {walletAddress,vendorsName, vendorsToken,vendorsTokenSymbol} = router.query
  // console.log("router : ", router)
  // console.log("router.query : ", router.query)
  // // user is autenticated
  const {isAuthenticated} = useMoralis()
  
  
  // // UNCOMMENT to AUTHENTICATE!!!!
  // if (!account) {
  //   // if (process.browser){
  //   //   router.push({
  //   //     pathname: "/"
  //   //   });
  //   // }
  //   return (
  //     <Apphero/>
  //   )
  // }


  return (
    <DashboardLayout>

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
    </DashboardLayout>


  );
};