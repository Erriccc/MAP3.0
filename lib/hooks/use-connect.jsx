import { useEffect, useState, createContext } from 'react';
import { ethers } from 'ethers';
import {customNodeOptions} from'../../Utilities/utils';
import { useModal } from '/components/modal-views/context';
import{dbSignUp} from "/Utilities/FrontEndUtilities/FEsignUpTransactionRelayer"


import { Magic } from "magic-sdk";

export const WalletContext = createContext({});
 

export const WalletProvider = ({ children }) => {

  const { openModal } = useModal();

    const [balance, setBalance] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [magic, setMagic] = useState(undefined);
    const [address, setAddress] = useState(undefined);
    const [provider, setProvider] = useState(undefined);
    const [magicEmail, setMagicEmail] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);

    const [error, setError] = useState(false);//
    const [isConnected, setIsConnected] = useState(false);
    const [isLoggedOut, setIsLoggedOut] = useState(true);
    const [authState, setAuthState] = useState({stateLoaded:false, isLoadingState:false});


                useEffect(() => { // INITIAL USEFFECT
                  // SET UP MAGIC
                  magic == undefined  && (async  () => {
                      let tempMagic = new Magic(process.env.NEXT_PUBLIC_MAGIC_AUTH_PUBLIC_KEY, { network: customNodeOptions })
                      setMagic(tempMagic)
                      setProvider(new ethers.providers.Web3Provider(tempMagic.rpcProvider));
                      await checkUserLoggedIn(tempMagic);
                  })();
                  }, [
                    magic
                  ]);

                  useEffect(() => {
                    console.log('MISC AUTH RENDER')
                    // (async  () => {
                    // })();
                  }, [address,currentUser]);



                    useEffect(() => { // THIS EFFECT RUNS AFTER isConnected is changed by login action
                              console.log('details setup')
                              isConnected == true  && (async  () => {
                              await setUpDetails()
                              })();
                    }, [isConnected,]);

        const setUpDetails = async () => {

          try {
              const signer = provider.getSigner();
            // Get user's Ethereum public address
            const magicAddress = await signer.getAddress();
            const {email} = await magic?.user.getMetadata()
             const balanceInEth = await getBalance(magicAddress);
             // expected output
            // {OXProfile || error: error?error:false}
            // vendorsWalletAddress:inputAddress, vendorsEmail: inputEmail, vendorsName: inputEmail.split('@')[0] 
            const tempUserData = await quickSignUp(email,magicAddress);
            setCurrentUser(tempUserData);
            setBalance(balanceInEth);
            setMagicEmail(email);
            setAddress(magicAddress);

            
            
        } catch (err) {
            console.log(err);
        }

        }
    // const web3Modal = typeof window !== 'undefined' && new Web3Modal({ cacheProvider: true });
    /**
   * If user is logged in, get data and display it
   */
                        const checkUserLoggedIn = async (tempMagic) => {
                          // THIS FUNCTION RUNS ON INITIAL MOUNT AND DURING LOGIN
                          console.log('checked login')
                          try {
                              const isLoggedIn = await tempMagic.user.isLoggedIn();
                              if (isLoggedIn) {
                                console.log('user Logged In')
                             
                              setIsConnected(true)
                              setIsLoggedOut(false)
                              }else{
                                console.log('user Not Logged In')
                              }
                          } catch (err) {
                              console.log(err);
                          }
                        };

    

   

    const getBalance = async (walletAddress) => {
        const walletBalance = await provider.getBalance(walletAddress);
        const balanceInEth = ethers.utils.formatEther(walletBalance);
        return balanceInEth;
    };


    const disconnectWallet = async () => {
        console.log(magic)
        try {
            await magic.user.logout();
            setAddress(undefined);
            setCurrentUser(undefined)
            setMagicEmail(undefined)
            setIsConnected(false)
            setIsLoggedOut(true)
            console.log("logged out");
          } catch (err) {
            console.log(err);
          }
    };


    const checkIfExtensionIsAvailable = () => {
        if ((window && window.web3 === undefined) ||
            (window && window.ethereum === undefined)) {
            setError(true);
            // web3Modal && web3Modal.toggleModal();
        }
    };

    const connectToWallet = async ( email) => {
            if(!await magic.user.isLoggedIn()){
                try {
                    await magic.auth.loginWithMagicLink({ email});

                    if(await magic.user.isLoggedIn()){
                        openModal('BETA_ACKNOWLEDGE_VIEW')
                    }
                    setIsConnected(true)
                    setIsLoggedOut(false)
                    await setUpDetails()
                    // await subscribeProvider(connection);
                  } catch (err) {
                    console.log(err);
                  }
            } else{
                console.log('already logged in')
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
    const getToken = async () => {
        try{
          const token = await magic.user.getIdToken()
          return token
        } catch (err) {
          console.log(err)
        }
      }



      const quickSignUp = async (inputEmail, inputAddress) => {
          "signup"
          try{ 
             // expected output
            // {OXProfile,error: error?error:false}
            return await dbSignUp({vendorsWalletAddress:inputAddress, vendorsEmail: inputEmail, vendorsName: inputEmail.split('@')[0] })
          }catch(e){
        }
      };
  
    return (<WalletContext.Provider value={{
            address,
            currentUser,
            setCurrentUser,
            balance,
            loading,
            isConnected,
            authState,
            provider,
            error,
            magicEmail,
            connectToWallet,
            disconnectWallet,
            getToken,
            quickSignUp,
        }}>
      {children}
    </WalletContext.Provider>);
};
