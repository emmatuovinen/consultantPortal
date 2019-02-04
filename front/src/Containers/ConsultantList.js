import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import UserCard from "../Components/UserCard";
import { GetAllConsultants } from "../serviceClients/UserService";

class ConsultantList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      consultants: []
    };
  }

  componentDidMount = () => {
    GetAllConsultants(response => {
      if (response.status === 200) {
        let allConsultants = response.data;
        this.setState({ consultants: allConsultants });
      } else {
        console.log("Error, response status: " + response.status);
      }
    });
  };

  render() {
    let consultantsListed = this.state.consultants.map((consultant, index) => {
      return (
        <Col key={index} sm="12" md="6" lg="3">
          <UserCard
            userId={consultant.userId}
            key={consultant.userId}
            firstName={consultant.firstName}
            lastName={consultant.lastName}
            role={consultant.role}
            description={consultant.description}
            phoneNumber={consultant.phoneNumber}
            email={consultant.email}
          />
        </Col>
      );
    });

    return (
      <Container>
        <Row>{consultantsListed}</Row>
      </Container>
    );
  }
}

export default ConsultantList;
