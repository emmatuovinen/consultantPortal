import React, { Component, Fragment } from "react";
import {
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink
  /*  NavbarBrand */
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
    console.log("Navi: ", this.props.userRole);
    return (
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
              {this.props.userRole === "Sales"
                ? <Fragment>
                    <NavItem>
                      <NavLink href="/positions/add">Add position</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/profile">Profile</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/">Front page</NavLink>
                    </NavItem>
                </Fragment>
                : <Fragment>
                    <NavItem>
                      <NavLink href="/profile">Profile</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/">Front page</NavLink>
                    </NavItem>
                </Fragment>}
            </Nav>
          </Collapse>
        </Navbar>
      </nav>
    );
  }
}
