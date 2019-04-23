import React, { Component } from "react";
import UserProfile from "../Containers/UserProfile";

class ProfileView extends Component {
  render() {
    console.log("ProfileView.js, role: ", this.props.role);
    console.log("ProfileView.js, props: ", this.props.props);
    return <UserProfile role={this.props.role} />;
  }
}

export default ProfileView;
