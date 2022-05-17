import React, { useState, useEffect } from 'react';
import tokenAdresses from '../constants/tokens.json'
const BigNumber = require('bignumber.js');
const fetch = require('node-fetch');
const process = require('process');
const { createWeb3, createQueryString, etherToWei, waitForTxSuccess, weiToEther } = require('../Utilities/utils');

// Note that the actual componnent starts with a small letter but react components need to start in caps

const submitRegistration = async (event) => {
    event.preventDefault();
    const tokenOfChoice = event.target.token.value
    const registrationData = {
        vendorsToken: tokenOfChoice,
        vendorsName: event.target.vendorName.value,
        vendorsWebsiteUrl: event.target.websiteUrl.value,
        vendorsImageUrl: event.target.imageUrl.value,
        vendorsPhone: event.target.phone.value,
        vendorsWalletAddress: event.target.vendorsWallet.value,
        vendorsStreetAddress:event.target.vendorsStreetAddress.value,
        vendorsCity: event.target.Gridcity.value,
        vendorsState: event.target.Gridstate.value,
        vendorsZip: event.target.Gridzip.value,
        vendorsBio: event.target.aboutVendor.value
      }

      const JSONdata = JSON.stringify(registrationData)
      // API endpoint where we send form data.
      const endpoint = 'api/registerVendor'
      // Form the request for sending data to the server.
      const options = {
        // The method is POST because we are sending data.
        method: 'POST',
        // Tell the server we're sending JSON.
        headers: {
          'Content-Type': 'application/json',
        },
        // Body of the request is the JSON data we created above.
        body: JSONdata,
      }
      const response = await fetch(endpoint, options)
      const result = await response.json()
      console.log(result)
  };

export default function Pay() {

    // This will be defaulted to usdt if the vendor does not specify
    const [newVendorsToken, setNewVendorsToken] = React.useState("0xdAC17F958D2ee523a2206206994597C13D831ec7"); 
  return (
  <div className="w-full max-w-lg">
                <form className=" shadow-md rounded px-8 pt-6 pb-8 mb-4" id="pay" onSubmit={submitRegistration}>
                        <div className="mb-4 ">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                Business Name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="vendorName" name='vendorName' type="text" placeholder="Company (Ex. Takorea)"
                            />
                        </div>
                        <div className="mb-4 ">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                Website Url
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="websiteUrl" name='websiteUrl' type="text" placeholder="takorea.com"
                            />
                        </div>
                        <div className="mb-4 ">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                Image Url
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="imageUrl" name='imageUrl' type="text" placeholder="https://ipfs.io:2053/ipfs/QmS3gdXVcjM72JSGH82ZEvu4D7nS6sYhbi5YyCw8u8z4pE/media/3"
                            />
                        </div>
                        <div className="mb-4 ">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                Phone Nmuber
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="phone" name='phone' type="number" placeholder="Phone number (Ex. 123-456-7890)"
                            />
                        </div>
                        <div className="mb-4 bg-white">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                Business Wallet Address
                            </label>
                            <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="vendorsWallet" name='vendorsWallet' type="text" placeholder="0x**************"/>
                            <h4 className="text-red-500 text-xs italic">Please Add a wallet Address</h4>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-5">
                            <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Street Address
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="vendorsStreetAddress" name="vendorsStreetAddress" type="text" placeholder="123 street Avenue"/>
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                City
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="Gridcity" name="Gridcity" type="text" placeholder="Chicago"/>
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                State
                            </label>
                            <div className="relative">
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="Gridstate" id="Gridstate" type="text" placeholder="IL"/>
                            </div>
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Zip
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="Gridzip" id="Gridzip" type="text" placeholder="90210"/>
                            </div>
                        </div>

                        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Bio</label>
                        <textarea id="aboutVendor" name='aboutVendor' rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Make it about You!...">
                        </textarea>

                        <div className="  flex flex-row items-center justify-between py-2">
                                <div className="  p-2 m-3 flex  flex-col justify-center ">
                                    <label className="uppercase text-center tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Choose Token
                                    </label>
                                    <div className="flex flex-wrap -mx-6 ">
                                        <div className="relative">
                                            <select
                                                className="appearance-none w-full  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="token" name='token'
                                                >
                                                    {tokenAdresses.map(({ address,symbol}) => (
                                                    <option key={address} value={address}>{symbol}</option>
                                                ))}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-5 py-2 m-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Sign Up
                            </button>
                        </div>
                </form>
</div>
  )
}

