
import { useState, useEffect, useCallback } from 'react';


export const useFetchCities = () => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch cities for the selected state
  const fetchCities = useCallback(async (stateName) => {
    if (!stateName) return; 

    setIsLoading(true);
    try {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: 'Nigeria', state: stateName }),
      });
      const json = await response.json();
      if (json.data && Array.isArray(json.data)) {
        setCities(json.data);
      }
    } catch (error) {
      console.error('Failed to fetch cities:', error);
      setCities([]); // Fallback
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { cities, fetchCities, isLoading };
};
