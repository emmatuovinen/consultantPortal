import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

export default class UserProfileForm extends Component {
    render() {
        let user = this.props.user;
        return (
            <Form>
                <FormGroup controlid="firstName">
                    <Label for="firstName">First name</Label>
                    <Input onChange={this.props.handleChange} type="text" name="firstName" id="firstName" value={user.firstName} />
                </FormGroup>
                <FormGroup controlid="lastName">
                    <Label for="lastName">Last name</Label>
                    <Input onChange={this.props.handleChange} type="text" name="lastName" id="lastName" value={user.lastName} />
                </FormGroup>
                <FormGroup controlid="email">
                    <Label for="email">Email</Label>
                    <Input onChange={this.props.handleChange} type="email" name="email" id="email" value={user.email} />
                </FormGroup>
                <FormGroup controlid="phoneNumber">
                    <Label for="phoneNumber">Phone</Label>
                    <Input onChange={this.props.handleChange} type="number" name="phoneNumber" id="phoneNumber" value={user.phoneNumber} />
                </FormGroup>
                <FormGroup controlid="description">
                    <Label for="description">Description</Label>
                    <Input onChange={this.props.handleChange} type="textarea" name="description" id="description" value={user.description} />
                </FormGroup>
                <FormGroup tag="fieldset">
                    <FormGroup controlid="role">
                        <FormGroup check>
                            <Label check>
                                <Input onChange={this.props.handleChange} type="radio" id="role" name="role" value="Consultant" checked={this.props.userIsConsultant} />{' '}
                                Consultant
                                </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input onChange={this.props.handleChange} type="radio" id="role" name="role" value="AM" checked={!this.props.userIsConsultant} />{' '}
                                AM
                                </Label>
                        </FormGroup>
                    </FormGroup>
                </FormGroup>
            </Form>
        );
    }
}