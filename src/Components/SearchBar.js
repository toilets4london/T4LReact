import React, { useState } from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { ReactComponent as Logo } from '../img/logo.svg';

function SearchBar(props) {

    const [expanded, setExpanded] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        props.handleSearchQuery(event.target.elements.search.value);
        setExpanded(false);
        event.target.reset();
    }

    return (
        <Navbar style={{ "zIndex": "1001", "background": "#007AFF" }} expand="md" className="m-3" expanded={expanded}>
            <span style={{ "color": "white", "fontSize": "18px" }} className="mr-2"><Logo className="mr-2"/>{props.title ?? "Toilets4London"}</span>
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