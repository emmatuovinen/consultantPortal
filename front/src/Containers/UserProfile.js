import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { GetConsultantInfo } from '../ServiceClient'

class UserProfile extends Component {
    state = {
        userId: '20',
        user: {},
        editingDisabled: true,
        firstName: ''
    }

    componentDidMount() {
        GetConsultantInfo(this.state.userId, callback => {

            if (callback.status == 200) {
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
                    <Input onChange={this.handleChange} disabled={this.state.editingDisabled} type="text" name="firstName" id="firstName" value={user.firstName} />
                </FormGroup>
                <FormGroup controlid="lastName">
                    <Label for="lastName">Last name</Label>
                    <Input onChange={this.handleChange} disabled={this.state.editingDisabled} type="text" name="lastName" id="lastName" value={user.lastName} />
                </FormGroup>
                <FormGroup controlid="email">
                    <Label for="email">Email</Label>
                    <Input onChange={this.handleChange} disabled={this.state.editingDisabled} type="email" name="email" id="email" value={user.email} />
                </FormGroup>
                <FormGroup controlid="phoneNumber">
                    <Label for="phoneNumber">Phone</Label>
                    <Input onChange={this.handleChange} disabled={this.state.editingDisabled} type="number" name="phoneNumber" id="phoneNumber" value={user.phoneNumber} />
                </FormGroup>
                <FormGroup controlid="description">
                    <Label for="description">Description</Label>
                    <Input onChange={this.handleChange} disabled={this.state.editingDisabled} type="text" name="description" id="description" value={user.description} />
                </FormGroup>
                <FormGroup tag="fieldset">
                    <FormGroup controlid="role">
                        <FormGroup check>
                            <Label check>
                                <Input disabled={this.state.editingDisabled} type="radio" name="role" defaultChecked />{' '}
                                Consultant
                                </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input disabled={this.state.editingDisabled} type="radio" name="role" />{' '}
                                AM
                                </Label>
                        </FormGroup>
                    </FormGroup>
                </FormGroup>
            </Form>
        )
    }

    render() {
        return (
            <div className='container'>
                {this.state.editingDisabled ? <div>Data in none editing mode</div> : this.renderForm()}
                <Button onClick={this.edit}>{this.state.editingDisabled ? 'Edit' : 'Save'}</Button>
            </div>
        );
    }
}

export default UserProfile;