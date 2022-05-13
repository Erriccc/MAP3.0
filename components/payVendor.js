import React from 'react';





export default function payVendor({walletAddress}) {
       // here we are just keeping tractk of the wallet address passed down
  return (
      <div className="w-full max-w-xs">
        <div>Pay {walletAddress} </div> 
        <form className=" shadow-md rounded px-8 pt-6 pb-8 mb-4" id="pay">
                        <div className="mb-4 ">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                Ammount
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="amount" type="number" placeholder="100"/>
                        </div>
                        <div className="  flex flex-col sm:flex-row items-center sm:justify-between py-2">
                            
                            <a className="font-bold text-sm text-blue-500 hover:text-blue-800 p-4 mx-2" href="#">
                                Quote:
                            </a>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-5 py-2 m-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                PAY
                            </button>
                            <div className="  p-2 m-3 flex  flex-col justify-center ">
                                <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Token
                                </label>
                                <div className="flex flex-wrap -mx-6 ">
                                    <div className="relative">
                                        <select className="appearance-none w-full  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="token">
                                            <option>WETH</option>
                                            <option>WBTC</option>
                                            <option>USDC</option>
                                            <option>DAI</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                </form>
</div>
  )
}

