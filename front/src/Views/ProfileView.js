import React, { Component } from "react";
import UserProfile from "../Containers/UserProfile";

class ProfileView extends Component {
  render() {
    return <UserProfile role={this.props.role} />;
  }
}

export default ProfileView;
