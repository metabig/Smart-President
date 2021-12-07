import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Container, NavDropdown, Row, Col, Card, Button } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class NavComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="light">
                    <Navbar.Brand style={{ color: 'black' }} href="/"><strong style={{ color: 'black' }}>Smart</strong >President<strong className="Strong1">.</strong></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
                            <Nav.Link as={Link} to="/register" className="nav-link">Register</Nav.Link>
                            <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
                            <Nav.Link as={Link} to="/contact" className="nav-link">Contact</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavComponent;