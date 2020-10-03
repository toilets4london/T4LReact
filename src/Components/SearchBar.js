import React, { useState } from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';

function SearchBar(props) {

    const [expanded, setExpanded] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        props.handleSearchQuery(event.target.elements.search.value);
        setExpanded(false);
        event.target.reset();
    }

    return (
        <Navbar bg="primary" variant="dark" style={{ "zIndex": "1001", "borderRadius": "1rem" }} expand="md" className="mx-2 mt-5 mt-md-2 mt-sm-3" expanded={expanded}>
            <Navbar.Brand>Toilets4London Map</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
            <Navbar.Collapse id="basic-navbar-nav">
                <Form inline onSubmit={handleSubmit}>
                    <FormControl type="text" placeholder="Location" className="my-2 mr-sm-2 my-sm-0" name="search" />
                    <Button variant="outline-light" type="submit" value="Submit">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default SearchBar;