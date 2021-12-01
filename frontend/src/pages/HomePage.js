import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Container, NavDropdown, Row, Col, Card, Button } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import RegisterPage from './RegisterPage';
import NotFoundPage from './NotFoundPage';
import LoginPage from './LoginPage';


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="bg">
                <Navbar collapseOnSelect expand="lg" bg="none" variant="dark">
                    <Container className="Container-Header">
                        <Navbar.Brand className="NavBar-Title" style={{ color: 'black' }} href="/"><strong style={{ color: 'black' }}>Smart</strong >President<strong className="Strong1">.</strong></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse className="responsive-navbar-nav">
                            <Nav>
                                <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
                                <Nav.Link as={Link} to="/register" className="nav-link">Register</Nav.Link>
                                <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
                                <Nav.Link as={Link} to="/contact" className="nav-link">Contact</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <h2 className="h2-1">
                    PORTA LA TEVA FINCA A LA SEGÜENT GENERACIÓ
                </h2>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="https://images2.alphacoders.com/116/1160990.jpg" />
                                <Card.Body>
                                    <Card.Title style={{ textAlign: 'center' }}>BlockChain</Card.Title>
                                    <Card.Text>
                                        La base de la nostra tecnologia, aquesta inovadora forma d'ús de l'encriptació i assegurar informació que el nostre producte sigui fiable.
                                    </Card.Text>
                                    <div className="center">
                                        <Button className="button1" variant="primary">Read More</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md="auto">
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="http://www.adqualis.com/wp-content/uploads/2018/01/trabajo-en-equipo.jpg" />
                                <Card.Body>
                                    <Card.Title style={{ textAlign: 'center' }}>About Us</Card.Title>
                                    <Card.Text>
                                        Fusionem la tecnologia de BlockChain amb els innovadors Smart Contracts.
                                    </Card.Text>
                                    <div className="center">
                                        <Button className="button1" variant="primary">Read More</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs lg="2">
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="https://academy.bit2me.com/wp-content/uploads/2016/08/smarts-contracts-hands.webp" />
                                <Card.Body>
                                    <Card.Title style={{ textAlign: 'center' }}>Smart Contract</Card.Title>
                                    <Card.Text>
                                        Aquests "acords digitals" fan possible que tot funcioni adeqüadament, guardant a la Blockchain unes condicions que al complir-se porten a terme una acció prèviament decidida.
                                    </Card.Text>
                                    <div className="center">
                                        <Button className="button1" variant="primary">Read More</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default HomePage;