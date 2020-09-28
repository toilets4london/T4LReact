import React, { lazy } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { ReactComponent as Logo } from '../img/logo.svg';
const Map = lazy(() => import('./Map'));
const About = lazy(() => import('./About'));

export default function Navigation(props) {
    return (
        <div style={{zIndex:"2"}}>
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                <Navbar.Brand as={Link} to="/" ><Logo/>  Toilets4London</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavItem>
                            <Nav.Link as={Link} to="/">Map</Nav.Link>
                        </NavItem>
                        <NavItem>
                            <Nav.Link as={Link} to="/about" >About</Nav.Link>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Switch>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/">
                    <Map toilets={props.toilets} />
                </Route>
            </Switch>
        </div>
    );
}