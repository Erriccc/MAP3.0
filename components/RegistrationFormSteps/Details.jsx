import { useState } from 'react';
import cn from 'classnames';


import { useStepperContext } from "/Utilities/FrontEndUtilities/FEStepperContext";
import InputLabel from '/components/ui/input-label';
import Input from '/components/ui/forms/input';
import { Switch } from '/components/ui/switch';


export default function Details() {
  const { userData, setUserData } = useStepperContext();
  const [wordCount, setwordCount] = useState(0);
  const [keyWordCount, setKeywordCount] = useState(0);
  let [hasDescription, setHasDescription] = useState(false);
  let [hasWebsite, setHasWebsite] = useState(false);
  let [hasKeyWords, setHasKeyWords] = useState(false);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name and value..", name, value)
    setUserData({ ...userData, [name]: value });
  };
 
  return (
    <div className="flex flex-col ">
         <div className="mb-8">
            <InputLabel title="Name" important/>
            <Input  placeholder="User Name" inputClassName="spin-button-hidden"
             value={userData["vendorsName"] || ""}
             onChange={(e)=>{
                 handleChange(e)
             }}
             name="vendorsName"
            />
          </div>


          {/* <div className="mb-8">
            <InputLabel title="Email" subTitle="notifications on your account will  be sent here"/>
            <Input  placeholder="email address" inputClassName="spin-button-hidden"
            value={userData["vendorsEmail"] || ""}
            onChange={(e)=>{
                handleChange(e)
            }}
            name="vendorsEmail"
            />
          </div> */}

            <div className="flex items-center justify-between gap-4 mt-5">

                <InputLabel  subTitle="Add a bio to your profile"/>
                {/* <InputLabel title="Put on marketplace" subTitle="Enter price to allow users instantly purchase your NFT"/> */}
                <div className="shrink-0">
                  <Switch checked={hasDescription} onChange={() => setHasDescription(!hasDescription)}>
                    <div className={cn(hasDescription ? 'bg-brand' : 'bg-gray-200 dark:bg-gray-700', 'relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors duration-300')}>
                      <span className={cn(hasDescription
            ? 'bg-white ltr:translate-x-5 rtl:-translate-x-5 dark:bg-light-dark'
            : 'bg-white ltr:translate-x-0.5 rtl:-translate-x-0.5 dark:bg-light-dark', 'inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform duration-200')}/>
                    </div>
                  </Switch>
                </div>
              </div>
              {hasDescription && (

                <div>
                <h4 className={`  text-green-500 text-xs italic  ${(240 - wordCount) < 50 ?  (240 - wordCount) < 25 ? "text-red-500" : "text-yellow-500" : ""}`}>description {wordCount} (max 240)</h4>
                <textarea id="vendorsBio" name='vendorsBio' maxLength="240" rows="4"
                    className={` mt-3 block p-2.5 w-full text-sm  bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  first-letter:
                    ${(240 - wordCount) < 50 ?  (240 - wordCount) < 25 ? "text-red-500" : "text-yellow-500" :""}
                    ` }
                    onChange={(e)=>{
                        handleChange(e)
                        let userInputAmountLength = e.target.value.length;
                        setwordCount(userInputAmountLength);
                    }}
                    value={userData["vendorsBio"] || ""}
                    placeholder="About You!...">
                </textarea>
            </div>
              )}


        <div className="flex items-center justify-between gap-4 mt-5">
                        <InputLabel  subTitle="Add website url to your profile"/>
                        {/* <InputLabel title="Put on marketplace" subTitle="Enter price to allow users instantly purchase your NFT"/> */}
                        <div className="shrink-0">
                        <Switch checked={hasWebsite} onChange={() => setHasWebsite(!hasWebsite)}>
                            <div className={cn(hasWebsite ? 'bg-brand' : 'bg-gray-200 dark:bg-gray-700', 'relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors duration-300')}>
                            <span className={cn(hasWebsite
                    ? 'bg-white ltr:translate-x-5 rtl:-translate-x-5 dark:bg-light-dark'
                    : 'bg-white ltr:translate-x-0.5 rtl:-translate-x-0.5 dark:bg-light-dark', 'inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform duration-200')}/>
                            </div>
                        </Switch>
                        </div>
                    </div>
                    {hasWebsite && (
                    
                    //   <PriceType value={priceType} onChange={setPriceType}/>
                    <div className="mb-8">
                    <InputLabel title="Website Url" />
                    <Input  placeholder="website Url" inputClassName="spin-button-hidden"
                    value={userData["vendorsWebsiteUrl"] || ""}
                    onChange={(e)=>{
                        handleChange(e)
                    }}
                    name="vendorsWebsiteUrl"
                    />
                </div>
                    )}


                    <div className="flex items-center justify-between gap-4 mt-5">
                    {/* <InputLabel  subTitle="Add website url to your profile"/> */}
                    <InputLabel subTitle="Add search Keywords" />
                    <div className="shrink-0">

                    <Switch checked={hasKeyWords} onChange={() => setHasKeyWords(!hasKeyWords)}>
                        <div className={cn(hasKeyWords ? 'bg-brand' : 'bg-gray-200 dark:bg-gray-700', 'relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors duration-300')}>
                        <span className={cn(hasKeyWords
                    ? 'bg-white ltr:translate-x-5 rtl:-translate-x-5 dark:bg-light-dark'
                    : 'bg-white ltr:translate-x-0.5 rtl:-translate-x-0.5 dark:bg-light-dark', 'inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform duration-200')}/>
                        </div>
                    </Switch>
                    </div>
                    </div>

                    {hasKeyWords && (


                    <div>
                    <h4 className={`  text-green-500 text-xs italic  ${(60 - keyWordCount) < 15 ?  (60 - keyWordCount) < 5 ? "text-red-500" : "text-yellow-500" : ""}`}> {keyWordCount} (max 60)</h4>
                    <textarea id="keyWords" name='keyWords'  maxLength="60" rows="4"
                    className={` mt-3 block p-2.5 w-full text-sm  bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  first-letter:
                    ${(60 - keyWordCount) < 15 ?  (60 - keyWordCount) < 5 ? "text-red-500" : "text-yellow-500" :""}
                    ` }
                    onChange={(e)=>{
                        handleChange(e)
                        let userInputAmountLength = e.target.value.length;
                        setKeywordCount(userInputAmountLength);
                    }}
                    placeholder="search keywords"
                    value={userData["keyWords"] || ""}
                    >
                    </textarea>
                    </div>
                    )}


  
               
    </div>
  );
}


// KEYWORDS SECTION
