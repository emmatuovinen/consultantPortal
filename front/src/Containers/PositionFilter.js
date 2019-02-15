import React, { Component } from "react";
import SearchInput, { createFilter } from "react-search-input";
import { Container, CustomInput, FormGroup } from "reactstrap";
import PositionCard from "../Components/PositionCard";

import "../styles/testi.css";

const KEYS_TO_FILTERS = ["positionRole", "company", "location", "positionSkills", "positionDescription"];

export default class PositionFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      positions: this.props.positions,
      positionFilter: "",
      onlyActivePositions: true
    };
    this.searchUpdated = this.searchUpdated.bind(this);
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  handleClick = () => {
    this.setState({ onlyActivePositions: !this.state.onlyActivePositions });
  };

  renderActivePositions = positions => {
    let activePositions = positions.map((position, index) => {
      if (position.isActive) {
        return (
          <PositionCard
            key={index}
            positionId={position.positionId}
            description={position.positionDescription}
            role={position.positionRole}
            location={position.location}
            active={position.isActive}
            company={position.company}
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

  renderAllPositions = positions => {
    let positionsList = positions.map((position, index) => {
      return (
        <PositionCard
          key={index}
          positionId={position.positionId}
          description={position.positionDescription}
          role={position.positionRole}
          location={position.location}
          active={position.isActive}
          company={position.company}
        />
      );
    });
    return <Container>{positionsList}</Container>;
  };

  render() {
    let filteredPositions = this.state.positions.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );
    let btnText = this.state.onlyActivePositions
      ? "Switch on for all positions"
      : "Switch off for only active positions";

    return (
      <div className="testi">
        <div>
            <Container>
              <SearchInput
                onChange={this.searchUpdated}
                className="search-input"
              />
            <FormGroup>
            <CustomInput
              type="switch"
              name="exampleCustomSwitch"
              onClick={this.handleClick}
              id="exampleCustomSwitch"
              style={{ margin: "1em" }}
              label={btnText}
              />
            </FormGroup>
              </Container>
          <div>
            {this.state.onlyActivePositions
              ? this.renderActivePositions(filteredPositions)
              : this.renderAllPositions(filteredPositions)}
          </div>
        </div>
      </div>
    );
  }
}
