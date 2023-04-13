import React from "react";
import { WalletContext } from 'lib/hooks/use-connect';
import { useContext, useEffect, useState } from 'react';
import ListCard from '/components/ui/list-card';
import Apphero from 'components/Apphero'
import { useRouter } from "next/dist/client/router";
import { NextSeo } from 'next-seo';
import { useCopyToClipboard } from 'lib/hooks/use-copy-to-clipboard';
import DashboardLayout from 'layouts/_dashboard';
import Button from '/components/ui/button';
import Image from '/components/ui/image';
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
// import GenerateQrCodes from '/components/ui/forms/GenerateQrCodes';
import GenerateQrCodes from '/components/GenerateQrCodes';

 

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


          //   const tagDisplayArray = (sweetArray) => {
          //     let tobj = {};

          //     sweetArray.map(function(currentValue, index){
          //       tobj.id = index;
          //       tobj.name = currentValue;

          //     })


          //     // sweetArray.map(sweetItem => {
                
          //     return [{id:  i}]
          // // })

          // }


          // const reformattedArray = kvArray.map(({ key, value }) => ({ id: key, name: value }));

  useEffect(() => {

    address && setCurrentUrl(`${Utils.Map3WebsiteUrl}/pay/${address}`);
   

  (async function() {
      console.log("validation is false")
  })();
    }, [address,isConnected,currentUser])


  // // // UNCOMMENT to AUTHENTICATE!!!!
  // if (!account) {
  //   // if (process.browser){
  //   //   router.push({
  //   //     pathname: "/"
  //   //   });
  //   // }
  //   return (
  //     <Apphero/>
  //   )
  // }

    return (<>
      <NextSeo title="Profile" description="Map3 profiles - find crypto friendly businesses near you, and make crypto payments in your preferred currency."/>
      <DashboardLayout>
        {/* Profile Cover Image */}
        {currentUser && 
        
        (<div>
        <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]">
          <Image 
          // src={currentUser?.vendorsImageUrl}  
          src = {`/api/imagefetcher?url=${encodeURIComponent(
            currentUser?.vendorsImageUrl
          )}`}

          layout="fill" objectFit="cover" alt="Cover Image"/>
        </div>

        {/* Profile Container */}
        <div className="mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
          {/* Profile Image */}
          <div className="relative z-5 mx-auto -mt-12 h-24 w-24 shrink-0 overflow-hidden rounded-full border-[5px] border-white shadow-large dark:border-gray-500 sm:-mt-14 sm:h-28 sm:w-28 md:mx-0 md:-mt-16 md:h-32 md:w-32 xl:mx-0 3xl:-mt-20 3xl:h-40 3xl:w-40 3xl:border-8">
            <Image 
            // src={currentUser?.vendorsImageUrl}  
            src = {`/api/imagefetcher?url=${encodeURIComponent(
              currentUser?.vendorsImageUrl
            )}`}
            layout="fill" objectFit="cover" className="rounded-full" alt="Author"/>
          </div>
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
                  <div className="inline-flex h-full shrink-0 grow-0 items-center rounded-full bg-gray-900 px-4 text-xs text-white sm:text-sm">
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
                  <Button color="white" className="shadow-card dark:bg-light-dark md:h-10 md:px-5 xl:h-12 xl:px-7"  onClick={() => openModal('SHARE_VIEW')}>
                    Share
                  </Button>
                </div>
              {/* <AuthorInformation className="hidden md:block" data={authorData}/> */}
              <AuthorInformation className="hidden md:block" 
                 data={
                  {websiteUrl:currentUser.vendorsWebsiteUrl,
                  description:currentUser.vendorsBio,}
                  }/>
            </div>
           
            <div className="grow pt-6 pb-9 md:-mt-2.5 md:pt-1.5 md:pb-0 md:ltr:pl-7 md:rtl:pr-7 lg:ltr:pl-10 lg:rtl:pr-10 xl:ltr:pl-14 xl:rtl:pr-14 3xl:ltr:pl-16 3xl:rtl:pr-16">
              {/* <TransactionSearchForm /> */}

                                <div className="">
                        {/* Bio */}
                        <div className="border-y border-dashed border-gray-200 py-5 dark:border-gray-700 xl:py-6">
                          <div className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
                          Street Address
                          </div>
                          <div className="text-sm leading-6 tracking-tighter text-gray-600 dark:text-gray-400">
                            {currentUser?.vendorsStreetAddress}
                          </div>
                        </div>

                        {/* Social */}
                        <div className="border-y border-dashed border-gray-200 py-5 dark:border-gray-700 xl:py-6">
                        <GenerateQrCodes  
                          url={`${Utils.Map3WebsiteUrl}pay/${address}`}
                          />
                          <div className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
                            TAGS
                          </div>

                          <div className="mt-4 flex flex-wrap gap-3 sm:mt-5 lg:mt-6">
                            {currentUser.keyWords &&  
                            currentUser.keyWords.toString().split(/[, ]+/).map(function(val, index){
                              return { name: val, id: index };
                          }).map((item) => (<div key={item?.id} role="button">
                                <ListCard item={item} className="shrink-0 rounded-full p-2 transition-transform hover:-translate-y-0.5 hover:bg-gray-50 focus:-translate-y-0.5 focus:bg-gray-50 ltr:pr-5 rtl:pl-5"/>
                              </div>))}
                          </div>

                        </div>
                      </div>

              {/* <TransactionHistory /> */}
            </div>
            {/* <AuthorInformation data={authorData}/> */}
            {/* <AuthorInformation 
            data={
              {websiteUrl:currentUser.vendorsWebsiteUrl,
              description:currentUser.vendorsBio,}
              }/> */}
              
              
          </div>
        </div>
        
        </div>)
}
      </DashboardLayout>
    </>);
};
export default AuthorProfilePage;
