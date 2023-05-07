


import { useState } from 'react';
import cn from 'classnames';
// import { useStepperContext } from "../../contexts/StepperContext";
import { useStepperContext } from "/Utilities/FrontEndUtilities/FEStepperContext";
import InputLabel from '/components/ui/input-label';
import Input from '/components/ui/forms/input';
import { Switch } from '/components/ui/switch';
import useInput from "/lib/hooks/useInput";

export default function GeoAddress() { 

  const { userData, setUserData } = useStepperContext();
  const address = useInput(userData?.vendorsStreetAddress); 
  // const address = useInput(userData.vendorsStreetAddress); 

  let [hasGeoAddress, setHasGeoAddress] = useState(true);

  const handleGeoCode = (suggestion) => {
        const addrressLong = suggestion.geometry.coordinates[0]
        const addrressLat = suggestion.geometry.coordinates[1]
        const addrressName = suggestion.place_name

    setUserData({ ...userData,
  ['vendorsLat']:addrressLat,
  ['vendorsLong']:addrressLong,
  ['vendorsStreetAddress']: addrressName, 

  });
      console.log('long and lat', addrressLong, addrressLat)
      address.setValue(suggestion.place_name);
      address.setSuggestions([]);


  }; 
  return ( 
    <div className="flex flex-col ">
       <div className="flex items-center justify-between gap-4 mt-5">
                        <InputLabel  subTitle="Get on the Map"/>
                        {/* <InputLabel title="Put on marketplace" subTitle="Enter price to allow users instantly purchase your NFT"/> */}
                        <div className="shrink-0">
                        <Switch checked={hasGeoAddress} onChange={() => setHasGeoAddress(!hasGeoAddress)}>
                            <div className={cn(hasGeoAddress ? 'bg-brand' : 'bg-gray-200 dark:bg-gray-700', 'relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors duration-300')}>
                            <span className={cn(hasGeoAddress
                    ? 'bg-white ltr:translate-x-5 rtl:-translate-x-5 dark:bg-light-dark'
                    : 'bg-white ltr:translate-x-0.5 rtl:-translate-x-0.5 dark:bg-light-dark', 'inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform duration-200')}/>
                            </div>
                        </Switch>
                        </div>
                    </div>
                    {hasGeoAddress && (
                    <div className="mb-8">
                    <InputLabel title="address" />
                    <Input  autoComplete="off" placeholder="123 street Avenue" inputClassName=""
                    value={ 
                      userData.vendorsStreetAddress}
                    // value={address? address : ""}
                    {...address}
                    name="geoAddress"
                    /> 
        {address.suggestions?.length > 0 && (
            <ul role="listbox" className="py-3">
                {address.suggestions.map((suggestion, index) => {
                  return (
                    <li key={index} role="listitem" tabIndex={index} onClick={() => handleGeoCode(suggestion)} className="mb-1 flex cursor-pointer items-center gap-3 py-1.5 px-6 outline-none hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-600">
                        <span className="text-sm tracking-tight text-gray-600 dark:text-white">
                          {suggestion.place_name}
                        </span>
                      </li>
                    );
                  })}
            </ul>
              )}
        </div>
      )}
    </div>
  );
}