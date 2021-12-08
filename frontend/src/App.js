import React, { Component } from 'react';

import UserProvider from "./contexts/User/UserProvider";
import TodoPage from './pages/TodoPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import NavComponent from './components/NavComponent';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import BuildingPage from './pages/BuildingPage';

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
                        <NavComponent />
                        {/* <Switch>
                        <Route path="/"><HomePage/></Route>
                        <Route path="/register"> <RegisterPage/></Route>
                        <Route path="/login"> <LoginPage/></Route>
                        <Route path="/dashboard"><TodoPage/></Route>
                        <Route path="*"><NotFoundPage /></Route>
                    </Switch> */}
                        <Switch>
                            <Route path="/register">
                                <RegisterPage />
                            </Route>
                            <Route path="/dashboard/:id">
                                <BuildingPage />
                            </Route>
                            <Route path="/dashboard">
                                <TodoPage />
                            </Route>
                            <Route path="/login">
                                <LoginPage />
                            </Route>
                            <Route path="/">
                                <HomePage />
                            </Route>
                        </Switch>
                    </UserProvider>
                </Router>
            </div>
        );
    }
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}

export default App;