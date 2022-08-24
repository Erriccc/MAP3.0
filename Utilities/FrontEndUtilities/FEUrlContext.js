import { createContext, useContext, useState } from "react";

 export const UrlContext = createContext({});

export function UrlProvider({ children }) {
  const [currentUrl, setCurrentUrl] = useState("testing context value");

  return (
    <UrlContext.Provider value={{ currentUrl, setCurrentUrl }}>
      {children}
    </UrlContext.Provider>
  );
}

export function useUrlContext() {
  const { currentUrl, setCurrentUrl } = useContext(UrlContext);

  return { currentUrl, setCurrentUrl };
}