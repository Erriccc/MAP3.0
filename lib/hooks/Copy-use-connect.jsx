import { useEffect, useState, createContext } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { useMoralis, useNFTBalances, useNativeBalance } from "react-moralis";
import {getCurrentWalletAddress } from'../../Utilities/utils';
const web3modalStorageKey = 'WEB3_CONNECT_CACHED_PROVIDER';
const walletConnectStorageKey = 'walletconnect';
const injectedProviderConnectStorageKey = 'injectedProvider';
import {provider} from'../../Utilities/utils';

export const WalletContext = createContext({});
 

export const WalletProvider = ({ children }) => {
    const { Moralis, enableWeb3, account, isWeb3Enabled, isAuthenticated, authenticate, logout, deactivateWeb3} = useMoralis();
    const [address, setAddress] = useState(undefined);
    const [balance, setBalance] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);//
    const [isConnected, setIsConnected] = useState(false);


    // const web3Modal = typeof window !== 'undefined' && new Web3Modal({ cacheProvider: true });


    useEffect(() => { 
        async function checkConnection() {
        preventInitialConnection();
                    // Check if web3modal wallet connection is available on storage
                    if (localStorage.getItem(walletConnectStorageKey) || localStorage.getItem(injectedProviderConnectStorageKey) ) {
                        console.log('found connection.')
                        try {

                                    if(localStorage.getItem(walletConnectStorageKey)){
                                        await enableWeb3({provider: 'walletconnect'})  
                                         // const connection = await enableWeb3({
                                        //     provider: 'walletconnect'
                                        //     chainId: Utils.networkId
                                        // });
                                    }else{
                                        await enableWeb3()
                                    }
                                console.log(Moralis.connector, 'useEffect Moralis.connector')
                                setIsConnected(true)
                                setAddress(account)
                                if(account) await getBalance(account);
                            }
                            catch (error) {
                                console.log(error, 'Catch error Account is not connected');
                            }
                }
            else {
                console.log('connection lost');
            }
           
        }
        checkConnection();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected, account, isWeb3Enabled]);


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
        // web3Modal && web3Modal.clearCachedProvider();
        localStorage.removeItem(walletConnectStorageKey)
        localStorage.removeItem(injectedProviderConnectStorageKey)
        await deactivateWeb3()
        console.log("logged out");
    };
    const checkIfExtensionIsAvailable = () => {
        if ((window && window.web3 === undefined) ||
            (window && window.ethereum === undefined)) {
            setError(true);
            // web3Modal && web3Modal.toggleModal();
        }
    };

    const preventInitialConnection = async () => {

        try{
                if (localStorage.getItem(walletConnectStorageKey) || isWeb3Enabled || localStorage.getItem(injectedProviderConnectStorageKey)){
                    // setWeb3ModalConnectionInstance(localStorage.getItem(web3modalStorageKey));
                    setIsConnected(true)
                }else{
                }
            } catch (e){
                console.error(e)
            }
            }

    const connectToWallet = async () => {

            if(!account){
                    try {
                        const connection = await enableWeb3({provider: 'walletconnect'});
                        // const connection = await enableWeb3({
                        //     provider: 'walletconnect'
                        //     chainId: Utils.networkId

                        // });
                        // const connection = await enableWeb3();
                        console.log(connection.connection, 'connection.connection');
                        console.log(connection, 'connection..');
                        console.log(Moralis.connector, 'Moralis.connector')
                        if (connection.connection.url !== 'eip-1193:'){
                        localStorage.setItem(injectedProviderConnectStorageKey, connection.connection);
                        }
                        await subscribeProvider(connection);
                        setIsConnected(true)
                    }
                    catch (error) {
                        console.log(error, 'got this error on connectToWallet catch block while connecting the wallet');
                    }

            } else{
                setAddress(await getCurrentWalletAddress());
                setAddress(account);
                await getBalance(account)
                setLoading(false);
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
