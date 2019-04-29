import React, { Component } from "react";
import { Collapse, Nav, Navbar, NavbarToggler, NavItem, NavLink } from "reactstrap";
import logo from "../Components/images/aw-logo.svg";
import "../Components/Styles/Navbar.css";

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
    return (
      <>
        <nav className="navbar navbar-expand-md">
          <Navbar>
            <div className="navbar-logo">
              <a href="/">
                <img
                  src={logo}
                  style={{ width: 150, height: 35, marginTop: 1 }}
                  alt="logo" />
              </a>
            </div>
            <div className="spacer" />
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="navbar-nav-items" navbar>
                {this.props.childProps.isAuthenticated === true
                  ? <>
                    <NavItem>
                      <NavLink href="/consultants">Consultants</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/positions">Positions</NavLink>
                    </NavItem>
                    {this.props.childProps.role === "AW"
                      ? <NavItem>
                        <NavLink href="/positions/add">Add position</NavLink>
                      </NavItem>
                      : <></>
                    }
                    <NavItem>
                      <NavLink href="/profile">My Profile</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={this.props.childProps.logout}>Logout</NavLink>
                    </NavItem>
                  </>
                  : <NavItem>
                    <NavLink onClick={this.props.childProps.login}>Login</NavLink>
                  </NavItem>}
              </Nav>
            </Collapse>
          </Navbar>
        </nav>
      </>
    );
  }
}
