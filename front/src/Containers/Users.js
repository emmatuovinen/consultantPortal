import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import UserCard from '../Components/UserCard';
import { GetAllUsers } from '../ServiceClient';

// const API = "http://localhost:5000/api/users"

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount = () => {
        GetAllUsers(response => {
            let allUsers = response;
            this.setState({users:allUsers})
            console.log("allUsers: ", allUsers)
        });
    }

    render() {
        let users = this.state.users.map((user, index) => {
            return (
                <Col key={index} md="3">
                    <UserCard
                        key={user.userId}
                        firstName={user.firstName}
                        lastName={user.lastName}
                        role={user.role}
                        description={user.description}
                        phoneNumber={user.phoneNumber}
                        email={user.email}
                    />
                </Col>
            )
        }
        )

        return (
            <Container>
                <Row>
                    {users}
                </Row>
            </Container >



        );
    }
}

export default Users;