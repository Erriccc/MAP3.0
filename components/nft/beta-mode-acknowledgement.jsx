import Image from '/components/ui/image';
import metamaskLogo from 'assets/images/metamask.svg';
// import { WalletContext } from 'lib/hooks/use-connect';
import { useModal } from '/components/modal-views/context';
import { useMoralis } from 'react-moralis'
import { useContext, useEffect } from 'react';
import { ConnectButton, Icon, Select, DatePicker, Input, Button } from "web3uikit";

export default function BetaModeAcknowledgement({ ...props }) {
    // const { address, error, connectToWallet, disconnectWallet} = useContext(WalletContext);
    const { closeModal } = useModal();
    const {isAuthenticated, account} = useMoralis()

    return (<div className="relative z-50 mx-auto max-w-full rounded-lg bg-white px-9 py-16 dark:bg-light-dark" {...props}>
      <h2 className="mb-4 text-center text-2xl font-medium uppercase text-gray-900 dark:text-white">
        WE ARE CURRENTLY IN BETA MODE
      </h2>
      <p className="text-center text-sm leading-loose tracking-tight text-gray-600 dark:text-gray-400">
        By using this website, you agree to our Terms of Service and our
        Privacy Policy.
      </p>
<div className='mt-12 flex h-14 w-full cursor-pointer items-center justify-center rounded-lg bg-blue-200 ' onClick={closeModal}>
        <span>CONTINUE</span>
</div>

      {/* {error && (<p className="mt-3 text-center text-xs text-red-500">
          we encountered an error: {error}
        </p>)} */}
    </div>);
}
