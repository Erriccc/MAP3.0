import ActiveLink from '/components/ui/links/active-link';
import { FlashIcon } from '/components/icons/flash';
import { WalletContext } from 'lib/hooks/use-connect';
import {useContext, useEffect } from 'react';
import Image from '/components/ui/image';


function NotificationButton() {
  return (<ActiveLink href="/notifications">
    <div className="relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-100 bg-white text-brand shadow-main transition-all hover:-translate-y-0.5 hover:shadow-large focus:-translate-y-0.5 focus:shadow-large focus:outline-none dark:border-gray-700 dark:bg-light-dark dark:text-white sm:h-12 sm:w-12">
      <FlashIcon className="h-auto w-3 sm:w-auto"/>
      <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-brand shadow-light sm:h-3 sm:w-3"/>
    </div>
  </ActiveLink>); 
}
 
export default function AuthorCard({ image, name, role }) {
  const { address,isConnected,currentUser, balance} = useContext(WalletContext);
  
    return (
      <ActiveLink href="/profile">
    
    <div className="flex items-center rounded-lg bg-gray-100 p-5 dark:bg-light-dark">
    <div className="relative mx-auto h-20 w-20 shrink-0 overflow-hidden rounded-full border-[5px] border-white shadow-large dark:border-gray-500 md:mx-0  3xl:border-8">
            <Image 
            // src={currentUser?.vendorsImageUrl}  
            src = {`/api/imagefetcher?url=${encodeURIComponent(
              currentUser?.vendorsImageUrl
            )}`}
            layout="fill" objectFit="contain" className="rounded-full" alt="Author"/>
          </div>
      {/* <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border-3 bg-gradient-to-r from-green-300 to-gray-300 border-white drop-shadow-main dark:border-gray-400">
      </div> */}
      <div className="ltr:pl-3 rtl:pr-3">
        {address && (
        <div className=''>
              <span className="rounded-lg bg-gray-100 px-2 py-1 text-sm tracking-tighter dark:bg-gray-800">
                  {/* {address?.slice(0, 6)}
                  {'...'}
                  {address?.slice(address.length - 6)} */}
                  {currentUser?.vendorsName}
                  {/* {magicEmail.split('@')[0]} */}
                </span>
                    <div className="mt-3 font-medium uppercase tracking-wider text-gray-900 dark:text-white">
                    {balance?.slice(0, 8)} ETH
                  </div>
          </div>
                      )}
      </div>

    </div>
    </ActiveLink>
    );
}
//