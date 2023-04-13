import React from "react";
import Link from "next/link";
import { useMoralis, useWeb3ExecuteFunction  } from 'react-moralis';
import Apphero from 'components/Apphero';
import PayAnonymous from 'components/PayAnonymous';
import DashboardLayout from 'layouts/_dashboard';
import { useRouter } from "next/dist/client/router";
import { toast } from 'react-toastify';




export default function PAY () {

  const { Moralis, account } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();

  // user is autenticated
  const {isAuthenticated} = useMoralis()
  const router = useRouter()

  
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
             Who would you like to pay
            </div>
            <div>
              {console.log("is this your user object or address?",account, "from index.js")}
              {/* 
              NOTE PASS VENDORS WALLET ADDRESS HERE AUTOMATICALY TO PAY VENDORS
              */}
            <PayAnonymous
            User={account}
             />
            </div>
         </>
            }
         </div>
    </DashboardLayout>


  );
};