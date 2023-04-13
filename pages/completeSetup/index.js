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
import { toast } from 'react-toastify';

import { useStepperContext } from "/Utilities/FrontEndUtilities/FEStepperContext";

import Details from '/components/RegistrationFormSteps/Details';
import UploadImage from '/components/RegistrationFormSteps/UploadImage';
import GeoAddress from '/components/RegistrationFormSteps/GeoAddress'; 
import Currency from '/components/RegistrationFormSteps/Currency';
import Final from '/components/RegistrationFormSteps/Final';
import { WalletContext } from 'lib/hooks/use-connect';

import ConfirmationModal from '/components/nft/confirmationModal.jsx' 



function RegisterVendor() {
  const [currentStep, setCurrentStep] = useState(1);
  const { view, isOpen, closeModal } = useModal();
  const { userData, setUserData } = useStepperContext();
  

  const { address,isConnected,currentUser, authState, provider,balance, connectToWallet, disconnectWallet } = useContext(WalletContext);


  useEffect(() => {

  let isMounted = true;
    console.log('refreshing...')
    document.documentElement.style.removeProperty('overflow');
    return () => { isMounted = false };

  }, [])
  

  const steps = [
    "Account Details",
    "Geographical Address",
    "Currency",
    "Complete"
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Details />;
      case 2:
        return <GeoAddress />;
      case 3:
        return <Currency />;
      case 4:
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
        { address && 
       <div className="my-10 p-10 ">
          <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
        </div>
          }
      </div>

      {/* navigation button */}
      {currentStep !== steps.length && (
        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
        />
       
      )}
    </DashboardLayout>
      </>
  );
}

export default RegisterVendor;
