import React, { Component } from 'react';
import UserCard from './UserCard';
import { Container, Row, Col } from 'reactstrap';

const API = "http://localhost:5000/api/users"

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch(API)
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({ users: data })
            })
            .catch(err => console.log("ERROR: ", err))
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