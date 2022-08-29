import React, { useState } from "react";
import InteractiveMap from "./Components/InteractiveMap.js";
import SearchBar from "./Components/SearchBar.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import BoroughEmbeddableMap from "./Components/BoroughEmbeddableMap.js";
import SelfServeEmbed from "./Components/SelfServeEmbed.js";

function App() {
  const [searchQuery, setSearchQuery] = useState(null);
  const handleSearch = (query) => setSearchQuery(query);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="full-page">
            <SearchBar handleSearchQuery={handleSearch} />
            <InteractiveMap searchQuery={searchQuery} />
          </div>
        </Route>
        <Route exact path="/embed-map">
          <SelfServeEmbed />
        </Route>
        <Route path="/:borough">
          <BoroughEmbeddableMap
            searchQuery={searchQuery}
            handleSearch={handleSearch}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
