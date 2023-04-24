import { useState, useContext, useEffect,useLayoutEffect} from "react";
import Utils from'/Utilities/utils';
import { UseContextProvider } from "/Utilities/FrontEndUtilities/FEStepperContext";
import DashboardLayout from 'layouts/_dashboard';
import { NextSeo } from 'next-seo';
// import dynamic from 'next/dynamic';

import { useStepperContext } from "/Utilities/FrontEndUtilities/FEStepperContext";

import ProfileSettings from '/components/RegistrationFormSteps/ProfileSettings';





function RegisterVendor() {

  useEffect(() => {
    let isMounted = true;
      console.log('refreshing...')
      document.documentElement.style.removeProperty('overflow');
      return () => { isMounted = false };
  
    }, [])

  return (

    <>
    <NextSeo title="sign up" description="Map3 - sign up new vendor profiles"/>
   <DashboardLayout>
      <UseContextProvider>
        <ProfileSettings/>
    </UseContextProvider>

    </DashboardLayout>
      </>
  );
}

export default RegisterVendor;
