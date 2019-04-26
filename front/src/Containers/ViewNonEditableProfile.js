import React, { Component } from "react";
import { Button, Col, Row, Container } from "reactstrap";

import { GetConsultantInfo } from "../serviceClients/UserService";
import UserProfileDetails from "../Components/UserProfileDetails";
import "../Components/Styles/App.css";

class ViewNonEditableProfile extends Component {
  state = {
    dbId: this.props.match.params.id,
    user: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      description: "",
      role: ""
    },
    userIsConsultant: false
  };

  componentDidMount() {
    console.log("view", this.props.match)
    GetConsultantInfo(this.state.dbId, response => {
      if (response.status === 200) {
        let user = response.data;
        let userIsConsultant = user.role === "Consultant";
        this.setState({ user, userIsConsultant });
      } else {
        console.log("error", response.status);
        // some kind of redirect to an error page?
      }
    });
  }

  returnToFrontPage = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <Container>
        <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
      
        <h2>Consultant profile</h2>
        </Col>
        </Row>
        <UserProfileDetails
          user={this.state.user}
          userIsConsultant={this.state.userIsConsultant}
        />
      <Row>
          {/* <Col sm="12" md={{ size: 6, offset: 3 }}> */}<Button className="back-button" onClick={this.returnToFrontPage}>Back</Button>{/* </Col> */}
        </Row>
     
      </Container>
    );
  }
}

export default ViewNonEditableProfile;
