import { useState } from "react";
import Stepper from "/components/RegistrationFormSteps/Stepper";
import StepperControl from "/components/RegistrationFormSteps/StepperControl";
import { UseContextProvider } from "/Utilities/FrontEndUtilities/FEStepperContext";
import DashboardLayout from 'layouts/_dashboard';
import { NextSeo } from 'next-seo';

// import Account from "./components/steps/Account";
import UploadImage from "/components/RegistrationFormSteps/UploadImage";
import Currency from "/components/RegistrationFormSteps/Currency";
import GeoAddress from "/components/RegistrationFormSteps/GeoAddress.jsx";
import Details from "/components/RegistrationFormSteps/Details";
import Wallet from "/components/RegistrationFormSteps/Wallet";
import Final from "/components/RegistrationFormSteps/Final.jsx";
// import Details from "./components/steps/Details";
// import Payment from "./components/steps/Payment";
// import Final from "./components/steps/Final";



function App() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    // "Email",
    "Account Details",
    "Upload Image",
    "Geographical Address",
    "Currency",
    "Wallet address",
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
        return <Wallet />;
      case 6:
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


    <div className="mx-auto rounded-2xl bg-white dark:bg-gray-800 pb-2 shadow-xl md:w-1/2">
      {/* Stepper */}
      <div className="horizontal container mt-5 ">
        <Stepper steps={steps} currentStep={currentStep} handleClick={handleClick} />

        <div className="my-10 p-10 ">
          <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
        </div>
      </div>

      {/* navigation button */}
      {currentStep !== steps.length && (
        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
        />
      )}
    </div>

    </DashboardLayout>
      </>
  );
}

export default App;