import React, {useState} from 'react';
import { Navbar, Form, FormControl, Button, Nav } from 'react-bootstrap';
import MapComponent from './Components/MapComponent.js';
import logo from './img/logo.svg';

function App() {

  const [searchQuery, setSearchQuery] = React.useState(null);
  const [expanded, setExpanded] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSearchQuery(event.target.elements.search.value);
    setExpanded(false);
    event.target.reset();
  }

  return (
    <div>
      <Navbar bg="primary" variant="dark" style={{"zIndex":"1001"}} expand="md" expanded={expanded}>
        <Navbar.Brand>Toilets4London Map</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline onSubmit={handleSubmit}>
            <FormControl type="text" placeholder="Location" className="my-2 mr-sm-2 my-sm-0" name="search"/>
            <Button variant="outline-light" type="submit" value="Submit">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <MapComponent searchQuery={searchQuery}/>
    </div>
  );
}

export default App;