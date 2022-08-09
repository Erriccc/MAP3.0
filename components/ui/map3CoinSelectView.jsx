import { useState } from 'react';
import { coinList } from 'data/static/coin-list';
// import { reciversCoinList, sendersCoinList } from '/constants/coinListPolygon'; //
import { DefaultCoinIcon } from '/components/icons/defaultCoinIcon';
import Utils from '/Utilities/utils'
import {useContext, useEffect, useReducer } from 'react';


import { SearchIcon } from '/components/icons/search';
import { useModal } from '/components/modal-views/context';
export default function Map3CoinSelectView({ onSelect, coinList }) {
// 

    const { closeModal } = useModal();
    let [searchKeyword, setSearchKeyword] = useState('');
    let [tempCustomCustomCurrencyInfo, setTempCustomCustomCurrencyInfo] = useState({});
  const [customTokenState, dispatch] = useReducer(reducer,{newCustomCustomCurrencyInfo:{},showCustomTokenInfo: false, loadingInfo: false, notFoundInfo: false });


  function reducer(customTokenState, action){
    
      switch (action.type) {
        case "SHOW":
          return {newCustomCustomCurrencyInfo: tempCustomCustomCurrencyInfo, showCustomTokenInfo: true, loadingInfo: false, notFoundInfo: false}
        case "NOTFOUND":
          return {newCustomCustomCurrencyInfo:tempCustomCustomCurrencyInfo, showCustomTokenInfo: false, loadingInfo: false, notFoundInfo: true}
          case "LOAD":
          return {newCustomCustomCurrencyInfo:{}, showCustomTokenInfo: false, loadingInfo: true, notFoundInfo: false}
        case "HIDE":
            return {newCustomCustomCurrencyInfo: {}, showCustomTokenInfo: false, loadingInfo: false, notFoundInfo: false}
        default:
          return customTokenState

      }
  }

  
useEffect(()  => {
  if(customTokenState.loadingInfo){
    console.log('function triggered to load new custom token list')
    HandleFindCustomTokens()
  }else{
    console.log('skipping loading state')

    return
  }
  
  }, [customTokenState.loadingInfo])

  useEffect(()  => {
  if(customTokenState.loadingInfo){
    console.log("testing values...", customTokenState.newCustomCustomCurrencyInfo)
    console.log('testing value of tempCustomCustomCurrencyInfo', tempCustomCustomCurrencyInfo)
    dispatch({type:"SHOW"})
  }else{
    console.log('skipping SHOW state')
    return
  }
    }, [tempCustomCustomCurrencyInfo])
  

        function HandleFindCustomTokens(){
              let customCoinInfo;
              (async function() {
                console.log("searching blockchain")
                let newfoundCurrencyInfo = await Utils.ValidateIfAddressIsErc20(searchKeyword)
                console.log("done searching blockchain")

                if(newfoundCurrencyInfo[0] ==true ){
                  console.log(newfoundCurrencyInfo, "newfoundCurrencyInfo")
                  customCoinInfo=  {icon:<DefaultCoinIcon symbol={newfoundCurrencyInfo[1]} />,
                    address: searchKeyword,
                    code: newfoundCurrencyInfo[1],
                    name: newfoundCurrencyInfo[1],
                  }
                    console.log("newfoundCurrencyInfo...", customCoinInfo)
                    setTempCustomCustomCurrencyInfo(customCoinInfo)

                }else{
                    dispatch({type:"NOTFOUND"})

                }
              })();
              console.log("pushed result to newCustomCustomCurrencyInfo...")

        }

    let coinListData = coinList;
    if (searchKeyword.length > 0) {
        coinListData = coinList.filter(function (item) {
            const name = item.name;
            const walletAddress = item.address;
            return(
                name.match(searchKeyword) ||
                walletAddress.match(searchKeyword) ||
                (name.toLowerCase().match(searchKeyword) && name) ||
                (walletAddress.toLowerCase().match(searchKeyword) && walletAddress) 
              )
        });
    }
    function handleSelectedCoin(item) {
      console.log("new item selected ", item)
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
        <input type="search" autoFocus={true} onChange={(e) => setSearchKeyword(e.target.value)} placeholder="Search by name or address " className="w-full border-y border-x-0 border-dashed border-gray-200 py-3.5 pl-14 pr-6 text-sm focus:border-gray-300 focus:ring-0 dark:border-gray-700 dark:bg-light-dark focus:dark:border-gray-600"/>
      </div>
      <ul role="listbox" className="min-h-[200px] py-3">

      

        { customTokenState.showCustomTokenInfo &&  (
            <li  role="listitem"  onClick={() => handleSelectedCoin(customTokenState.newCustomCustomCurrencyInfo)} onKeyDown={(event) => handleSelectedCoinOnKeyDown(event, customTokenState.newCustomCustomCurrencyInfo)} className="flex cursor-pointer items-center gap-2 py-3 px-6 outline-none hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-900">
              {customTokenState.newCustomCustomCurrencyInfo.icon}
              <span className="uppercase">{customTokenState.newCustomCustomCurrencyInfo.name}</span>
            </li>
              )}
        {coinListData.length > 0 && (coinListData.map((item, index) => (<li key={item.address} role="listitem" tabIndex={index} onClick={() => handleSelectedCoin(item)} onKeyDown={(event) => handleSelectedCoinOnKeyDown(event, item)} className="flex cursor-pointer items-center gap-2 py-3 px-6 outline-none hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-900">
              {item.icon}
              <span className="uppercase">{item.name}</span>
            </li>)))
        }
        { coinListData.length < 1 &&(
        <div>
          {customTokenState.loadingInfo && (
                <div className="items-center py-3 px-6 outline-none">

                <svg role="status" className="inline w-5 h-9 mr-2 text-blue-400 animate-spin dark:text-blue-400 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                </div>

        )
        }
          { customTokenState.notFoundInfo &&  (
              <div className="items-center py-3 px-6 outline-none">
                            Currency Not Found
                        </div>
          )}
              <div   onClick={() => dispatch({type:"LOAD"})} className="flex cursor-pointer items-center gap-3 py-3 px-6 outline-none hover:bg-gray-200 focus:bg-gray-400 dark:hover:bg-gray-700 dark:focus:bg-gray-600">
            <span className="text-sm tracking-tight text-gray-600 dark:text-white">
              Load  Custom Currency ?
            </span>
          </div>
          </div>
        )
        }





      </ul>
              
     
      

       
{/* 0x5559edb74751a0ede9dea4dc23aee72cca6be3d5  searchingMode && */}

    </div>);
}
