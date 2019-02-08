import React, { Component } from "react";
import { GetPositionInfo } from "../serviceClients/PositionService";
import { Container, Button } from "reactstrap";
import PositionInfo from "../Components/PositionInfo";
import EditPositionForm from "../Components/EditPositionForm";

const ROLE = "AM" // test variable for creating different views depending on role. Change between AW and consultant to try it out

class PositionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRole: ROLE,
      positionId: this.props.match.params.positionId,
      position: {
        positionDescription: "",
        positionRole: "",
        location: "",
        positionStatus: "",
        positionSkills: [],
        isActive: true
      },
      userIsConsultant: true
    };
  }

  componentDidMount = () => {
    GetPositionInfo(this.state.positionId, response => {
      if (response.status === 200) {
        let position = response.data;
        let userIsConsultant = (this.state.userRole === "consultant");
        this.setState({ position, userIsConsultant });
      } else {
        console.log("Error: " + response.status);
      }
    });
  };

  handleAddFavorite = () => {
    console.log("Position added to favorites");
    //Here we need to add logic to add the position to current user's favorites
  };

  handleClick = () => {
    console.log("editing position");
  };

  renderPositionInfo = () => {
    let positionSkills = [];
    if (this.state.position.positionSkills != null) {
      positionSkills = this.state.position.positionSkills.map((skill, i) => {
        return <li key={i}>{skill}</li>;
      });
    }

    let positionStatus = "";
    if (this.state.position.positionSkills != null) {
      positionStatus = this.state.position.positionStatus;
    }
    return (
      <PositionInfo
        position={this.state.position}
        positionSkills={positionSkills}
        positionStatus={positionStatus}
      />
    );
  };

  renderEditPositionForm = () => {
    return (
      <EditPositionForm
        position={this.state.position}
      />
    );
  };

  render() {
    return (
      <Container>
        <h2>Position</h2>
        {this.renderPositionInfo()}
        {this.state.userIsConsultant ? (
          <Button outline color="danger">
            <span
              role="img"
              aria-label="favorite"
              title="Add to favorites"
              onClick={this.handleAddFavorite}
            >
              ❤️ Add to favorites
            </span>
          </Button>
        ) : (
          <Button outline color="success" onClick={this.handleClick}>
            Edit
          </Button>
        )}
      </Container>
    );
  }
}

export default PositionDetails;
