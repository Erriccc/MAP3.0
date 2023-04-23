import React from "react";
import { WalletContext } from 'lib/hooks/use-connect';
import { useContext, useEffect, useState, useLayoutEffect } from 'react';
import ListCard from '/components/ui/list-card';
import Apphero from 'components/Apphero'
import { useRouter } from "next/dist/client/router";
import { NextSeo } from 'next-seo';
import { useCopyToClipboard } from 'lib/hooks/use-copy-to-clipboard';
import DashboardLayout from 'layouts/_dashboard';
import Button from '/components/ui/button';
import AnchorLink from '/components/ui/links/anchor-link';
import { Copy } from '/components/icons/copy'; 
import { Check } from '/components/icons/check';
import AuthorInformation from '/components/author/author-information';
import TransactionHistory from '/components/author/transaction-history';
import TransactionSearchForm from '/components/author/transaction-search-form';
import Utils from'/Utilities/utils';
import { useModal } from '/components/modal-views/context';
import { useUrlContext } from "/Utilities/FrontEndUtilities/FEUrlContext";
import { toast } from 'react-toastify';
import VendorQrCode from '/components/VendorQrCodeBig';

import routes from 'config/routes';


// static data
import { authorData } from 'data/static/author';
// export const getStaticProps = async () => {
//     return {
//         props: {},
//     };
// };
const AuthorProfilePage = () => {

  const router = useRouter()
  const { address,isConnected,currentUser, authState, provider,balance, connectToWallet, disconnectWallet } = useContext(WalletContext);

  let [copyButtonStatus, setCopyButtonStatus] = useState(false);
    let [_, copyToClipboard] = useCopyToClipboard();
    const handleCopyToClipboard = () => {
        copyToClipboard(address);
        setCopyButtonStatus(true);
        setTimeout(() => {
            setCopyButtonStatus(copyButtonStatus);
        }, 2500);
    };
    const { currentUrl,setCurrentUrl} = useUrlContext();

  const { openModal } = useModal();

  useEffect(() => {

    console.log('refreshing...') 
    document?.documentElement.style.removeProperty('overflow');
  // (async function() {
  //   console.log("validation is false")
    
  // })();
    }, [currentUser])



    useEffect(() => {

    address && setCurrentUrl(`${Utils.Map3WebsiteUrl}/pay/${address}`);
   
    }, [address,isConnected])

    return (<>
      <NextSeo title="Profile" description="Map3 profiles - find crypto friendly businesses near you, and make crypto payments in your preferred currency."/>
      <DashboardLayout>
        {/* Profile Cover Image */}
        {currentUser && 
        
        (<div>
        <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]">
                  <div className="bg-cover bg-center" 
              // style="background-image: url(...)"
              style={{ backgroundImage:`url(${currentUser?.vendorsImageUrl && currentUser.vendorsImageUrl})`,
              width: '100%',
              height: '100%',
            }}
              ></div>
        </div>

        {/* Profile Container */}
        <div className="mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
          {/* Profile Image */}
           <img className="relative z-5 -mt-12 w-20 h-20 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" 
       
        src = {currentUser?.vendorsImageUrl && currentUser.vendorsImageUrl}
        alt="user image avatar"
        />
          {/* Profile Info */}
          <div className="flex w-full flex-col pt-4 md:flex-row md:pt-10 lg:flex-row xl:pt-12">
            <div className="shrink-0 border-dashed border-gray-200 dark:border-gray-700 md:w-72 ltr:md:border-r md:ltr:pr-7 rtl:md:border-l md:rtl:pl-7 lg:ltr:pr-10 lg:rtl:pl-10 xl:ltr:pr-14 xl:rtl:pl-14 2xl:w-80 3xl:w-96 3xl:ltr:pr-16 3xl:rtl:pl-16">
              <div className="text-center ltr:md:text-left rtl:md:text-right">
                {/* Name */}
                <h2 className="text-xl font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl">
                  {currentUser?.vendorsName}
                </h2>
                {/* Username */}
                <div className="mt-1 text-sm font-medium tracking-tighter text-gray-600 dark:text-gray-400 xl:mt-3">
                  @{currentUser?.vendorsEmail}
                </div>

                {/* User ID and Address */}
                <div className="mt-5 inline-flex h-9 items-center rounded-full bg-white shadow-card dark:bg-light-dark xl:mt-6">
                  <div className="inline-flex h-full shrink-0 grow-0 items-center rounded-full bg-gray-900 px-4 text-xs text-white sm:text-sm"
                   onClick={async ()=>{
                    router.push({
                      pathname: routes.completeSetup
                    });
                  }}
                  >
                    {/* #{authorData?.id} */}
                    EDIT PROFILE 
                  </div>
                  <div className="text w-28 grow-0 truncate text-ellipsis bg-center text-xs text-gray-500 ltr:pl-4 rtl:pr-4 dark:text-gray-300 sm:w-32 sm:text-sm">
                    {address}
                  </div>
                  <div className="flex cursor-pointer items-center px-4 text-gray-500 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" title="Copy Address" onClick={handleCopyToClipboard}>
                    {copyButtonStatus ? (<Check className="h-auto w-3.5 text-green-500"/>) : (<Copy className="h-auto w-3.5"/>)}
                  </div>
                </div>
              </div>
              <div className=" flex mt-10  flex-wrap items-center justify-center gap-6 border-y border-dashed border-gray-200 py-5 text-center dark:border-gray-700 ">
                  <Button color="white" className="shadow-card dark:bg-light-dark md:h-10 md:px-5 xl:h-12 xl:px-7" 
                   onClick={() => openModal('SHARE_VIEW')}
                   >
                    Share
                  </Button>
                </div>
              {/* <AuthorInformation className="hidden md:block" data={authorData}/> */}
            </div>
           
            <div className="grow pt-6 pb-9 md:-mt-2.5 md:pt-1.5 md:pb-0 md:ltr:pl-7 md:rtl:pr-7 lg:ltr:pl-10 lg:rtl:pr-10 xl:ltr:pl-14 xl:rtl:pr-14 3xl:ltr:pl-16 3xl:rtl:pr-16">
              {/* <TransactionSearchForm /> */}
                        {/* Social */}
                        {/* <div className="border-y border-dashed border-gray-200 py-5 dark:border-gray-700 xl:py-6"> */}
                        <VendorQrCode  
                          url={`${Utils.Map3WebsiteUrl}pay/${address}`}
                          />

                        {/* </div> */}
              {/* <TransactionHistory /> */}
            </div>
          </div>
        </div>
        
        </div>)
}
      </DashboardLayout>
    </>);
};
export default AuthorProfilePage;
