import React from 'react'
import { CryptoLogos } from 'web3uikit';


export default function Partners() {
  return (
    <div className="mx-auto mt-10 px-10 sm:px-16 max-w-2xl md:max-w-7xl bg-gray-50">

        <section className="pt-6">
            <h2 className=" text-center text-xl text-[#64748b] font-semibold pb-5 md:text-4xl">Pay Vendors That acccept your Favourite Erc20 tokens</h2>
        <div className="grid p-4 grid-cols-3 sm:grid-cols-3 lg:grid-cols-4">
            {/* // Place Holder..... Dynamicaly Geneerate items
             */}
    <div className=" flex justify-center p-1 m-1 rounded-lg cursor-pointer hover:bg-gray-200 hover:scale-105 transition transform duration-200 ease-out">
      <div className=" ">
            <CryptoLogos
                chain="avalanche"
            />
            </div>
            </div>
            <div className=" flex justify-center m-1 p-1 rounded-lg cursor-pointer hover:bg-gray-200 hover:scale-105 transition transform duration-200 ease-out">
      <div className="">
            <CryptoLogos
                chain="polygon"
            />
            </div>
            </div>
            <div className=" flex justify-center m-1 p-1 rounded-lg cursor-pointer hover:bg-gray-200 hover:scale-105 transition transform duration-200 ease-out">
      <div className="">
            <CryptoLogos
                chain="ethereum"
            />
            </div>
            </div>
            <div className=" flex justify-center m-1 p-1 rounded-lg cursor-pointer hover:bg-gray-200 hover:scale-105 transition transform duration-200 ease-out">
      <div className=" ">
            <CryptoLogos
                chain="polygon"
            />
            </div>
            </div>
            <div className=" flex justify-center m-1 p-1 rounded-lg cursor-pointer hover:bg-gray-200 hover:scale-105 transition transform duration-200 ease-out">
      <div className="">
            <CryptoLogos
                chain="binance"
            />
            </div>
            </div>
            <div className=" flex justify-center m-1 p-1 rounded-lg cursor-pointer hover:bg-gray-200 hover:scale-105 transition transform duration-200 ease-out">
      <div className="">
            <CryptoLogos
                chain="avalanche"
            />
            </div>
            </div>
            <div className=" flex justify-center m-1 p-1 rounded-lg cursor-pointer hover:bg-gray-200 hover:scale-105 transition transform duration-200 ease-out">
      <div className="">
            <CryptoLogos
                chain="polygon"
            />
            </div>
            </div>
            <div className=" flex justify-center m-1 p-1 rounded-lg cursor-pointer hover:bg-gray-200 hover:scale-105 transition transform duration-200 ease-out">
      <div className="">
            <CryptoLogos
                chain="arbitrum"
            />
            </div>
            </div>
        </div>
    </section>
</div>
  )
}

