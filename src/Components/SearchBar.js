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
        <Navbar bg="primary" variant="dark" style={{ "zIndex": "1001", "borderRadius": "5px" }} expand="md" className="m-3" expanded={expanded}>
            <Navbar.Brand>{props.title ?? "Toilets4London Map"}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
            <Navbar.Collapse id="basic-navbar-nav">
                <Form inline onSubmit={handleSubmit}>
                    <FormControl type="text" placeholder="Search for a London location..." className="m-1" name="search" id="location-search"/>
                    <Button variant="outline-light" className="m-1" type="submit" value="Submit">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default SearchBar;