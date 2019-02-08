import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

import UserProfileConsultantForm from '../Components/UserProfileConsultantForm';

const UserProfileForm = (props) => {
    let user = props.user;
    return (
        <div>
            <Form>
                <FormGroup controlid="firstName">
                    <Label for="firstName">First name</Label>
                    <Input onChange={props.handleChange} type="text" name="firstName" id="firstName" value={user.firstName} />
                </FormGroup>
                <FormGroup controlid="lastName">
                    <Label for="lastName">Last name</Label>
                    <Input onChange={props.handleChange} type="text" name="lastName" id="lastName" value={user.lastName} />
                </FormGroup>
                <FormGroup controlid="email">
                    <Label for="email">Email</Label>
                    <Input onChange={props.handleChange} type="email" name="email" id="email" value={user.email} />
                </FormGroup>
                <FormGroup controlid="phoneNumber">
                    <Label for="phoneNumber">Phone</Label>
                    <Input onChange={props.handleChange} type="number" name="phoneNumber" id="phoneNumber" value={user.phoneNumber} />
                </FormGroup>
                <FormGroup controlid="linkedInUrl">
                    <Label for="linkedInUrl">LinkedIn address</Label>
                    <Input onChange={props.handleChange} type="text" name="linkedInUrl" id="linkedInUrl" value={user.linkedInUrl} />
                </FormGroup>
                <FormGroup controlid="gitHubUrl">
                    <Label for="gitHubUrl">Github address</Label>
                    <Input onChange={props.handleChange} type="text" name="gitHubUrl" id="gitHubUrl" value={user.gitHubUrl} />
                </FormGroup>
                <FormGroup controlid="description">
                    <Label for="description">Description</Label>
                    <Input onChange={props.handleChange} type="textarea" name="description" id="description" value={user.description} />
                </FormGroup>
                <FormGroup tag="fieldset">
                    <FormGroup controlid="role">
                        <FormGroup check>
                            <Label check>
                                <Input onChange={props.handleChange} type="radio" id="role" name="role" value="AM" checked={!props.userIsConsultant} />{' '}
                                AM
                                </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input onChange={props.handleChange} type="radio" id="role" name="role" value="Consultant" checked={props.userIsConsultant} />{' '}
                                Consultant
                                </Label>
                        </FormGroup>
                    </FormGroup>
                </FormGroup>
            </Form>
            {props.userIsConsultant && <UserProfileConsultantForm user={props.user} handleChange={props.handleChange} />}
        </div>
    );
}

export default UserProfileForm;
