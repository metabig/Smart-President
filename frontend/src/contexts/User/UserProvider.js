import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from "axios";

import UserContext from "./UserContext";


class UserProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,

            name: null
        }
    }

    componentDidMount() {
        if (localStorage.getItem('token') !== null) {
            axios({
                method: 'GET',
                url: "https://smart-president.herokuapp.com/api/user/whoami",
                headers: {
                    'X-ACCESS-TOKEN': localStorage.getItem('token')
                },
                withCredentials: true
            })
                .then(response => {
                    if (response.status === 200) {
                        this.setState({
                            isLoggedIn: true,
                            name: response.data.result
                        });
                    } else {
                        alert(response.data.message);
                        this.props.history.push('/');
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    render() {
        return (
            <UserContext.Provider
                value={{
                    isLoggedIn: this.state.isLoggedIn,
                    name: this.state.name,
                    handleLogin: data => {
                        axios({
                            method: 'POST',
                            url: "https://smart-president.herokuapp.com/api/user/login",
                            data: data,
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            withCredentials: true
                        })
                            .then(response => {
                                localStorage.setItem("token", response.data.token);
                                if (response.status === 200) {
                                    this.setState({
                                        isLoggedIn: true
                                    }, () => {
                                        this.props.history.push('/dashboard');
                                        window.location.reload(false);
                                    });
                                } else {
                                    alert(response.data.message);
                                }
                            })
                            .catch(error => {
                                // return;
                                alert(error.data && error.data.message);
                            })
                    },
                    handleLogout: data => {
                        localStorage.removeItem("token");
                        this.props.history.push('/');
                        window.location.reload(false);
                    }
                }}
            >
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default withRouter(UserProvider);