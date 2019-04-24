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
      role: "",
      userSkills: [],
      linkedInUrl: "",
      gitHubUrl: "",
      pictureUrl: "",
      preferableRoles: [],
      lessPreferableRoles: []
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
    let userRole = sessionStorage.getItem('aw-role');
    console.log("userRole from sessionStorage: ", userRole);
    GetConsultantInfobyEmail(this.state.userEmail, response => {
      if (response.status === 200) {
        let user = response.data;
        let userIsConsultant = userRole === "Consultants";
        user.userSkills = user.userSkills || [];
        this.setState({ user, userIsConsultant });
      } else if (response.status === 404) {
        
        let copyOfUser = { ...this.state.user };
        copyOfUser.email = authContext._user.userName;
        copyOfUser.firstName = authContext._user.profile.given_name;
        copyOfUser.lastName = authContext._user.profile.family_name;
        copyOfUser.role = userRole;
        let userIsConsultant = userRole === "Consultants";
        this.setState({ user: copyOfUser, isEditing: !this.state.isEditing, firstTimeLogin: true, userIsConsultant: userIsConsultant });
      } else {
        console.log("Error in retrieving user information from the database: ", response.status);
      }
    });
  }


  handleDeleteUser = () => {
    // now we can only delete our hard coded user, update this in the future -->
    // Now deletes "real user" from test database
    if (window.confirm("Are you sure you want to delete your profile?")) {
      console.log(this.state.user.userId)
      DeleteUser(this.state.user.userId, response => {
        console.log("delete: ", response);
      });
    }
  };

  /*
    - This function is a handler for the Cancel button in the UserProfileForm component
      when the user is login for the first time and the form is rendered as a first page
      for the user to fill his/her information in.
      This function just sets the states which causes the rendering of the UserProfileDetails page
  */
  handleCancel = () => {
    this.setState({ isEditing: !this.state.isEditing, firstTimeLogin: false });
  }

  // - Function for handling the update of the user information
  editMode = btn => {
    console.log("editMode: ", this.state.user);
    if (btn.target.value === "Save") {
      EditProfile(this.state.user.userId, this.state.user, response => {
        if (response.status === 200) {
          console.log("editMode success", response.status);
          // some kind of 'save successfull' message for the user?
        } else {
          console.log("editMode error:", response.status);
          // some kind of redirect to an error page?
        }
      });
    }
    this.setState({ isEditing: !this.state.isEditing });
  };
/* - Function for adding the user information to the database when
    the user is loggin in for the first time i.e. creating the user to DB.
*/
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
      // case "roleInterests":
      //   copyOfUser.roleInterests.push(event.target.value);
      //   break;
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

    return (
      <UserProfileDetails
        user={this.state.user}
        userIsConsultant={this.state.userIsConsultant}
      />
    );
  }
  

  render() {

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
              onClick={this.state.firstTimeLogin ? this.handleCancel : this.handleDeleteUser}
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
