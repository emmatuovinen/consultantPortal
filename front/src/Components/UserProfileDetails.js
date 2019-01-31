import React, { Component } from 'react';
import { Label, Table } from 'reactstrap';

export default class UserProfileDetails extends Component {
    render() {
        let user = this.props.user;
        return (
            <Table>
                <tbody>
                    <tr>
                        <th scope="row"><Label>First name: </Label></th>
                        <td><Label>{user.firstName}</Label></td>
                    </tr>
                    <tr>
                        <th scope="row"><Label>Last name: </Label></th>
                        <td><Label>{user.lastName}</Label></td>
                    </tr>
                    <tr>
                        <th scope="row"><Label>Email: </Label></th>
                        <td><Label>{user.email}</Label></td>
                    </tr>
                    <tr>
                        <th scope="row"><Label>Phone number: </Label></th>
                        <td><Label>{user.phoneNumber}</Label></td>
                    </tr>
                    <tr>
                        <th scope="row"><Label>Description: </Label></th>
                        <td><Label>{user.description}</Label></td>
                    </tr>
                    <tr>
                        <th scope="row"><Label>Role: </Label></th>
                        <td><Label>{user.role}</Label></td>
                    </tr>
                </tbody>
            </Table>
        );
    }
}