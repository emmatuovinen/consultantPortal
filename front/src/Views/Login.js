import React, { Component } from 'react';
import LoginPage from '../Containers/LoginPage';
import { getToken, authContext } from '../adalconfig'
import { GetConsultantInfobyEmail } from '../serviceClients/UserService';

/*
    -Component for the login route in the Routes
    -First this will check if the session token can be found
    -If yes, it will redirect to "home" route and let the user in
    -If not, it will render the LoginPage component
    which is the front page of the application
    and includes the LOGIN button
*/

class Login extends Component {
    componentDidMount() {

        if (getToken()) {
            let konsultti = authContext._user.userName;
            GetConsultantInfobyEmail(konsultti, response => {
                console.log("DB response @Login.js: ", response.status);
                if (response.status === 404) {
                    console.log("history.push ./profile");
                    this.props.history.push('./profile')
                }
            });
            console.log("Token true, email false: history.push ./");
            this.props.history.push('./')
        };
    };
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