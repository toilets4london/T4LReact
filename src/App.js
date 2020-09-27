import React, { Suspense, lazy, Component, Fragment, useState, useEffect  } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';
const Map = lazy(() => import('./Map'));
const About = lazy(() => import('./About'));


function App() {

  const [toilets, setToilets] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("https://toilets4london.herokuapp.com/toilets/?page_size=1000")
      .then(res => res.json())
      .then(
        (result) => {
          setToilets(result.results);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          setToilets([]);
        }
      )
  }, [])



  return (
    isLoaded ?
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Map</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Map toilets={toilets}/>
          </Route>
        </Switch>
      </div>
      </Suspense>
    </Router>
    : "Loading"
  );
}

export default App;