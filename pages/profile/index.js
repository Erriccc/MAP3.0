import React from "react";
import Link from "next/link";
import { useMoralis, useWeb3ExecuteFunction  } from 'react-moralis'
import Apphero from 'components/Apphero'
import { useNotification, CreditCard } from "web3uikit";




export default function AppHome () {

  const { Moralis, account } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const dispatch = useNotification();

  // user is autenticated
  const {isAuthenticated} = useMoralis()
  if (!isAuthenticated) {
    return (
      <Apphero/>
    )
  }
  
  const handleSuccess= () => {
    dispatch({
      type: "success",
      message: `Nice! You are going to ${searchFilters.destination}!!`,
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



  return (
         account &&
         <div className="text-[#64748b] p-2 m-2 text-3xl font-semibold">
           <h4>
           Hi, Account: {account} Is Logged In<br></br> This page is currently under development
           </h4>
           

           {/*  Place Holder for real user card Profile */}
                  {/* <CreditCard
                  brand="mastercard"
                  expiresAt={{
                    month: '1',
                    year: '24'
                  }}
                  fingerprint="ar-master"
                  id="marty-mc-fly-cc-id"
                  lastDigits="1177"
                  name="john Doe"
                  onRemove={function noRefCheck(){}}
        /> */}
         </div>
  );
};