import React, { Component } from "react";
import { GetPositionInfo, EditPosition } from "../serviceClients/PositionService";
import { GetAllConsultants } from "../serviceClients/UserService";
import { Container, Button, Row, Col } from "reactstrap";
import PositionInfo from "../Components/PositionInfo";
import PositionForm from "../Components/PositionForm";
import UserCardSmall from '../Components/UserCardSmall';

const userRole = ["consultant", "AW"]; // test array

class PositionSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRole: userRole[0],
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
      isEditing: false,
      hideEditButton: false
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

  saveEditedPosition = () => {
    EditPosition(this.state.positionId, this.state.position, response => {
        if (response.status === 200) {
          console.log(response.status)
        } else {
          console.log("error", response.status);
        }
      });
    
  };

  handleChange = e => {
    const id = e.target.id;
    const value = e.target.value;
    let change = { ...this.state.position }
    change[id] = value;

    this.setState({
      position: change,
    });
  }

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
    let consultantsListed = candidates.map((consultant, index) => {
      return (
        <Col key={index}>
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
        <Row>
            <h2>Top candidates</h2>
        </Row>
        <Row>
            {consultantsListed.slice(0, 3)}
        </Row>
        <ColoredLine color="#7ab4ac" />
            <h3 align='center'> And more candidates</h3>
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

  renderPositionForm = () => {
    return (
      <PositionForm
        position={this.state.position}
        isEditing={this.state.isEditing}
        handleChange={this.handleChange}
        onButtonClick={this.saveEditedPosition.bind(this)}
      />
    );
  };

  render() {
    
    const hideButton = this.state.hideEditButton? {display: "none"} : {};

    return (
      <Container>
        
          <Row>
            <h2>Position</h2>
            {this.state.isEditing ? (
              this.renderPositionForm()
            ) : (
            this.renderPositionInfo() )}
          
           
          </Row>
          <Row>
          <Col xs={12} md={8}></Col>
          <Col xs={6} md={4} >
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
                <Button outline color="success" onClick={() => this.setState({isEditing: !this.state.isEditing, hideEditButton: !this.state.isHidden})} style={hideButton}>
                  Edit
              </Button>
              )}
            
              </Col>
          </Row>
        <Row>
        {this.renderCandidates()}
        </Row>
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

export default PositionSelection;
