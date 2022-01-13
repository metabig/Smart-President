import React, { Component } from 'react';
import { withRouter, Redirect } from "react-router-dom"; 
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import UserContext from "../contexts/User/UserContext";


class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",

            redirect: false
        }
    }

    handleChange(e) {
		this.setState({
			[e.target.name] : e.target.value
		});
    }

    componentDidMount() {
        if(localStorage.getItem('token')) {
            this.setState({
                redirect: true
            });
        }
    }

    redirectToRegisterPage() {
        this.props.history.push('/register');
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to="/dashboard" />
        }

        return (<>
            <UserContext.Consumer>
                {context => (
                    <Container fluid className='registerBg'>
                        <Row className="full-height align-items-center justify-content-center">
                            <Col xs={10} sm={6} md={4} lg={2}>
                                <Card>
                                    <Card.Header className="text-center" style={{fontSize: '30px'}}>Inici de sessió</Card.Header>
                                    <Card.Body>
                                        <Form>
                                            <Form.Label>Nom</Form.Label>
                                            <Form.Control type="text" name="username" placeholder="Introdueix el nom" value={this.state.username} onChange={(e) => this.handleChange(e)}></Form.Control>
                                            <Form.Label style={{paddingTop: '10px'}}>Contrasenya</Form.Label>
                                            <Form.Control type="password" name="password" placeholder="Introdueix la contrasenya" value={this.state.password} onChange={(e) => this.handleChange(e)}></Form.Control>
                                        </Form>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button block variant="outline-primary" onClick={() => context.handleLogin(this.state)}>Inicia sessió</Button>
                                        <Button block variant="secondary" onClick={() => this.redirectToRegisterPage()}>No tens compte? Registrat </Button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                )}
            </UserContext.Consumer>
        </>);
    }
}

export default withRouter(LoginPage);