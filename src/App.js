import React from 'react';
import { Navbar } from 'react-bootstrap';
import MapComponent from './Components/MapComponent.js';
import { ReactComponent as Logo } from './img/logo.svg';

function App() {
  return (
    <div>
      <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#home">
        <Logo className="d-inline-block align-top" style={{width:"30px", height:"30px"}}/>
        {' '}Toilets4London Map
      </Navbar.Brand>
    </Navbar>
    <MapComponent/>
  </div>
  );
}

export default App;