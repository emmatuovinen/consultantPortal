import React, { Component } from "react";
import UserProfile from "../Containers/UserProfile";

class ProfileView extends Component {

  render() {
    return <UserProfile role={this.props.props} props={this.props.roles}/>;
  }
}

export default ProfileView;
