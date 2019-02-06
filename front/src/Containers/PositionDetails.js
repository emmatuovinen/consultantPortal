import React, { Component } from "react";
import { GetPositionInfo } from "../serviceClients/PositionService";
import { Jumbotron, Container, Button } from "reactstrap";

class PositionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positionId: this.props.match.params.positionId,
      position: {
        positionDescription: "",
        positionRole: "",
        location: "",
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
    return (
      <div className="buttons_group">
        <Jumbotron fluid>
          <Container>
            <h3>Position: </h3>
            <p>Role: {this.state.position.positionRole}</p>
            <p>Location: {this.state.position.location}</p>
            <p>Description: {this.state.position.positionDescription}</p>
            <Button outline color="danger">
              <span
                role="img"
                aria-label="favorite"
                title="Add to favorites"
                onClick={this.handleAddFavorite}
              >
                ❤️
              </span>
            </Button>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default PositionDetails;
