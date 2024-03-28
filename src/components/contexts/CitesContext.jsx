import { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9002";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        setCities(data);
      } catch (error) {
        alert("There was an error loading data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider value={{cities, isLoading}}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCiteies() {
  const context = useContext(CitiesContext);

  if (context === "undefined")
    throw new Error("Cities Provider is used in out of context");
  return context;
}

export { CitiesProvider, useCiteies };