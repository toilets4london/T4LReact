import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./Components/Navigation";
import { client } from './Client/client';

const useCurrentLocation = () => {
  const [error, setError] = useState();
  const [location, setLocation] = useState();

  const handleSuccess = position => {
    const { latitude, longitude } = position.coords;
    setLocation({
      latitude,
      longitude
    });
  };

  const handleError = error => {
    setError(error.message);
    console.log(error);
  };

  useEffect(() => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    if (!navigator.geolocation) {
      setError('Geolocation is not supported.');
      return;
    }
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, []);
  return { location, error };
};


function App() {

  const [toilets, setToilets] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { location, locationError } = useCurrentLocation();

  useEffect(() => {
    client.get('/toilets/?page_size=1000')
      .then(
        (result) => {
          setToilets(result.data.results);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])



  return (
    <Router>
      <Suspense fallback="Loading...">
        <Navigation toilets={isLoaded ? toilets : []} error={error} location={location} locationError={locationError}/>
      </Suspense>
    </Router>
  );
}

export default App;