import React, { Component } from "react";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";
import logo from "../Components/images/aw-logo.svg";
import "../Components/Styles/Navbar.css";

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      userIsAW: this.props.childProps.role !== "AW"
    };
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <Navbar light expand="md">
        <NavbarBrand href="/">
          <img
            src={logo}
            style={{ width: 150, height: 35, marginTop: 1 }}
            alt="AW-logo" />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar className="collapsed-items">
          <Nav className="ml-auto" navbar>
            {this.props.childProps.isAuthenticated === true
              ? <>
                <NavItem>
                  <NavLink href="/consultants">Consultants</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/positions">Positions</NavLink>
                </NavItem>
                {this.state.userIsAW &&
                  <NavItem>
                    <NavLink href="/positions/add">Add position</NavLink>
                  </NavItem>
                }
                <NavItem>
                  <NavLink href="/profile">My Profile</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: 'pointer' }}
                    onClick={this.props.childProps.logout}>Logout</NavLink>
                </NavItem>
              </>
              : <NavItem>
                <NavLink
                  style={{ cursor: 'pointer' }}
                  onClick={this.props.childProps.login}>Login</NavLink>
              </NavItem>}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
