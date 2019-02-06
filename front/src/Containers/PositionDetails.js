import React, { Component } from "react";
import { GetPositionInfo } from "../serviceClients/PositionService";
import { Jumbotron, Container, Button, Row, Col } from "reactstrap";

class PositionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positionId: this.props.match.params.positionId,
      position: {
        positionDescription: "",
        positionRole: "",
        location: "",
        positionSkills: [],
        isActive: true
      }
    };
  }

  componentDidMount = () => {
    GetPositionInfo(this.state.positionId, response => {
      if (response.status === 200) {
        let position = response.data;
        this.setState({ position });
      } else {
        console.log("Error: " + response.status);
      }
    });
  };

  handleAddFavorite = () => {
      console.log("Position added to favorites");
      //Here we need to add logic to add the position to current user's favorites
  };

  render() {
    let positionSkills = []
    if(this.state.position.positionSkills != null){
      positionSkills =this.state.position.positionSkills.map((skill, i) => {
        return(
          <li key={i}>{skill}</li>
        )
      });
    }


    return (
      <div className="buttons_group">
        <Jumbotron fluid>
          <Container>
            <Row>
              <Col>
            <img alt="logo" src="https://aw-publicwebstorage-cdn-endpoint-prod-001.azureedge.net/aw-content/logo_main_green.svg" height="120px" length="120px"></img>
            </Col>
            <Col>
            <h3>Position </h3>
            <p>Role: {this.state.position.positionRole}</p>
            <p>Location: {this.state.position.location}</p>
            <p>Description: {this.state.position.positionDescription}</p>
            <p>Skills:</p>
            <ul>{positionSkills}</ul>
            </Col>
            </Row>
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
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default PositionDetails;
