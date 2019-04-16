import React, { Component } from 'react';
import LoginPage from '../Containers/LoginPage';
import { getToken } from '../adalconfig'

class Login extends Component {
    componentDidMount() {
        if (getToken()) {
            this.props.history.push('./')
        }
    }
    render() {
        console.log("olet login sivulla")
        return (
            <div>
                <LoginPage/>
            </div>
        );
    }
}

export default Login;