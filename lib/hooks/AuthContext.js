import { createContext, useContext, useState, useEffect, useReducer} from "react";
// import { MAGIC_PUBLIC_KEY } from "../utils/urls";
import { useRouter } from "next/router";
import { WalletContext } from 'lib/hooks/use-connect';

import{signUpTransactionRelayer, signUpTransactionSender,getUserFromDb, dbSignUp} from "/Utilities/FrontEndUtilities/FEsignUpTransactionRelayer"
export const AuthContext = createContext();


export const AuthProvider = (props) => {
 
 
        /**
         * Reload user login on app refresh
         */
      useEffect(() => {

      }, []);

    let [tempCustomCustomCurrencyInfo, setTempCustomCustomCurrencyInfo] = useState({});
    const [status, setStatus] = useState(false);

    // const [authState, dispatch] = useReducer(reducer,{newCustomCustomCurrencyInfo:{},showCustomTokenInfo: false, loadingInfo: false, notFoundInfo: false });


    // function reducer(authState, action){
      
    //     switch (action.type) {
    //       case "LOGGEDIN":
    //         return {newCustomCustomCurrencyInfo: tempCustomCustomCurrencyInfo, notFoundInfo: false}
    //       case "SIGNEDUP":
    //         return {newCustomCustomCurrencyInfo:tempCustomCustomCurrencyInfo, notFoundInfo: true}
    //       case "MISC":
    //         return {newCustomCustomCurrencyInfo:{}, notFoundInfo: false}
    //       default:
    //         return authState
  
    //     }
    // }






  const { address,isConnected,authState,magicEmail, error, connectToWallet, disconnectWallet} = useContext(WalletContext);

    const handleLogin = async (inputEmail) => {
      console.log("debug console......")
      console.log(inputEmail)
      console.log(address,"debug address......")
      console.log(address,magicEmail, "debug address......")

      if (await getUserFromDb(address).vendorsWalletAddress == address){
        // "login"
        await connectToWallet(inputEmail)
      }else{
        // 'login'
        await connectToWallet(inputEmail)
        
        // "signup"
        try{
          await dbSignUp({vendorsWalletAddress:address, vendorsEmail: magicEmail, vendorsName: magicEmail.split('@')[0] })
  
        }catch(e){
        }
      }
  

     
    };

 

  return (
    <AuthContext.Provider value={{
      handleLogin,
     }}>
      {props.children}
    </AuthContext.Provider>
  );
};

