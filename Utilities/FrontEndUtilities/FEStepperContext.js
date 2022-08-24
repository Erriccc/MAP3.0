import { createContext, useContext, useState } from "react";

const StepperContext = createContext({ userData: "", setUserData: null });

export function UseContextProvider({ children }) {
  const [userData, setUserData] = useState("");
  const [finalData, setFinalData] = useState("");

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