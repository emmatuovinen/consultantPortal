import React, { Component } from 'react';
import {
    Navbar, NavbarToggler, Collapse, Nav, NavItem, NavLink,
    NavbarBrand
} from 'reactstrap';

export default class NavigationBar extends Component {
    state = {
        isOpen: false
    };

    toggle() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (
                <Navbar color='light' light expand="md">
                    <NavbarBrand href="/">LOGO</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Front page</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
        );
    }
}