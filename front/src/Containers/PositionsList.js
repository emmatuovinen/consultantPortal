import React, { Component } from "react";
import { GetAllPositions } from "../serviceClients/PositionService";
import { Container, Button } from "reactstrap";
import PositionCard from "../Components/PositionCard";
import PositionSearchBar from "./PositionSearchBar";

class PositionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: [],
      onlyActivePositions: true,
      filtered: []
    };
  }

  componentDidMount = () => {
    GetAllPositions(response => {
      if (response.status === 200) {
        let allPositions = response.data;
        this.setState({ positions: allPositions, filtered: allPositions });
      } else {
        console.log("Error, response.status: " + response.status);
      }
    });
  };

  handleClick = () => {
    this.setState({ onlyActivePositions: !this.state.onlyActivePositions });
  };

  renderActivePositions = () => {
    console.log("kakka", this.state.positions);
    let activePositions = this.state.positions.map((position, index) => {
      if (position.isActive) {
        return (
          <PositionCard
            key={index}
            positionId={position.positionId}
            description={position.positionDescription}
            role={position.positionRole}
            location={position.location}
            active={position.isActive}
          />
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
        <PositionCard
          key={index}
          positionId={position.positionId}
          description={position.positionDescription}
          role={position.positionRole}
          location={position.location}
          active={position.isActive}
        />
      );
    });
    return <Container>{positionsList}</Container>;
  };

  renderSearchBar = () => {
    console.log("renderistä: ", this.state.positions);
    if (this.state.positions.length > 0) {
      return <PositionSearchBar positions={this.state.positions} />;
    }
  };

  render() {
    console.log("logista: ", this.state.positions);
    let btnText = this.state.onlyActivePositions
      ? "Show all positions"
      : "Show only active positions";
    return (
      <Container>
        {this.renderSearchBar()}
        <Button
          color="secondary"
          onClick={this.handleClick}
          style={{ margin: "0.5em" }}
        >
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
