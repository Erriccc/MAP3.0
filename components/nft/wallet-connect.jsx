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

    }, []);//

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
      {account && (<div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          <div className="relative">
          <ConnectButton /> 
          </div>
        </div>) 
        
        
        
        // : (
        //   <>
        // <Button onClick={() => openModal('WALLET_CONNECT_VIEW')} className="shadow-main hover:shadow-large">
        //   LAUNCH APP
        // </Button>
        // </>
        // )
        }
    </>);
}
