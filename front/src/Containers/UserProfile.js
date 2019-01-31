import React, { Component } from 'react';
import { Button } from 'reactstrap';

import { GetConsultantInfo } from '../ServiceClient'
import UserProfileForm from '../Components/UserProfileForm';
import UserProfileDetails from '../Components/UserProfileDetails';

const USER_ID = '10';

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
                this.setState({ user: callback.data });
            } else {
                console.log('error', callback.status);
                // some kind of error message?
            }
        });
    }

    editMode = (btn) => {
        this.setState({ isEditing: !this.state.isEditing });
        if (btn.target.value === 'Save') {
            console.log('sending put request to the backend');
            // Axios call
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
                {this.state.isEditing ? this.renderUserProfileForm() : this.renderUserProfileDetails()}
                <Button onClick={this.editMode} value={buttonText}>{buttonText}</Button>
            </div>
        );
    }
}