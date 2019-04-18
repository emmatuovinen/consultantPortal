import React, { Component } from 'react';
import LoginPage from '../Containers/LoginPage';
import { getToken, authContext } from '../adalconfig'
import { GetConsultantInfobyEmail } from '../serviceClients/UserService';

/*
    -Component for the login route in the Routes.js
    -First this will check "getToken()" if the session token can be found in the session storage
        -If yes, it will check if the GetConsultantInfoByEmail returns Error 404 Not Found
            -If yes, it will redirect to the profile page for filling in the user information
            -If not (i.e. user found in the dabase), it will redirect to ./home
        -If not, it will render the LoginPage component for user to log in
*/

class Login extends Component {
    componentDidMount() {

        if (getToken()) {
            let userLoginEmail = authContext._user.userName;
            console.log("email: ", userLoginEmail);
            GetConsultantInfobyEmail(userLoginEmail, response => {
                console.log("DB response @Login.js: ", response.status);
                if (response.status === 404) {
                    console.log("email false, history.push ./profile");
                    this.props.history.push('./profile')
                }
            });
            console.log("Token true, email true: history.push ./");
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