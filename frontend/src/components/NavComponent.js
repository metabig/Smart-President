import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {
    Link
} from "react-router-dom";

class NavComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.setState({
                logged: true
            });
        }
    }
    handleClick = ()  => {
        localStorage.removeItem("token");
        this.setState({
            logged: false
        })
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="light">
                <Navbar.Brand style={{ color: 'black' }} href="/"><strong style={{ color: 'black' }}>Smart</strong >President<strong className="Strong1">.</strong></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    {
                    this.state.logged ? <Nav>
                        <Nav.Link as={Link} to="/dashboard" className="nav-link">Inici</Nav.Link>
                        <Nav.Link as={Link} to="/" className="nav-link" onClick={this.handleClick.bind(this)}>Tanca sessió</Nav.Link>
                    </Nav> 
                    : <Nav>
                        <Nav.Link as={Link} to="/" className="nav-link">Pàgina Principal</Nav.Link>
                        <Nav.Link as={Link} to="/register" className="nav-link">Registre</Nav.Link>
                        <Nav.Link as={Link} to="/login" className="nav-link">Inici de sessió</Nav.Link>
                        <Nav.Link as={Link} to="/contact" className="nav-link">Contacta</Nav.Link>
                    </Nav>}

                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavComponent;