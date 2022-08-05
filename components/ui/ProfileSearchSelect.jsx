import { useState } from 'react';
import Image from '/components/ui/image';
import { SearchIcon } from '/components/icons/search';
import vendorsData from "../../constants/testdata.json";
import CollectionImage1 from 'assets/images/collection/collection-1.jpg';

export default function ProfileSearchSelect({ onSelect }) {
    let [searchKeyword, setSearchKeyword] = useState('');
    let searchData = vendorsData;

    if (searchKeyword.length > 0) {
        searchData = vendorsData.filter(function (item) {
            const name = item.name;
            const walletAddress = item.walletAddress;
            return (
                name.match(searchKeyword) ||
                walletAddress.match(searchKeyword) ||
                (name.toLowerCase().match(searchKeyword) && name) ||
                (walletAddress.toLowerCase().match(searchKeyword) && walletAddress) 
                 );
        });
    }
    function handleSelectedCoin(walletAddress) {
        onSelect(walletAddress);
    }
    return (<div className="w-full rounded-lg bg-white text-sm shadow-large dark:bg-light-dark xs:w-[400px]">
      <h2 className="p-6 text-lg font-medium uppercase text-gray-900 dark:text-white">
        Reciver
      </h2>
      <div className="relative">
        <SearchIcon className="absolute left-6 h-full text-gray-700 dark:text-white"/>
        <input type="search" autoFocus={true} onChange={(e) => setSearchKeyword(e.target.value)} placeholder="Search..." className="w-full border-x-0 border-b border-dashed border-gray-200 py-3.5 pl-14 pr-6 text-sm focus:border-gray-300 focus:ring-0 dark:border-gray-600 dark:bg-light-dark dark:text-white dark:focus:border-gray-500"/>
      </div>
      <ul role="listbox" className="py-3">
        {searchKeyword.length >0 && searchData.length > 0 ? (searchData.map((item, index) => (
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
            </li>))) : (


        //  VALIDATE THAT INPUT IS AN ADDRESS
        <li  role="listitem" onClick={() => handleSelectedCoin(searchKeyword)} className="mb-1 flex cursor-pointer items-center gap-3 py-1.5 px-6 outline-none hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-600">
              <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full shadow-card">
                <Image src={CollectionImage1} placeholder="blur" layout="fill" objectFit="cover" className="rounded-full" alt={searchKeyword}/>
              </div>
              <span className="text-sm tracking-tight text-gray-600 dark:text-white">
              Ops! not found please type full address
              </span>
            </li>
          )}
      </ul>
    </div>);
}


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