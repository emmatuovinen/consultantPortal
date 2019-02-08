import React, { Component } from "react";
import { GetAllPositions } from "../serviceClients/PositionService";
import { Col, Container, Button } from "reactstrap";
import PositionCard from "../Components/PositionCard";

class PositionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: [],
      onlyActivePositions: true
    };
  }

  componentDidMount = () => {
    GetAllPositions(response => {
      if (response.status === 200) {
        let allPositions = response.data;
        this.setState({ positions: allPositions });
      } else {
        console.log("Error, response.status: " + response.status);
      }
    });
  };

  handleClick = () => {
    this.setState({ onlyActivePositions: !this.state.onlyActivePositions });
  };

  renderActivePositions = () => {
    let activePositions = this.state.positions.map((position, index) => {
      if (position.isActive) {
        return (
          <Col key={index} sm="12" md="4" lg="3">
            <PositionCard
              positionId={position.positionId}
              description={position.positionDescription}
              role={position.positionRole}
              location={position.location}
              active={position.isActive}
            />
          </Col>
        );
      } else {
        return "";
      }
    });
    return activePositions.length > 0 ? (
      <Container>{activePositions} </Container>
    ) : (
        <Container>
          <p>Sorry, no active positions.</p>
        </Container>
      );
  };

  renderAllPositions = () => {
    let positionsList = this.state.positions.map((position, index) => {
      return (
        <Col key={index} sm="12" md="4" lg="3">
          <PositionCard
            positionId={position.positionId}
            description={position.positionDescription}
            role={position.positionRole}
            location={position.location}
            active={position.isActive}
          />
        </Col>
      );
    });
    return <Container>{positionsList}</Container>;
  };

  render() {
    let btnText = this.state.onlyActivePositions
      ? "Show all positions"
      : "Show only active positions";
    return (
      <Container>
        <Button color="secondary" onClick={this.handleClick}>
          {btnText}
        </Button>
        {this.state.onlyActivePositions
          ? this.renderActivePositions()
          : this.renderAllPositions()}
      </Container>
    );
  }
}

export default PositionsList;
