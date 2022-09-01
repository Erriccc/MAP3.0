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
import SettingsButton from '/components/settings/settings-button';

// import { ConnectButton, Icon, Select, DatePicker, Input } from "web3uikit";
import { useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName, } from 'wagmi'
import { useNotification } from "web3uikit";

import {getCurrentWalletAddress } from'../../Utilities/utils';
const  { ethers }=require( "ethers"); // from hardhat throws error "Can't resolve 'console'"



export default function WalletConnect() {
  const {isAuthenticated, account } = useMoralis();
  const dispatch = useNotification();
    const handleError= (msg) => {
      dispatch({
        type: "error",
        message: `${msg}`,
        title: "failed",
        position: "bottomR",
      });
    };
 
  const { address,balance, connectToWallet, disconnectWallet } = useContext(WalletContext);
  // const { balance, connectToWallet, disconnectWallet } = useContext(WalletContext);

    const { openModal } = useModal();

    useEffect(() => {
      // openModal('BETA_ACKNOWLEDGE_VIEW')

    }, []);//

    useEffect(() => {

  }, []);

    return (<>
          <SettingsButton />

    {account ? (
          <div className="relative">
                      <div className="flex cursor-pointer items-center gap-3 rounded-lg py-2.5 px-3 text-sm font-medium bg-red-300  text-gray-900 transition hover:bg-red-100 dark:text-white dark:hover:bg-red-200" onClick={disconnectWallet}>
                        <PowerIcon />
                        <span className="grow uppercase">Sign Out</span>
                      </div>
                    </div>
        ) 
        : (
          <div className="relative">

        <Button onClick={async ()=>{
          // await connectToWallet(false)
          openModal('WALLET_CONNECT_VIEW')
        }
          } className="shadow-main hover:shadow-large">
        Sign In
        </Button>
        </div>
        )
        }
    </>);
}
