import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navigation from "./Components/Navigation";
import { client } from './Client/client';


function App() {

  const [toilets, setToilets] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

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
    isLoaded ?
    <Router>
      <Suspense fallback="Loading...">
        <Navigation toilets={toilets} error={error}/>
      </Suspense>
    </Router>
    : "Loading..."
  );
}

export default App;