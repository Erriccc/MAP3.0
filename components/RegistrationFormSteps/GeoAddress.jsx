


import { useState } from 'react';
import cn from 'classnames';
// import { useStepperContext } from "../../contexts/StepperContext";
import { useStepperContext } from "/Utilities/FrontEndUtilities/FEStepperContext";
import InputLabel from '/components/ui/input-label';
import Input from '/components/ui/forms/input';
import { Switch } from '/components/ui/switch';

export default function GeoAddress() {
  const { userData, setUserData } = useStepperContext();
  let [hasGeoAddress, setHasGeoAddress] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div className="flex flex-col ">
       <div className="flex items-center justify-between gap-4 mt-5">
                        <InputLabel  subTitle="Add physical address to your profile"/>
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
                    
                    //   <PriceType value={priceType} onChange={setPriceType}/>
                    <div className="mb-8">
                    <InputLabel title="address" />
                    <Input  placeholder="123 street Avenue" inputClassName="spin-button-hidden"
                    value={userData["geoAddress"] || ""}
                    onChange={(e)=>{
                        handleChange(e)
                    }}
                    name="geoAddress"
                    />
                </div>
                    )}

    </div>
  );
}