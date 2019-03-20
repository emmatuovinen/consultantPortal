import React, { Component } from "react";
import { Button, Container } from "reactstrap";

import { GetConsultantInfo } from "../serviceClients/UserService";
import UserProfileDetails from "../Components/UserProfileDetails";

class ViewNonEditableProfile extends Component {
  state = {
    userId: this.props.match.params.id,
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
    GetConsultantInfo(this.state.userId, response => {
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
        <h2>Consultant profile</h2>
        <UserProfileDetails
          user={this.state.user}
          userIsConsultant={this.state.userIsConsultant}
        />
        <Button onClick={this.returnToFrontPage}>Back</Button>
      </Container>
    );
  }
}

export default ViewNonEditableProfile;
