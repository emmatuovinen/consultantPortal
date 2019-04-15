import React, { Component } from "react";
import { Button, Container, Col, Row } from "reactstrap";
import "../Components/Styles/App.css";
import {authContext} from '../adalconfig'

import {
  GetConsultantInfo,
  EditProfile,
  DeleteUser,
  GetConsultantInfobyEmail
} from "../serviceClients/UserService";
import UserProfileForm from "../Components/UserProfileForm";
import UserProfileDetails from "../Components/UserProfileDetails";

//const USER_ID = "2"; // hard coded userId for demo purposes

export default class UserProfile extends Component {
  state = {
    //userId: this.state.user.email,
    userEmail: "mikko@malli.fi", //authContext._user.userName,
    user: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      description: "",
      role: "",
      userSkills: [],
      linkedInUrl: "",
      gitHubUrl: "",
      pictureUrl: "",
      preferableRoles: [],
      lessPreferableRoles: []
    },
    isEditing: false,
    userIsConsultant: false
  };

  componentDidMount() {
    // GetConsultantInfo(this.state.userId, response => {
    //   if (response.status === 200) {
    //     let user = response.data;
    //     let userIsConsultant = user.role === "Consultant";
    //     user.userSkills = user.userSkills || [];
    //     this.setState({ user, userIsConsultant });
    //   } else {
    //     console.log("error", response.status);
    //     // some kind of redirect to an error page?
    //   }
    // });
    GetConsultantInfobyEmail(this.state.userEmail, response => {
      if (response.status === 200) {
        let user = response.data;
        let userIsConsultant = user.role === "Consultant";
        user.userSkills = user.userSkills || [];
        this.setState({ user, userIsConsultant });
      } else {
        console.log("error", response.status);
        // some kind of redirect to an error page?
      }
    });
    
  }

  // handleDeleteUser = () => {
  //   // now we can only delete our hard coded user, update this in the future
  //   DeleteUser(USER_ID);
  // };

  
  handleDeleteUser = () => {
    // now we can only delete our hard coded user, update this in the future
    DeleteUser(this.state.userId);
  };

  editMode = btn => {
    if (btn.target.value === "Save") {
      EditProfile(this.state.userId, this.state.user, response => {
        if (response.status === 200) {
          console.log("success", response.status);
          // some kind of 'save successfull' message for the user?
        } else {
          console.log("error", response.status);
          // some kind of redirect to an error page?
        }
      });
    }
    this.setState({ isEditing: !this.state.isEditing });
  };

  handleChange = event => {
    let copyOfUser = { ...this.state.user };
    switch (event.target.id) {
      case "firstName":
        copyOfUser.firstName = event.target.value;
        break;
      case "lastName":
        copyOfUser.lastName = event.target.value;
        break;
      case "email":
        copyOfUser.email = event.target.value;
        break;
      case "phoneNumber":
        copyOfUser.phoneNumber = event.target.value;
        break;
      case "description":
        copyOfUser.description = event.target.value;
        break;
      case "linkedInUrl":
        copyOfUser.linkedInUrl = event.target.value;
        break;
      case "gitHubUrl":
        copyOfUser.gitHubUrl = event.target.value;
        break;
      case "userPictureUrl":
        copyOfUser.pictureUrl = event.target.value;
        break;
      case "role":
        copyOfUser.role = event.target.value;
        this.setState({
          userIsConsultant: !this.state.userIsConsultant
        });
        break;
      case "userSkills":
        copyOfUser.userSkills.push(event.target.innerHTML);
        break;
      default:
        break;
    }
    this.setState({ user: copyOfUser });
  };

  renderUserProfileForm() {
    return (
      <UserProfileForm
        user={this.state.user}
        handleChange={this.handleChange}
        userIsConsultant={this.state.userIsConsultant}
        onChange={this.clickedItem}
      />
    );
  }

  renderUserProfileDetails() {
    console.log(this.state.user)
    return (
      <UserProfileDetails
        user={this.state.user}
        userIsConsultant={this.state.userIsConsultant}
      />
    );
  }
  logout () {
    authContext.logOut()
  }
  
  render() {
    console.log(authContext)

    //console.log(getToken(authContext._user.userName))
    //console.log(authContext._user.userName)
    let buttonText = this.state.isEditing ? "Save" : "Edit";
    return (
      <Container>
        <br />
        {this.state.isEditing
          ? this.renderUserProfileForm()
          : this.renderUserProfileDetails()}
        <Row>
          <Col lg="5" /*style={{ backgroundColor: 'yellow' }}*/ />
          <Col lg="7">
            <Button onClick={this.editMode} value={buttonText}>
              {buttonText}
            </Button>
            <Button
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete your profile?"
                  )
                )
                  this.handleDeleteUser();
              }}
              color="success"
            >
              Delete Profile
            </Button>
            <Button onClick={this.logout}>Log out</Button>
            
          </Col>
        </Row>
      </Container>
    );
  }
}
