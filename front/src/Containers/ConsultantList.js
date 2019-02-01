import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import UserCard from "../Components/UserCard";
import { GetAllConsultants } from "../ServiceClient";

class ConsultantList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount = () => {
    GetAllConsultants(response => {
      if (response.status === 200) {
        let allUsers = response.data;
        this.setState({ users: allUsers });
      } else {
        console.log("Error, response status: " + response.status);
      }
    });
  };

  render() {
    let users = this.state.users.map((user, index) => {
      return (
        <Col key={index} sm="12" md="6" lg="3">
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
      );
    });

    return (
      <Container>
        <Row>{users}</Row>
      </Container>
    );
  }
}

export default ConsultantList;
