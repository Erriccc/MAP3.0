import { useState,useReducer,useEffect } from 'react';
import Image from '/components/ui/image';
import { SearchIcon } from '/components/icons/search';
import vendorsData from "../../constants/testdata.json";
import CollectionImage1 from 'assets/images/collection/collection-1.jpg';
import {findProfilesDataFetcherRelayer} from '/Utilities/FrontEndUtilities/FEfindProfilesDataFetcherRelayer'

export default function ProfileSearchSelect({ onSelect, tittle }) {
    let [searchKeyword, setSearchKeyword] = useState('');

    let [tempDataInfo, setTempDataInfo] = useState([]);
  const [mapDataState, dispatchather] = useReducer(reducer,{dataFromServer:[],showDataFromServer: false, loadingInfo: true, FoundInfo: false });
  // const [displayData, setDisplayData] = useState([]);

function reducer(mapDataState, action){
  
    switch (action.type) {
      case "SHOW":
        return {dataFromServer: tempDataInfo, showDataFromServer: true, loadingInfo: false, FoundInfo: false}
      case "FOUND":
        return {dataFromServer:tempDataInfo, showDataFromServer: false, loadingInfo: false, FoundInfo: true}
      case "HIDE":
          return {dataFromServer: {}, showDataFromServer: false, loadingInfo: false, FoundInfo: false}
      default:
        return mapDataState

    }
}
    
    // let searchData = vendorsData;
    let searchData;
    useEffect(() => {

    if (searchKeyword.length > 0) {

      const userSearchInput = {string:searchKeyword};
      console.log('searching blah.. xyz xyz xyz...');

        (async()=> {
          let tempData = await findProfilesDataFetcherRelayer(userSearchInput)
          if(await tempData == undefined){
            return
          }else{
            console.log("tempData...", await tempData)
            // searchData = tempData.map3Vendors
            // setDataFromServer(tempData)
          setTempDataInfo(tempData.map3Vendors)
          // setDisplayData(tempData.map3Vendors)
          dispatchather({type:"FOUND"})
          console.log('done searching')
          }
          
        })();
    }
  }, [searchKeyword]); // Note we are running the use effect every time we recieve a new search filter

    useEffect(()  => {
      if(mapDataState.FoundInfo){
        console.log("testing values...", mapDataState.dataFromServer)
        console.log('testing value of tempDataInfo', tempDataInfo)
        console.log('tempDataInfo.length', tempDataInfo.length)
        dispatchather({type:"SHOW"})
      }else{
        console.log('skipping SHOW state')
        return
      }
        }, [tempDataInfo])

    function handleSelectedCoin(walletAddress) {
        onSelect(walletAddress);
    }
    return (<div className="w-full rounded-lg bg-white text-sm shadow-large dark:bg-light-dark xs:w-[400px]">
      <h2 className="p-6 text-lg font-medium uppercase text-gray-900 dark:text-white">
        {tittle}
      </h2>
      <div className="relative">
        <SearchIcon className="absolute left-6 h-full text-gray-700 dark:text-white"/>
        <input type="search" autoFocus={true} onChange={(e) => setSearchKeyword(e.target.value)} placeholder="Search..." className="w-full border-x-0 border-b border-dashed border-gray-200 py-3.5 pl-14 pr-6 text-sm focus:border-gray-300 focus:ring-0 dark:border-gray-600 dark:bg-light-dark dark:text-white dark:focus:border-gray-500"/>
      </div>
      <ul role="listbox" className="py-3">
        { searchKeyword.length >0 && !mapDataState.showDataFromServer &&
                  (
                    <li  role="listitem"  className="mb-1 flex flex-col cursor-pointer items-center gap-3 py-1.5 px-6 outline-none hover:bg-gray-300 focus:bg-gray-400 dark:hover:bg-gray-700 dark:focus:bg-gray-600">
                    <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full shadow-card">
                        Loading....
                    </div>
                  </li>
                  )
                }
        {searchKeyword.length >0 && mapDataState.dataFromServer.length > 0 ? (mapDataState.dataFromServer.map((item, index) => (
        <li key={index} role="listitem" tabIndex={index} onClick={() => handleSelectedCoin(item.walletAddress)} className="mb-1 flex cursor-pointer items-center gap-3 py-1.5 px-6 outline-none hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-600">
              <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full shadow-card">
                <Image 
                src={`/api/imagefetcher?url=${encodeURIComponent(
                  item.imgUrl
                )}`}
                
                // placeholder="blur" 
                layout="fill" objectFit="cover" className="rounded-full" alt={item.name}/>
              </div>
              <span className="text-sm tracking-tight text-gray-600 dark:text-white">
                {item.name}
              </span>
            </li>))) :
                  (


        //  VALIDATE THAT INPUT IS AN ADDRESS
        
        <div className=''>
          <li  role="listitem" onClick={() => handleSelectedCoin(searchKeyword)} className="mb-1 flex flex-col cursor-pointer items-center gap-3 py-1.5 px-6 outline-none hover:bg-gray-300 focus:bg-gray-400 dark:hover:bg-gray-700 dark:focus:bg-gray-600">
              <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full shadow-card">
                <Image src={CollectionImage1} placeholder="blur" layout="fill" objectFit="cover" className="rounded-full" alt={searchKeyword}/>
              </div>
              <div className='flex flex-col'>
              <span className="text-sm tracking-tight text-gray-600 dark:text-white">
                new wallet address
              </span>
              <span className="text-sm tracking-tight text-gray-600 dark:text-white">
              {searchKeyword}
              </span>
              </div>
            </li>
            </div>
          )}
      </ul>
    </div>);
}

// 0x5559edb74751a0ede9dea4dc23aee72cca6be3d5

// "name": "Resturant on Georgia Avenue",
//     "city": "DC",
//     "description": "fries wings burgers burrito fast food",
//     "imgUrl":
//       "https://cdn.pixabay.com/photo/2015/09/21/14/24/supermarket-949913__340.jpg",
//     "lat": "40.716862",
//     "long": "-70.999005",
//     "walletAddress":"0xeF31027350Be2c7439C1b0BE022d49421488b74C",
//     "distance": "5",
//     "vendorsToken":"0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7"