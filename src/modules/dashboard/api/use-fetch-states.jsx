
import { useState, useEffect, useCallback } from 'react';


export const useFetchStates = () => {
  const [states, setStates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch states once when modal is opened
  const fetchStates = useCallback(async () => {
    if (states.length > 0) return; 

    setIsLoading(true);
    try {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: 'Nigeria' }),
      });
      const json = await response.json();
      if (json.data && json.data.states) {
        setStates(json.data.states.map((s) => s.name));
      }
    } catch (error) {
      console.error('Failed to fetch states:', error);
      setStates(['Lagos', 'Abuja', 'Oyo']); 
    } finally {
      setIsLoading(false);
    }
  }, [states]);

  return { states, fetchStates, isLoading };
};