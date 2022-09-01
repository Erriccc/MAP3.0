import { useState, useContext, useEffect,useLayoutEffect} from "react";
import Utils from'/Utilities/utils';
import Stepper from "/components/RegistrationFormSteps/Stepper";
import StepperControl from "/components/RegistrationFormSteps/StepperControl";
import { UseContextProvider } from "/Utilities/FrontEndUtilities/FEStepperContext";
import DashboardLayout from 'layouts/_dashboard';
import { NextSeo } from 'next-seo';
import Button from '/components/ui/button';
import { useModal } from '/components/modal-views/context';
// import dynamic from 'next/dynamic';
import { useNotification } from "web3uikit";
import { useStepperContext } from "/Utilities/FrontEndUtilities/FEStepperContext";

import Details from '/components/RegistrationFormSteps/Details';
import UploadImage from '/components/RegistrationFormSteps/UploadImage';
import GeoAddress from '/components/RegistrationFormSteps/GeoAddress';
import Currency from '/components/RegistrationFormSteps/Currency';
import Final from '/components/RegistrationFormSteps/Final';

import ConfirmationModal from '/components/nft/ConfirmationModal.jsx'



function RegisterVendor() {
  const [currentStep, setCurrentStep] = useState(1);
  const { view, isOpen, closeModal } = useModal();
  const { userData, setUserData } = useStepperContext();
  



  useEffect(() => {

  let isMounted = true;
    console.log('refreshing...')
    document.documentElement.style.removeProperty('overflow');
    return () => { isMounted = false };

  }, [])
  

  const steps = [
    "Account Details",
    "Upload Image",
    "Geographical Address",
    "Currency",
    "Complete"
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Details />;
      case 2:
        return <UploadImage />;
      case 3:
        return <GeoAddress />;
      case 4:
        return <Currency />;
      case 5:
        return <Final />;
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    if(typeof direction == "number")  {
        newStep = direction ;
     // check if steps are within bounds
     newStep >= 0 && newStep <= steps.length && setCurrentStep(newStep);
    }else{

    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    }
  };

  return (

    <>
    <NextSeo title="sign up" description="Map3 - sign up new vendor profiles"/>
    <DashboardLayout>
      <div className="horizontal container mt-5 ">
        <Stepper steps={steps} currentStep={currentStep} handleClick={handleClick} />

        <div className="my-10 p-10 ">
          <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
        </div>
      </div>

      {/* navigation button */}
      {/* <ConfirmationModal confirmationTitle = "Payment was successful"/> */}
      {currentStep !== steps.length && (
        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
        />
       
      )}
    {/* </div> */}
    </DashboardLayout>
      </>
  );
}

export default RegisterVendor;


// {
//     aboutVendor: "bio here"
// email: "hello email"
// geoAddress: "2548 w augusta blvd"
// imageUrl: "https://cdn.pixabay.com/photo/2015/09/21/14/24/supermarket-949913__340.jpg"
// userName: "hello name"
// userWallet: "0x6fe4668722e3195fa897217a4bdd6ee1d289543f"
// vendorKeywords: "test, key, words, for, new, vendor"
// websiteUrl: "websiteurl.com"
// }

// userImage: Array(1)
// 0: File {path: 'benefit-two.png', preview: 'blob:http://localhost:3000/f609e4cd-5d1d-4794-9a80-3c4688a5b3af', name: 'benefit-two.png', lastModified: 1655080987124, lastModifiedDate: Sun Jun 12 2022 19:43:07 GMT-0500 (Central Daylight Time), …}
// length: 1



// async function handleSubmit (files) {
//     // don't reload the page!
//     console.log('> 📦 creating web3.storage client')
//     const client = new Web3Storage({ token })

//     console.log('> 🤖 chunking and hashing the files (in your browser!) to calculate the Content ID')
//     const cid = await client.put(files, {
//       onRootCidReady: localCid =>{},
//       onStoredChunk: bytes =>{}
//     })
//     // console.log(`> ✅ web3.storage now hosting ${cid}`)
//     showLink(`https://dweb.link/ipfs/${cid}`)

//     // console.log('> 📡 fetching the list of all unique uploads on this account')
//     let totalBytes = 0
//     for await (const upload of client.list()) {
//       // console.log(`> 📄 ${upload.cid}  ${upload.name}`)
//       totalBytes += upload.dagSize || 0
//     }
//     console.log(`> ⁂ ${totalBytes.toLocaleString()} bytes stored!`)
//   }
