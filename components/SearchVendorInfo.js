import React from 'react'
import Link from "next/link";
import {useState, useEffect, useLocation} from "react"
import { useRouter } from "next/dist/client/router";
import { Button, Icon, useNotification } from "web3uikit";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import PayAnonymous from './PayAnonymous';

export default function SearchVendorInfo({walletAddress, city,name,imgUrl, distance, description,vendorsToken}) {
    const [highLight, setHighLight] = useState();
  const { Moralis, account } = useMoralis();

          return (
               <>
               <div className="flex flex-col px-2 border-b cursor-pointer  py-7
                hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t">
                    <div className='max-w-xs mx-auto clip m-1 p-1 p-5 rounded-3xl '>
                    <img className=" " src={imgUrl}/> {/* Remember to change this to IMAGE component from Next Js */}
                    </div>
                    <div className="flex flex-col justify-center  mt-10 max-w-sm pl-5">
                        <h3 className="text-blue-500 p-1 m-1">{name}</h3>
                        <h4 className="text-[#64748b] p-1 m-1">{description} </h4>
                        <h6 className="text-green-500 p-1 m-1">{distance} miles from you</h6>
                        <div className='max-w-xs mx-auto m-1 p-1'>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-5 py-2 m-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => {
                            if(account)
                            {
                            // Place Holder for  making onchain transactions
                            console.log('hi',account) // Note this account will be the signer of transactions
                            }
                            else{
                            handleNoAccount()
                            }
                            }
                            }
                            type="submit">
                                Transact
                            </button>
                        </div>
          {/* Here will pass in the wallet addtress of each vendor to a pay componnent for UI */}
          {/* <pay walletAddress={walletAddress}/>  */}


      </div>
    </div>
              </>
          );

}

