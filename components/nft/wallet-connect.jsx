import Button from '/components/ui/button';
import { WalletContext } from 'lib/hooks/use-connect';
import ActiveLink from '/components/ui/links/active-link';
import { PowerIcon } from '/components/icons/power';
import { useModal } from '/components/modal-views/context';
import {useContext, useEffect } from 'react';
import { useMoralis } from "react-moralis";
import SettingsButton from '/components/settings/settings-button';

import { toast } from 'react-toastify';


export default function WalletConnect() {
  const {isAuthenticated, account } = useMoralis();
 
  const { address,isConnected,authState,balance, connectToWallet, disconnectWallet } = useContext(WalletContext);
  // const { balance, connectToWallet, disconnectWallet } = useContext(WalletContext);

    const { openModal } = useModal();

    useEffect(() => {
      // openModal('BETA_ACKNOWLEDGE_VIEW')

    }, []);//

    useEffect(() => {

  }, []);

    return (<>
          <SettingsButton />

    {isConnected ? (
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
