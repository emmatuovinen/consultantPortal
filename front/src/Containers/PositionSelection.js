import React, { Component } from "react";
import { GetPositionInfo } from "../serviceClients/PositionService";
import { GetAllConsultants } from "../serviceClients/UserService";
import { Container, Button, Row, Col } from "reactstrap";
import PositionInfo from "../Components/PositionInfo";
import EditPositionForm from "../Components/EditPositionForm";
import UserCardSmall from '../Components/UserCardSmall';

const ROLE = "AM" // test variable for creating different views depending on role. Change between AW and consultant to try it out

class PositionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positionId: this.props.match.params.positionId,
      position: {
        positionDescription: "",
        positionRole: "",
        location: "",
        positionStatus: "",
        positionSkills: [],
        isActive: true
      },
      userIsConsultant: true,
      consultants: [],
      topCandidates: [],
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
    GetAllConsultants(response => {
      if (response.status === 200) {
        let users = response.data;
        this.setState({ consultants: users });
      } else {
        console.log("Error: ", response.status);
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

  handleTopCandidates = () => {
    let consultants = [...this.state.consultants];
    let candidates = consultants.map(consultant => {
      return this.handleCompare(consultant);
    })
      .sort((a, b) => b.hits - a.hits)
    return candidates;
  };

  handleCompare = consultant => {
    let userSkills = [...consultant.userSkills];
    let positionSkills = [...this.state.position.positionSkills];
    let hits = 0;

    userSkills.map(skill => {
      if (positionSkills.includes(skill)) { hits++ }
      return skill;
    });
    return { ...consultant, hits };
  };

  renderCandidates = () => {
    let candidates = this.handleTopCandidates();
    let positionSkills = [...this.state.position.positionSkills]
    let consultantsListed = candidates.map((consultant) => {
      return (
        <Col>
          <UserCardSmall
            userId={consultant.userId}
            key={consultant.userId}
            firstName={consultant.firstName}
            lastName={consultant.lastName}
            role={consultant.role}
            userSkills={consultant.userSkills}
            preferableRoles={consultant.preferableRoles}
            description={consultant.description}
            phoneNumber={consultant.phoneNumber}
            email={consultant.email}
            pictureUrl={consultant.pictureUrl}
            positionSkills={positionSkills}
          >Skills matched: {consultant.hits}/{positionSkills.length}</UserCardSmall>
        </Col>
      );
    });
    return (
      <Container>
        <h2 align="center">Top candidates</h2>
        <Row>
          {consultantsListed.slice(0, 3)}
        </Row>
        <ColoredLine color="green" />
        <h3 align='center'> And the rest of them</h3>
        <Row>
          {consultantsListed.slice(3)}
        </Row>
      </Container>
    );
  }

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
        {this.renderCandidates()}
      </Container>
    );
  }
}

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 1
    }}
  />
);

export default PositionDetails;