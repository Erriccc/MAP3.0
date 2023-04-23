import { useState, useRef, useEffect , useLayoutEffect} from 'react';
import cn from 'classnames';
import { sendersCoinList } from '../constants/coinListPolygon'; //
import { DefaultCoinIcon } from '/components/icons/defaultCoinIcon';
import Utils from '/Utilities/utils'


// isMounted && windowScroll.y > 10
 

const decimalPattern = /^[0-9]*[.,]?[0-9]*$/;
// export default function VendorReciverCoinInput({ tokenAddress, label, getCoinValue, className, ...rest }) {
  export default function VendorReciverCoinInput({tokenInfo, label, getCoinValue, className, ...rest }) {


    let [value, setValue] = useState(0.01);
    // let [selectedCoin, setSelectedCoin] = useState();
    // let [tempCustomCustomCurrencyInfo, setTempCustomCustomCurrencyInfo] = useState();

// useLayoutEffect(() => {
  useEffect(() => {
  let isMounted = true;
console.log(tokenInfo,"..tokenInfo yooooooooooooooooo")


          // let coinListData;

          // (async function() {

          //     coinListData = sendersCoinList.find(function (item) {
          //         const walletAddress = item.address;
          //         return(
          //             walletAddress.match(tokenAddress) ||
          //             (walletAddress.toLowerCase().match(tokenAddress) && walletAddress) 
          //           )
          //     }
          //     );
          //   })();

          // if(coinListData == null){
          //           (async function() {
          //             console.log("searching blockchain")
          //             let newfoundCurrencyInfo = await Utils.ValidateIfAddressIsErc20(tokenAddress)
          //             console.log("done searching blockchain")
              
          //               if(newfoundCurrencyInfo[0] ==true ){
          //                 console.log(newfoundCurrencyInfo, "newfoundCurrencyInfo")
          //                 coinListData=  {
          //                   icon:<DefaultCoinIcon symbol={newfoundCurrencyInfo[1]} />,
          //                   address: tokenAddress,
          //                   code: newfoundCurrencyInfo[1],
          //                   name: newfoundCurrencyInfo[1],
          //                 }
          //                   console.log("newfoundCurrencyInfo...", coinListData)
          //                   setTempCustomCustomCurrencyInfo(coinListData)
          //               }
          //               else{
          //               }
          //             })();
          //             console.log("pushed result to newCustomCustomCurrencyInfo...")

          // }else{
          //   console.log("pre setTempCustomCustomCurrencyInfo", tempCustomCustomCurrencyInfo)
          //   setTempCustomCustomCurrencyInfo(coinListData)
          //   console.log("result of coinlist data", coinListData)
          //   console.log("setTempCustomCustomCurrencyInfo", tempCustomCustomCurrencyInfo)


          // }
return () => { isMounted = false };

// }, [tokenAddress])
}, [tokenInfo])


// useLayoutEffect(() => {
//   let isMounted = true;

//       console.log("post setTempCustomCustomCurrencyInfo", tempCustomCustomCurrencyInfo)

//       if(tempCustomCustomCurrencyInfo?.address == null){

//       }else{
//         setSelectedCoin(tempCustomCustomCurrencyInfo)
//         console.log("got here and set selected con")

//       }
//       return () => { isMounted = false };

//     }, [tempCustomCustomCurrencyInfo])
    

  //   useLayoutEffect(() => {
  // let isMounted = true;


  
  //     // if(setSelectedCoin.address !== null){
  //       if(tokenInfo.address !== null){
  //       console.log("post selectedCoin", selectedCoin)
  //     }else{
  //       console.log("ran unnesarily")

  //     }
  //     return () => { isMounted = false };

  //   }, [selectedCoin])


    const handleOnChange = ( event) => {
          if (event.target.value.match(decimalPattern)) { setValue(event.target.value)} else{ console.log("value does not match  decimal pattern")}
          let param = { value: event.target.value};
          getCoinValue && getCoinValue(param)
    };
    return (<>
      <div className={cn('group flex min-h-[70px] rounded-lg border border-gray-200 transition-colors duration-200 hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-600', className)}>
        <div className="w-1/2  md:w-1/3 border-r border-gray-200 p-3 transition-colors duration-200 group-hover:border-gray-900 dark:border-gray-700 dark:group-hover:border-gray-600">
          <span className="mb-1.5 block text-xs uppercase text-gray-600 dark:text-gray-400">
            {label}
          </span>
            <div className=" relative flex h-10 w-full items-center justify-center bg-white/80 text-gray-600 shadow-large backdrop-blur ltr:rounded-l-lg rtl:rounded-r-lg dark:bg-brand/80 dark:text-gray-200" >
                <button className="flex items-center font-medium outline-none dark:text-gray-100">
                    {/* ({tokenInfo?.icon}){' '} */}
                        <span className="ltr:ml-2 rtl:mr-2">{tokenInfo?.code} </span>
              </button>

          </div>
            
        </div>

        <div className="flex flex-1 flex-col justify-center text-right">
          <input type="text" value={value} placeholder="0.0" inputMode="decimal" onChange={(e) => {handleOnChange(e)}} className="w-full rounded-tr-lg rounded-br-lg border-0 pb-0.5 text-right text-2xl outline-none focus:ring-0 dark:bg-light-dark" {...rest}/>
        </div>
      </div>

    </>);
}
VendorReciverCoinInput.displayName = 'VendorReciverCoinInput';

