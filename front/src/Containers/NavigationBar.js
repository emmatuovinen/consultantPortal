import React, { Component} from "react";
import {
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
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
                  alt="logo"/>
                </a>
              </div>
              <div className="spacer" />
              <NavbarToggler onClick={this.toggle}/>
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
                    alt="logo"/>
                </a>
              </div>
              <div className="spacer" />
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="navbar-nav-items" navbar>
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
