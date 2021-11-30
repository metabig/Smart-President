import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import {Navbar, Nav, NavItem, Container, NavDropdown, Row, Col, Card, Button} from 'react-bootstrap';

import UserProvider from "./contexts/User/UserProvider";
import TodoPage from './pages/TodoPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="app">
            <Router>
                <UserProvider>
                    <Switch>
                        <Route exact path="/" render={() => <RegisterPage/>}></Route>
                        <Route exact path="/register" render={() => <RegisterPage/>}></Route>
                        <Route exact path="/dashboard" render={() => <TodoPage/>}></Route>
                        <Route path="*" render={() => <NotFoundPage />}></Route>
                    </Switch>
                </UserProvider>
            </Router>
            </div>
        );
    }
}

export default App;