import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { runWithAdal } from 'react-adal';
import { authContext } from './adalconfig';
import { adalApiFetch, getToken } from './adalconfig'
import Routes from "./Routes";
import "./Components/Styles/Navbar.css";
import NavigationBar from './Containers/NavigationBar';
import "./Components/Styles/Navbar.css";


class App extends Component {

  state = {
    userRole: '',
    hasAuthenticated: false
  }

async componentDidMount ()  {
    if (getToken()) {
      this.setState({hasAuthenticated: true});
       await adalApiFetch(fetch, 'https://graph.microsoft.com/v1.0/me/memberOf', {})
      .then((response) => {
        response.json()
          .then((responseJson) => {
            this.setState({ userRole: responseJson.value[0].displayName });
          });
      })
      .catch((error) => {
        console.error(error);
      })
    }      
  }
  
  login = () => {
    const DO_NOT_LOGIN = false;
    
    runWithAdal(authContext, () => {     
      // eslint-disable-next-line
      require('./App.js');
      
    }, DO_NOT_LOGIN);
  }
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

      <div>
        
        <NavigationBar childProps={childProps} />

       <Routes isAuthenticated={this.state.hasAuthenticated} role={this.state.userRole} childProps={childProps} />
      </div>
      
    );
  }
}

export default App;