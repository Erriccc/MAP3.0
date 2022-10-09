import { useState } from 'react';
import { coinList } from 'data/static/coin-list';
// import { reciversCoinList, sendersCoinList } from '/constants/coinLists'; //
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
        suggestions
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
          

          { customTokenState.notFoundInfo &&  (
              <div className="items-center py-3 px-6 outline-none">
                            Currency Not Found
                        </div>
          )}
              <div   onClick={() => dispatch({type:"LOAD"})} className="flex justify-start cursor-pointer items-center gap-3 py-3 bg-gray-200 px-6 outline-none hover:bg-brand  focus:bg-gray-400 dark:hover:bg-gray-700 dark:focus:bg-gray-600">
            <span className="text-sm tracking-tight text-white ">
              Find  Custom Currency ?
            </span>
                              {customTokenState.loadingInfo && (
                        <div className="flex ml-5 justify-center items-center">
                        <div className="grid gap-2">
                                <div className="flex items-center justify-center space-x-2 animate-pulse">
                                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                </div>
                              </div>
                          </div>)}
          </div>
          </div>
        )
        }





      </ul>
              
     
      

       
{/* 0x5559edb74751a0ede9dea4dc23aee72cca6be3d5  searchingMode && */}

    </div>);
}
