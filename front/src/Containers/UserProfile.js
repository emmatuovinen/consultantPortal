import React, { Component } from "react";
import { Button, Container, Col, Row } from "reactstrap";
import "../Components/Styles/App.css";
import { authContext } from '../adalconfig'

import {
  CreateUser,
  EditProfile,
  DeleteUser,
  GetConsultantInfobyEmail
} from "../serviceClients/UserService";
import UserProfileForm from "../Components/UserProfileForm";
import UserProfileDetails from "../Components/UserProfileDetails";

//const USER_ID = "2"; // hard coded userId for demo purposes

export default class UserProfile extends Component {
  state = {
    userEmail: authContext._user.userName,
    user: {
      userId: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      description: "",
      role: this.props.role,
      userSkills: [],
      linkedInUrl: "",
      gitHubUrl: "",
      pictureUrl: "",
      preferableRoles: [],
      //lessPreferableRoles: []
    },
    isEditing: false,
    userIsConsultant: false,
    firstTimeLogin: false
  };

  componentDidMount() {

/*
    - GetConsultantInfobyEmail from the database
      - If the email is found, the user exists and the profile view is rendered
      - If the email is not found, the user is login for the first time and
        the UserProfileForm is rendered for the user to fill the data in.
        Email, firstname and lastname are prefilled in.
*/
    console.log("UserProfile, email: ", this.state.userEmail);
    console.log("this.props.role: ", this.props.role);
    GetConsultantInfobyEmail(this.state.userEmail, response => {
      if (response.status === 200) {
        let user = response.data;
        let userIsConsultant = user.role === "Consultant";
        user.userSkills = user.userSkills || [];
        this.setState({ user, userIsConsultant });
        console.log("Mitä ihmettä: ", this.state.user, this.state.userIsConsultant);
      } else if (response.status === 404) {
        
        let copyOfUser = { ...this.state.user };
        copyOfUser.email = authContext._user.userName;
        copyOfUser.firstName = authContext._user.profile.given_name;
        copyOfUser.lastName = authContext._user.profile.family_name;
        copyOfUser.role = this.props.role;
        console.log("UserProfile.js, rooli: ", this.props.role);
        let userIsConsultant = copyOfUser.role === "Consultant";
        this.setState({ user: copyOfUser, isEditing: !this.state.isEditing, firstTimeLogin: true, userIsConsultant: userIsConsultant });
        console.log("Kun status 404: ", this.state.userIsConsultant, this.state.user);
      } else {
        console.log("Error in retrieving user information from the database: ", response.status);
      }
    });
  }


  handleDeleteUser = () => {
    // now we can only delete our hard coded user, update this in the future -->
    // Now deletes "real user" from test database
    console.log(this.state.user.userId)
    DeleteUser(this.state.user.userId);
  };

  handleCancel = () => {
    this.setState({ isEditing: !this.state.isEditing, firstTimeLogin: false });
  }

  editMode = btn => {
    if (btn.target.value === "Save") {
      EditProfile(this.state.user.userId, this.state.user, response => {
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

  createMode = () => {
    console.log("User data: ", this.state.user);
    CreateUser(this.state.user, response => {
      console.log("Response: ", response);
      if (response.status === 200) {
        console.log("User profile created: ", response.status);
        this.setState({ isEditing: !this.state.isEditing, firstTimeLogin: false });
      } else {
        console.log("User profile not created, error: ", response);
        this.setState({ isEditing: this.state.isEditing, firstTimeLogin: this.state.firstTimeLogin });
      }
    })

  }

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
    console.log("copyOfUser: ", copyOfUser);
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

    return (
      <UserProfileDetails
        user={this.state.user}
        userIsConsultant={this.state.userIsConsultant}
      />
    );
  }
  

  render() {
    console.log("Userprofile.js", this.props.role )
    console.log("Userprofile.js", this.props.props )

    let buttonTextSave = this.state.isEditing ? "Save" : "Edit";
    let buttonTextCancel = this.state.firstTimeLogin ? "Cancel" : "Delete Profile";

    return (
      <Container>
        <br />
        {this.state.isEditing
          ? this.renderUserProfileForm()
          : this.renderUserProfileDetails()}
        <Row>
          <Col lg="5" /*style={{ backgroundColor: 'yellow' }}*/ />
          <Col lg="7">
            <Button onClick={this.state.firstTimeLogin ? this.createMode : this.editMode} value={buttonTextSave}>
              {buttonTextSave}
            </Button>
            <Button
              onClick={this.state.firstTimeLogin
                ? this.handleCancel
                : function() {
                  if (window.confirm("Are you sure you want to delete your profile?"))
                    this.handleDeleteUser();
                  }}
                  color="success"
            >
              {buttonTextCancel}
            </Button>
                  {/* Above delete button doesn't work, button commented below works */}
            {/* <Button
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
              {buttonTextCancel}
            </Button> */}
          </Col>
        </Row>
      </Container>
    );
  }
}
