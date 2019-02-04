import React, { Component } from 'react';
import { Button, Container } from 'reactstrap';

import { GetConsultantInfo, EditProfile } from '../ServiceClient'
import UserProfileForm from '../Components/UserProfileForm';
import UserProfileDetails from '../Components/UserProfileDetails';

const USER_ID = '1'; // hard coded userId for demo purposes

export default class UserProfile extends Component {
    state = {
        userId: USER_ID,
        user: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            description: '',
            role: ''
        },
        isEditing: false,
        userIsConsultant: false,
    }

    componentDidMount() {
        GetConsultantInfo(this.state.userId, response => {
            if (response.status === 200) {
                let user = response.data;
                let userIsConsultant = (user.role === 'Consultant');
                this.setState({ user, userIsConsultant });
            } else {
                console.log('error', response.status);
                // some kind of redirect to an error page?
            }
        });
    }

    editMode = (btn) => {
        if (btn.target.value === 'Save') {
            EditProfile(this.state.userId, this.state.user, response => {
                if (response.status === 200) {
                    console.log('success', response.status);
                    // some kind of 'save successfull' message for the user?
                } else {
                    console.log('error', response.status);
                    // some kind of redirect to an error page?
                }
            });
        }
        this.setState({ isEditing: !this.state.isEditing });
    }

    handleChange = event => {
        let copyOfUser = { ...this.state.user }
        switch (event.target.id) {
            case 'firstName':
                copyOfUser.firstName = event.target.value;
                break;
            case 'lastName':
                copyOfUser.lastName = event.target.value;
                break;
            case 'email':
                copyOfUser.email = event.target.value;
                break;
            case 'phoneNumber':
                copyOfUser.phoneNumber = event.target.value;
                break;
            case 'description':
                copyOfUser.description = event.target.value;
                break;
            case 'role':
                copyOfUser.role = event.target.value;
                this.setState({
                    userIsConsultant: !this.state.userIsConsultant,
                });
                break;
            default:
                break;
        }
        this.setState({ user: copyOfUser });
    }

    renderUserProfileForm() {
        return (
            <UserProfileForm user={this.state.user} handleChange={this.handleChange} userIsConsultant={this.state.userIsConsultant} />
        )
    }

    renderUserProfileDetails() {
        return (
            <UserProfileDetails user={this.state.user} />
        )
    }

    render() {
        let buttonText = this.state.isEditing ? 'Save' : 'Edit';
        return (
            <Container>
                <h2>User profile</h2>
                {this.state.isEditing ? this.renderUserProfileForm() : this.renderUserProfileDetails()}
                <Button onClick={this.editMode} value={buttonText}>{buttonText}</Button>
            </Container>
        );
    }
}