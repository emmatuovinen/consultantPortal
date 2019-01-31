import React, { Component } from 'react';
import {
    Button, Form, FormGroup, Label, Input,
    Table,
} from 'reactstrap';
import { GetConsultantInfo } from '../ServiceClient'

class UserProfile extends Component {
    state = {
        userId: '15',
        user: {},
        editingDisabled: true,
        userIsConsultant: true,
    }

    componentDidMount() {
        GetConsultantInfo(this.state.userId, callback => {

            if (callback.status === 200) {
                this.setState({ user: callback.data });
                console.log('stateen laitettu user', this.state.user)
            } else {
                console.log('ei voida tulostaa, error', callback.status);
            }
        });
    }

    edit = () => {
        this.setState({ editingDisabled: !this.state.editingDisabled });
    }

    handleChange = event => {

        let copyOfUser = { ...this.state.user }

        switch (event.target.id) {
            case 'firstName':
                copyOfUser.firstName = event.target.value;
                this.setState({ user: copyOfUser });
                break;
            case 'lastName':
                copyOfUser.lastName = event.target.value;
                this.setState({ user: copyOfUser });
                break;
            case 'email':
                copyOfUser.email = event.target.value;
                this.setState({ user: copyOfUser });
                break;
            case 'phoneNumber':
                copyOfUser.phoneNumber = event.target.value;
                this.setState({ user: copyOfUser });
                break;
            case 'description':
                copyOfUser.description = event.target.value;
                this.setState({ user: copyOfUser });
                break;
            case 'role':
                console.log('radio button painettu', event.target)
                copyOfUser.role = event.target.value;
                this.setState({
                    userIsConsultant: !this.state.userIsConsultant,
                    user: copyOfUser
                });
                break;
            default:
                break;
        }
    }

    renderForm() {
        let user = this.state.user;
        return (
            <Form>
                <FormGroup controlid="firstName">
                    <Label for="firstName">First name</Label>
                    <Input onChange={this.handleChange} type="text" name="firstName" id="firstName" value={user.firstName} />
                </FormGroup>
                <FormGroup controlid="lastName">
                    <Label for="lastName">Last name</Label>
                    <Input onChange={this.handleChange} type="text" name="lastName" id="lastName" value={user.lastName} />
                </FormGroup>
                <FormGroup controlid="email">
                    <Label for="email">Email</Label>
                    <Input onChange={this.handleChange} type="email" name="email" id="email" value={user.email} />
                </FormGroup>
                <FormGroup controlid="phoneNumber">
                    <Label for="phoneNumber">Phone</Label>
                    <Input onChange={this.handleChange} type="number" name="phoneNumber" id="phoneNumber" value={user.phoneNumber} />
                </FormGroup>
                <FormGroup controlid="description">
                    <Label for="description">Description</Label>
                    <Input onChange={this.handleChange} type="text" name="description" id="description" value={user.description} />
                </FormGroup>
                <FormGroup tag="fieldset">
                    <FormGroup controlid="role">
                        <FormGroup check>
                            <Label check>
                                <Input onChange={this.handleChange} type="radio" id="role" name="role" value="Consultant" checked={this.state.userIsConsultant} />{' '}
                                Consultant
                                </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input onChange={this.handleChange} type="radio" id="role" name="role" value="AM" checked={!this.state.userIsConsultant} />{' '}
                                AM
                                </Label>
                        </FormGroup>
                    </FormGroup>
                </FormGroup>
            </Form>
        )
    }

    renderUserDetails() {
        let user = this.state.user;
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
        )
    }

    render() {
        return (
            <div className='container'>
                {this.state.editingDisabled ? this.renderUserDetails() : this.renderForm()}
                <Button onClick={this.edit}>{this.state.editingDisabled ? 'Edit' : 'Save'}</Button>
            </div>
        );
    }
}

export default UserProfile;