import React, {useState} from 'react';
import MapComponent from './Components/MapComponent.js';
import SearchBar from './Components/SearchBar.js'

function App() {

  const [searchQuery, setSearchQuery] = useState(null);
  const handleSearch = (query) => setSearchQuery(query);

  return (
    <div className="full-page">
      <SearchBar handleSearchQuery={handleSearch}/>
      <MapComponent searchQuery={searchQuery}/>
    </div>
  );
}

export default App;