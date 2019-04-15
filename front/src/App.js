import React, { Component } from "react";
import { runWithAdal } from 'react-adal';
import { adalApiFetch, authContext, getToken } from './adalconfig'

import {
  Container,
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Routes from "./Routes";

import "./Components/Styles/Navbar.css";
import logo from "./Components/images/aw-logo.svg";

const DO_NOT_LOGIN = false;

class App extends Component {

  state = {
    userRole: 'Sales',
    isAuthenticated: false
  }

  componentDidMount() {
    let userToken = getToken();
    console.log("Token: ", userToken);
    if (userToken == '') {
      this.userHasAuthenticated(true);
    }


    // adalApiFetch(fetch, 'https://graph.microsoft.com/v1.0/me/memberOf', {})
    //   .then((response) => {
    //     response.json()
    //       .then((responseJson) => {
    //         // this.setState({ apiRes: responseJson.value[0].displayName, isAuthenticated: getToken() });
    //         this.setState({ userRole: "Sales", isAuthenticated: getToken() });
    //       });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   })
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogin = async event => {
    await authContext.login();
    this.userHasAuthenticated(true);
  }

  handleLogout = async event => {
    await authContext.logOut();
    this.userHasAuthenticated(false);
    this.props.history.push("/");
  }

  render() {
    console.log("isAuthenticated: ", this.state.isAuthenticated);
    console.log("Userrole: ", this.state.userRole);
    return (

      <div>

        <nav className="navbar navbar-expand-md">
          <Navbar>
            <div className="navbar-logo">
              <a href="/">
                <img
                  src={logo}
                  style={{ width: 150, height: 35, marginTop: 1 }}
                />
              </a>
            </div>
            <div className="spacer" />
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="navbar-nav-items" navbar>
                <NavItem>
                  <NavLink href="/positions">Positions</NavLink>
                </NavItem>
                {this.state.userRole == "Sales"
                  ? <NavItem>
                    <NavLink href="/positions/add">Add position</NavLink>
                  </NavItem>
                  : <div />}
                <NavItem>
                  <NavLink href="/profile">My Profile</NavLink>
                </NavItem>
                {this.state.isAuthenticated
                ? <NavItem>
                <NavLink onClick={this.handleLogin}>Login</NavLink>
              </NavItem>
              : <NavItem>
                  <NavLink onClick={this.handleLogout}>Logout</NavLink>
                </NavItem>}
              </Nav>
            </Collapse>
          </Navbar>
        </nav>

        <Routes />

        {/* <NavigationBar userRole={this.state.userRole} />
        <Router history={history}>
          <Switch>
            <Route path="/profile" component={ProfileView} />
            <Route
              path="/view-profile/:id"
              component={ViewNonEditableProfile}
              name="view-profile"
            />
            <Route
              path="/position-details/:positionId"
              component={PositionSelection}
              name="position-details"
            />
            <Route exact path="/positions" component={PositionsList} />
            <Route
              path="/auto-suggest"
              component={ConsultantSkillsAutoSuggestions}
            />
            <Route path="/positions/add" component={AddNewPosition} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Router> */}
      </div>
    );
  }
}

export default App;