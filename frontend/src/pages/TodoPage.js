import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import {
    Link
} from "react-router-dom";

import UserContext from "../contexts/User/UserContext";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute"
import Form from 'react-bootstrap/Form';


class TodoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buildings: [],
            newTask: "",
            loading: true
        }
    }

    async componentDidMount() {
        try {
            const whoami = await Axios({
                method: 'GET',
                url: `https://smart-president.herokuapp.com/api/user/whoami`,
                headers: {
                    'Content-Type': 'application/json',
                    "X-ACCESS-TOKEN": localStorage.getItem('token')
                },
                withCredentials: true
            })
            console.log("Whoami: ")
            console.log(whoami)
            const response = await Axios({
                method: 'GET',
                url: `https://smart-president.herokuapp.com/api/buildings/`,
                headers: {
                    'Content-Type': 'application/json',
                    "X-ACCESS-TOKEN": localStorage.getItem('token')
                },
                withCredentials: true
            });
            //whoami.data.id -> user id
            const buildings = response.data.filter(building => building.members.includes(whoami.data.id))
            console.log(buildings)
            this.setState({
                buildings: buildings,
                user: whoami
            })
            console.log("State:")
            console.log(this.state)
            this.setState({
                buildings: buildings,
                user: whoami,
                loading: false
            })
        } catch (e) {
            alert(e.message)
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async handleAddTask() {
        console.log("Afegeix")
        console.log(this.state.newTask)
        if (this.state.newTask !== "" && this.state.newTask !== null && this.state.newTask !== undefined && this.state.newTask.length > 0) {
            try {
                const response = await Axios({
                    method: 'GET',
                    url: `https://smart-president.herokuapp.com/api/buildings/join/${this.state.newTask}`,
                    headers: {
                        'Content-Type': 'application/json',
                        "X-ACCESS-TOKEN": localStorage.getItem('token')
                    }
                });
                console.log(response)
                let current = this.state.buildings
                current.push(response.data)
                this.setState({
                    buildings: current
                })

            } catch (e) {
                alert("No hem trobat aquesta comunitat");
                return;
            }

        }
    }


    render() {
        return (<>
            <UserContext.Consumer>
                {context => (
                    <Container>
                        <Row className="full-height align-items-center justify-content-center">
                            <Col xs={12} sm={8} md={6} lg={6}>
                                <Card>
                                    <Card.Header className="text-center">
                                        <Row className="align-items-center justify-content-center">
                                            <Col xs={2} className="p-0">

                                            </Col>
                                            <Col xs={8} className="p-0">
                                                Benvingut, {context.name}
                                            </Col>
                                            <Col xs={2} className="p-0">
                                                <Button size="sm" variant="danger" onClick={() => context.handleLogout()}>Logout</Button>
                                            </Col>
                                        </Row></Card.Header>
                                    <Card.Body className="text-center px-5">
                                        <p>Aquestes son les teves comunitats de veïns:</p>
                                        <Form>
                                            <Row>
                                                <Col className="mt-1 mb-1">
                                                    <Card className="p-3">
                                                        <Row>
                                                            <Col xs={8}>
                                                                <Form.Control name="newTask" placeholder="Codi de la comunitat" onChange={(e) => this.handleChange(e)} value={this.state.newTask}></Form.Control>
                                                            </Col>
                                                            <Col xs={4}>
                                                                <Button block onClick={() => this.handleAddTask()}>Afegeix</Button>
                                                            </Col>
                                                        </Row>
                                                    </Card>
                                                </Col>
                                                {this.state.loading ? <p>Loading...</p> :
                                                    this.state.buildings.map(building => {
                                                        return (<Col xs={12} className="text-left mt-1 mb-1" key={building._id}>
                                                            <Card className="p-3">
                                                                <Link to={`/dashboard/${building._id}`}>
                                                                <Row className="align-items-center justify-content-center">
                                                                    {building.name}
                                                                </Row></Link>
                                                            </Card>
                                                        </Col>
                                                        )
                                                    })}
                                            </Row>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                )}
            </UserContext.Consumer>
        </>);
    }
}

export default withRouter(ProtectedRoute(TodoPage));