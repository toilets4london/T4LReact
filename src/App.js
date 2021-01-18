import React, {useState} from 'react';
import InteractiveMap from './Components/InteractiveMap.js';
import SearchBar from './Components/SearchBar.js'
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  const [searchQuery, setSearchQuery] = useState(null);
  const handleSearch = (query) => setSearchQuery(query);

  return (
    <div className="full-page">
      <SearchBar handleSearchQuery={handleSearch}/>
      <InteractiveMap searchQuery={searchQuery}/>
    </div>
  );
}

export default App;