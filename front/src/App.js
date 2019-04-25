import React, { Component } from 'react';
import { runWithAdal } from 'react-adal';
import { adalApiFetch, authContext, getToken } from './adalconfig'
import NavigationBar from './Containers/NavigationBar';
import Routes from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Components/Styles/Navbar.css";

class App extends Component {

  state = {
    userRole: '',
    hasAuthenticated: false
  }

  async componentDidMount() {
    /*
      -getToken retrieves the token from the session storage
        -if retrieved successfully then user has authenticated
        -if not retrieved then used has not authenticated yet
        => this impacts to the rendering of the Navigation bar and routing
      -adalApiFetch retrieves the user information (username, first & last name, group) from the Azure AD.
        -Role is stored into the session storage for other components e.g. UserProfile
    */
    if (getToken()) {
      this.setState({ hasAuthenticated: true });
      await adalApiFetch(fetch, 'https://graph.microsoft.com/v1.0/me/memberOf', {})
        .then((response) => {
          response.json()
            .then((responseJson) => {
              sessionStorage.setItem('aw-role', responseJson.value[0].displayName);
              this.setState({ userRole: responseJson.value[0].displayName });
            });
        })
        .catch((error) => {
          console.error(error);
        })
    }
  }

  // Login function which activates the Azure AD login when DO_NOT_LOGIN is set to false  
  login = () => {
    const DO_NOT_LOGIN = false;

    runWithAdal(authContext, () => {
      // eslint-disable-next-line
      require('./App.js');

    }, DO_NOT_LOGIN);
  }

  // Logout function
  logout = () => {
    authContext.logOut();
    sessionStorage.clear();
  }
  
  render() {

    const childProps = {
      isAuthenticated: this.state.hasAuthenticated,
      role: this.state.userRole,
      login: this.login,
      logout: this.logout
    }

    return (
      <>
        <NavigationBar childProps={childProps} />
        <Routes
          isAuthenticated={this.state.hasAuthenticated}
          role={this.state.userRole} childProps={childProps}
        />
      </>
    );
  }
}

export default App;