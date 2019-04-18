import React, { Component } from 'react';
// import { Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import Home from "./Views/Home";
// import history from "./history";
// import ProfileView from "./Views/ProfileView";
// import ConsultantSkillsAutoSuggestions from "./Containers/ConsultantSkillsAutoSuggestions";
// import ViewNonEditableProfile from "./Containers/ViewNonEditableProfile";
// import NavigationBar from "./Containers/NavigationBar";
// import PositionsList from "./Containers/PositionsList";
// import PositionSelection from "./Containers/PositionSelection";
// import AddNewPosition from "./Containers/AddNewPosition";
import { runWithAdal } from 'react-adal';
import { authContext } from './adalconfig';
// import {Navbar,
//   NavbarToggler,
//   Collapse,
//   Nav,
//   NavItem,
//   NavLink, Button} from "reactstrap";
import { adalApiFetch, getToken } from './adalconfig'
import Routes from "./Routes";
import "./Components/Styles/Navbar.css";
// import logo from "./Components/images/aw-logo.svg";
import NavigationBar from './Containers/NavigationBar';

import "./Components/Styles/Navbar.css";


class App extends Component {

  state = {
    userRole: '',
    hasAuthenticated: false
  }

  componentDidMount() {
    if (getToken()) {
      this.setState({hasAuthenticated: true});
      adalApiFetch(fetch, 'https://graph.microsoft.com/v1.0/me/memberOf', {})
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
    authContext.logOut()
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

       <Routes isAuthenticated={this.state.hasAuthenticated} role={this.state.userRole} />
      </div>
      
    );
  }
}

export default App;