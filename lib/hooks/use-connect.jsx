import { useEffect, useState, createContext } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { useMoralis, useNFTBalances, useNativeBalance } from "react-moralis";
import {getCurrentWalletAddress } from'../../Utilities/utils';
const web3modalStorageKey = 'WEB3_CONNECT_CACHED_PROVIDER';
import {provider} from'../../Utilities/utils';

export const WalletContext = createContext({});


export const WalletProvider = ({ children }) => {
    const { Moralis, account, isAuthenticated } = useMoralis();
    const [address, setAddress] = useState(undefined);
    const [balance, setBalance] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);//

    const web3Modal = typeof window !== 'undefined' && new Web3Modal({ cacheProvider: true });
    const setWalletAddress = async () => {
        try {
            const signer = provider.getSigner();
            if (signer) {
                const web3Address = await signer.getAddress();
                setAddress(web3Address);
                getBalance(provider, web3Address);
            }
        }
        catch (error) {
            console.log('Account not connected; logged from setWalletAddress function');
        }
    };
    const getBalance = async (walletAddress) => {
        const walletBalance = await provider.getBalance(walletAddress);
        const balanceInEth = ethers.utils.formatEther(walletBalance);
        setBalance(balanceInEth);
    };
    const disconnectWallet = async () => {
        setAddress(undefined);
        web3Modal && web3Modal.clearCachedProvider();
        console.log("logged out");
    };
    const checkIfExtensionIsAvailable = () => {
        if ((window && window.web3 === undefined) ||
            (window && window.ethereum === undefined)) {
            setError(true);
            web3Modal && web3Modal.toggleModal();
        }
    };
    const connectToWallet = async () => {
        try {
            setLoading(true);
            // await subscribeProvider(connection);
            setAddress(await getCurrentWalletAddress());
            setAddress(account);
            await getBalance(account)
            setLoading(false);
        }
        catch (error) {
            setLoading(false);
            console.log(error, 'got this error on connectToWallet catch block while connecting the wallet');
        }
    };
    const subscribeProvider = async (connection) => {
        connection.on('close', () => {
            disconnectWallet();
        });
        connection.on('accountsChanged', async (accounts) => {
            if (accounts?.length) {
                setAddress(accounts[0]);
                const provider = new ethers.providers.Web3Provider(connection);
                getBalance(provider, accounts[0]);
            }
            else {
                disconnectWallet();
            }
        });
    };
    return (<WalletContext.Provider value={{
            address,
            balance,
            loading,
            error,
            connectToWallet,
            disconnectWallet,
        }}>
      {children}
    </WalletContext.Provider>);
};
