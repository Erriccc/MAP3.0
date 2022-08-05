import { useState } from 'react';
import { coinList } from 'data/static/coin-list';
// import { reciversCoinList, sendersCoinList } from '/constants/coinListPolygon'; //
import { DefaultCoinIcon } from '/components/icons/defaultCoinIcon';
import {getTokenSymbol} from '/Utilities/utils'
import {useContext, useEffect } from 'react';


import { SearchIcon } from '/components/icons/search';
import { useModal } from '/components/modal-views/context';
export default function Map3CoinSelectView({ onSelect, coinList }) {


  // useEffect(()  =>  {

  async function  getSendersCoinList() {


    let newCoinList = [];
    for (let i = 0; i<coinList.length;) {
      console.log(i.address)
      newCoinList.push(
        {icon:i.icon,
          address: i.address,
          // code: await getTokenSymbol(i.address),
          name: i.name
        }
        )
    }
    console.log("newCoinList from coin select view:  ", newCoinList)
    return newCoinList;
  }
// }, []);

//   {
//     icon: <Usdc />,
//     address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
//     // code: await getTokenSymbol(address),
//     name: 'USD Coin',
// },


    const { closeModal } = useModal();
    let [searchKeyword, setSearchKeyword] = useState('');
    let coinListData = coinList;
    if (searchKeyword.length > 0) {
        coinListData = coinList.filter(function (item) {
            const name = item.name;
            return (name.match(searchKeyword) ||
                (name.toLowerCase().match(searchKeyword) && name));
        });
    }
    function handleSelectedCoin(item) {
        onSelect(item);
        closeModal();
    }
    function handleSelectedCoinOnKeyDown(event, item) {
        if (event.code === 'Enter') {
            onSelect(item);
            closeModal();
        }
    }
    return (<div className="w-full rounded-lg bg-white text-sm shadow-large dark:bg-dark xs:w-[400px]">
      <h2 className="p-6 text-lg font-medium uppercase text-gray-900 dark:text-white">
        Pay with
      </h2>
      <div className="relative">
        <SearchIcon className="absolute left-6 h-full text-gray-700"/>
        <input type="search" autoFocus={true} onChange={(e) => setSearchKeyword(e.target.value)} placeholder="Search Your Coin by Name" className="w-full border-y border-x-0 border-dashed border-gray-200 py-3.5 pl-14 pr-6 text-sm focus:border-gray-300 focus:ring-0 dark:border-gray-700 dark:bg-light-dark focus:dark:border-gray-600"/>
      </div>
      <ul role="listbox" className="min-h-[200px] py-3">
        {coinListData.length > 0 ? (coinListData.map((item, index) => (<li key={item.code} role="listitem" tabIndex={index} onClick={() => handleSelectedCoin(item)} onKeyDown={(event) => handleSelectedCoinOnKeyDown(event, item)} className="flex cursor-pointer items-center gap-2 py-3 px-6 outline-none hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-900">
              {item.icon}
              <span className="uppercase">{item.name}</span>
            </li>))) : (
        // FIXME: need coin not found svg from designer
        <li className="px-6 py-20 text-center">
            <h3 className="mb-2 text-base">Ops! not found</h3>
            <p className="text-gray-500">Try another keyword for search</p>
          </li>)}
      </ul>
    </div>);
}
