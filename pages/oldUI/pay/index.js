import React from "react";
import Link from "next/link";
import { useMoralis, useWeb3ExecuteFunction  } from 'react-moralis';
import Apphero from 'components/Apphero';
import PayAnonymous from 'components/PayAnonymous';
import { useNotification, CreditCard } from "web3uikit";
import DashboardLayout from 'layouts/_dashboard';
import { useRouter } from "next/dist/client/router";




export default function PAY () {

  const { Moralis, account } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const dispatch = useNotification();

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