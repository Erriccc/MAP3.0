import { useContext, useEffect, useState } from 'react';
import {MAPBOXACCESSTOKEN} from '/Utilities/utils'
import { useStepperContext } from "/Utilities/FrontEndUtilities/FEStepperContext";

const useInput = (initialValue) => {
  // const useInput = (userData.vendorsStreetAddress) => {
  // const [value, setValue] = useState(userData.vendorsStreetAddress);
  const [value, setValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);
  const { userData, setUserData } = useStepperContext();


  useEffect(() => {
    setValue(userData.vendorsStreetAddress);
  }, [userData]);
  
  const handleChange = async (event) => {
    setValue(event.target.value);

    try { 
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=${MAPBOXACCESSTOKEN}&autocomplete=true`;
      const response = await fetch(endpoint);
      const results = await response.json();
      setSuggestions(results?.features);
    } catch (error) {
      console.log("Error fetching data, ", error);
    }
  };

  

  return {
    value,
    onChange: handleChange,
    setValue,
    suggestions,
    setSuggestions
  };
};

export default useInput;
