import React, { Component } from 'react';
import { Button } from 'reactstrap';

import { GetConsultantInfo, EditProfile } from '../ServiceClient'
import UserProfileForm from '../Components/UserProfileForm';
import UserProfileDetails from '../Components/UserProfileDetails';

const USER_ID = '1';

export default class UserProfile extends Component {
    state = {
        userId: USER_ID,
        user: {},
        isEditing: false,
        userIsConsultant: true,
    }

    componentDidMount() {
        GetConsultantInfo(this.state.userId, callback => {
            if (callback.status === 200) {
                let user = callback.data;
                let userIsConsultant = (user.role === 'Consultant');
                this.setState({ user, userIsConsultant });
            } else {
                console.log('error', callback.status);
                // some kind of error message for the user?
            }
        });
    }

    editMode = (btn) => {
        this.setState({ isEditing: !this.state.isEditing });
        if (btn.target.value === 'Save') {
            EditProfile(this.state.userId, this.state.user, callback => {
                console.dir(callback);
            });
        }
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
            <div className='container'>
                <h2>User profile</h2>
                {this.state.isEditing ? this.renderUserProfileForm() : this.renderUserProfileDetails()}
                <Button onClick={this.editMode} value={buttonText}>{buttonText}</Button>
            </div>
        );
    }
}