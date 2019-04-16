import React, { Component, Fragment } from "react";
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
import { Link } from 'react-router-dom';
import "../Components/Styles/Navbar.css";
import logo from "../Components/images/aw-logo.svg";

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    console.log("Navi: ", this.props.childProps);
    return (
      <div>
      {this.props.childProps.isAuthenticated === false
          ?
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
                    <NavLink onClick={this.props.childProps.login}>Login</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </nav>
          :
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
                  {this.props.childProps.role === "Sales"
                    ? <NavItem>
                      <NavLink href="/positions/add">Add position</NavLink>
                    </NavItem>
                    : <div />}
                  <NavItem>
                    <NavLink href="/profile">My Profile</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={this.props.childProps.logout}>Logout</NavLink>
                  </NavItem>
            </Nav>
              </Collapse>
            </Navbar>
          </nav>
      }
      </div>
    );
  }
}
