import { useStepperContext } from "/Utilities/FrontEndUtilities/FEStepperContext";
import InputLabel from '/components/ui/input-label';
import Uploader from '/components/ui/forms/uploader';
import { useState } from 'react';
import cn from 'classnames';
import Input from '/components/ui/forms/input';
import { Switch } from '/components/ui/switch';

export default function UploadImage() {
  const { userData, setUserData } = useStepperContext();
  let [hasLocalImage, setHasLocalImage] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name and value..", name, value)

    let tempUserData = {...userData}
    if (tempUserData.userImage) delete tempUserData.userImage
    tempUserData.imageUrl = value

    setUserData(tempUserData);

    // setUserData({ ...userData, ["userImage"]: null });
    // setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="flex flex-col ">
     
     <div className="flex items-center justify-between gap-4 mt-5">
                        <InputLabel  subTitle="select local image ?"/>
                        <div className="shrink-0">
                        <Switch checked={hasLocalImage} onChange={() => setHasLocalImage(!hasLocalImage)}>
                            <div className={cn(hasLocalImage ? 'bg-brand' : 'bg-gray-200 dark:bg-gray-700', 'relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors duration-300')}>
                            <span className={cn(hasLocalImage
                    ? 'bg-white ltr:translate-x-5 rtl:-translate-x-5 dark:bg-light-dark'
                    : 'bg-white ltr:translate-x-0.5 rtl:-translate-x-0.5 dark:bg-light-dark', 'inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform duration-200')}/>
                            </div>
                        </Switch>
                        </div>
                    </div>
                    {hasLocalImage ? (
                      
                     <div className="mb-8">
                     <InputLabel title="Upload file"/>
                     <Uploader
                     getSelectedFile={(data) => {
                         console.log('getSelectedFile file value:', data)
                         let tempUserData = {...userData}
                         if (tempUserData.imageUrl) delete tempUserData.imageUrl
                         tempUserData.userImage = data
                      //  setUserData({ ...userData, ["imageUrl"]: null });
                      //  setUserData({ ...userData, ["userImage"]: data });
                       setUserData(tempUserData);
                       
                       
                       }}
                     />
                   </div>
                    ):(

 
            <div className="mb-8">
            <InputLabel title="Image Url" />
            <Input  placeholder="https://cdn.pixabay.com/photo/2015/09/21/14/24/supermarket-949913__340.jpg" inputClassName="spin-button-hidden"
            value={userData["imageUrl"] || ""}
            onChange={(e)=>{
                handleChange(e)
            }}
            name="imageUrl"
            />
            </div>

                    )}
         </div>
  )
                  }















      
  // );
// }

// getCoinValue={(data) => {
//   console.log('Recivers coin value:', data)
//   setamountToBeSent(data.value)
// }}