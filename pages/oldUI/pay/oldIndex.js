// RegisterVendor

import React from "react";
import Link from "next/link";
import { useMoralis, useWeb3ExecuteFunction  } from 'react-moralis';
import Apphero from 'components/Apphero';
import RegisterVendor from 'components/RegisterVendor';
import DashboardLayout from 'layouts/_dashboard';
import { NextSeo } from 'next-seo';
import { toast } from 'react-toastify';




export default function PAY () {

  const { Moralis, account } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();

  // user is autenticated
  const {isAuthenticated} = useMoralis()
  // if (!account) {
  //   return (
  //     <Apphero/>
  //   )
  // }


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