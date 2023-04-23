import { createContext, useContext, useState,useEffect } from "react";
import { WalletContext } from 'lib/hooks/use-connect';
import Utils from'Utilities/utils';

const StepperContext = createContext({ userData: "", setUserData: null });

export function UseContextProvider({ children }) {
  const { address,isConnected,currentUser, provider} = useContext(WalletContext);

  const [userData, setUserData] = useState('');
  const [finalData, setFinalData] = useState("");

 
  useEffect(() => {
    // console.log('MISC AUTH RENDER')
  userData === '' && currentUser !== undefined &&  (async  () => {
    try {
      const symbol = await Utils.magicProviderTokenSymbol(currentUser.vendorsToken,provider) 
      const tagwords = currentUser.keyWords.toString()
      setUserData({ ...currentUser,keyWords:tagwords, currencySymbol: symbol});
    } catch (error) {
    console.log(error)
    }
    })();
  }, [currentUser,userData]);
  return (
    <StepperContext.Provider value={{ userData, setUserData, finalData, setFinalData }}>
      {children}
    </StepperContext.Provider>
  );
}

export function useStepperContext() {
  const { userData, setUserData, finalData, setFinalData } = useContext(StepperContext);

  return { userData, setUserData, finalData, setFinalData };
} 