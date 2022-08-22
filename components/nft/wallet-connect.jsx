import Button from '/components/ui/button';
import { WalletContext } from 'lib/hooks/use-connect';
import { Menu } from '/components/ui/menu';
import { Transition } from '/components/ui/transition';
import ActiveLink from '/components/ui/links/active-link';
import { ChevronForward } from '/components/icons/chevron-forward';
import { PowerIcon } from '/components/icons/power';
import { useModal } from '/components/modal-views/context';
import {useContext, useEffect } from 'react';
import { useMoralis } from "react-moralis";
import { ConnectButton, Icon, Select, DatePicker, Input } from "web3uikit";

import {getCurrentWalletAddress } from'../../Utilities/utils';
const  { ethers }=require( "ethers"); // from hardhat throws error "Can't resolve 'console'"
const d = new Date();
let time = d.getTime();
console.log(time)
function getRandomNonce (_time){
  let randomString1 = randomString(10);
  let randomString2 = randomString(20);
  let randomString13 = randomString(3);
  let finalRandomString = Math.random()*10**3
let stringifiedTime = _time.toString()
  let salt = randomString1 + randomString2 + randomString13 +finalRandomString +stringifiedTime
  return salt

}

// randomString(Math.random(time)*10**3)
const randomString = function(length) {

  var text = "fghjkl;po8765rfvbnmlp0987632qwsdfghu76tghjui876tgbnkjbvfrtyhjkl;';/'.,mjhgfvbnjhtred";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789?><:}{|=-)(*#@!$%";
  for(var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}


export default function WalletConnect() {
  const {isAuthenticated, account } = useMoralis();

  const { address,error, balance, connectToWallet, disconnectWallet } = useContext(WalletContext);

    const { openModal } = useModal();

    useEffect(() => {
      openModal('BETA_ACKNOWLEDGE_VIEW')

    }, []);

    useEffect(() => {
      async function checkConnection() {

              if (window && window.ethereum) {
        // const _provider = new ethers.providers.Web3Provider(window.ethereum)
        // const signer = _provider.getSigner();

        // console.log("signer is : ", signer)

                  if (account) {
                    // if (signer) { // use this if the signin logic
                  // console.log(" isAuthenticated address bloc from wallet-connect pagek", signer)
                      await connectToWallet();
                  } else {
              console.log('!isAuthenticated from wallet-connect.jxs');
              disconnectWallet()
                  }
              }
              else {
                  alert('Please install A Blockchain Wallet to use App');
              }
      }
      checkConnection();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

//

    return (<>
      {account ? (<div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          <div className="relative">
            <Menu>
            
              <Menu.Button className="block h-10 w-10 overflow-hidden rounded-full border-3 border-solid border-white bg-gradient-to-r from-green-300 to-gray-300 shadow-main transition-all hover:-translate-y-0.5 hover:shadow-large dark:border-gray-700 sm:h-12 sm:w-12"></Menu.Button>
              <Transition enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4" enterTo="opacity-100 translate-y-0" leave="ease-in duration-300" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-4">
                <Menu.Items className="absolute justify-center mt-3 w-72 origin-top-right rounded-lg bg-white shadow-large dark:bg-gray-900 sm:-right-14">
                  {/* <Menu.Item>
                    <div className="border-b border-dashed  border-gray-200 p-3 dark:border-gray-700">
                      <ActiveLink href="/notifications" className="flex items-center gap-3 rounded-lg py-2.5 px-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800">
                        <span className="h-8 w-8 rounded-full border-2 border-solid border-white bg-gradient-to-r from-green-300 to-gray-300 dark:border-gray-700"></span>
                        <span className="grow uppercase">
                          transactions
                        </span> 
                        <ChevronForward />
                      </ActiveLink>
                    </div>
                  </Menu.Item> */}
                  <Menu.Item>
                    <Menu.Item>
                      <div className="border-b border-dashed border-gray-200 px-6 py-5 dark:border-gray-700">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-medium -tracking-tighter text-gray-600 dark:text-gray-400">
                            Balance
                          </span>
                          <span className="rounded-lg bg-gray-100 px-2 py-1 text-sm tracking-tighter dark:bg-gray-800">
                            {account.slice(0, 6)}
                            {'...'}
                            {account.slice(account.length - 6)}
                          </span>
                        </div>
                        <div className="mt-3 font-medium uppercase tracking-wider text-gray-900 dark:text-white">
                          {balance} ETH
                        </div>
                      </div>
                    </Menu.Item>
                  </Menu.Item>
                  {/* <Menu.Item>
                    <div className="p-3">
                      <div className="flex cursor-pointer items-center gap-3 rounded-lg py-2.5 px-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800" onClick={() => openModal('WALLET_CONNECT_VIEW')}>
                        </div>
                      <div className="flex cursor-pointer items-center gap-3 rounded-lg py-2.5 px-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800" onClick={disconnectWallet}>
                        <PowerIcon />
                        <span className="grow uppercase">Disconnect</span>
                      </div>
                    </div>
                  </Menu.Item> */}
                </Menu.Items>
              </Transition>
            </Menu>

          </div>

          {/* <ActiveLink href="/create-nft"> */}
            {/* <Button className="shadow-main hover:shadow-large">CREATE</Button> */}
          {/* </ActiveLink> */}
          <ConnectButton /> 

        </div>) : (
          <>
        <ConnectButton  signingMessage={getRandomNonce(time)}/> 
        {/* <Button onClick={() => openModal('WALLET_CONNECT_VIEW')} className="shadow-main hover:shadow-large">
          LAUNCH APP
        </Button> */}
        </>
        )}
    </>);
}
