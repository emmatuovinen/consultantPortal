import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { withRouter } from 'history';

import { GetConsultantInfo } from '../ServiceClient';
import UserProfileDetails from '../Components/UserProfileDetails';

class ViewNonEditableProfile extends Component {

    state = {
        userId: this.props.match.params.id,
        user: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            description: '',
            role: ''
        },
    }

    componentDidMount() {
        GetConsultantInfo(this.state.userId, response => {
            this.setState({ user: response.data })
        });
    }

    returnToFrontPage = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h2>Consultant profile</h2>
                <UserProfileDetails user={this.state.user} />
                <Button onClick={this.returnToFrontPage}>Back</Button>
            </div>
        );
    }
}

export default ViewNonEditableProfile;