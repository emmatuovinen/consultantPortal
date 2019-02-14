import React, { Component } from "react";
import { GetAllPositions } from "../serviceClients/PositionService";
import { Container } from "reactstrap";

import PositionFilter from "./PositionFilter";


class PositionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: [],
      filteredPositions: []
    };
  }

  componentDidMount() {
    GetAllPositions(response => {
      if (response.status === 200) {
        let allPositions = response.data;
        this.setState({ positions: allPositions, filteredPositions: allPositions });
      } else {
        console.log("Error, response.status: " + response.status);
      }
    });
  };


  renderPositionFilter = () => {
    if (this.state.positions.length > 0) {
      return <PositionFilter positions={this.state.filteredPositions}  />;
    }
  };

  render() {
    return (
      <Container>        
        {this.renderPositionFilter()}       
      </Container>
    );
  }
}

export default PositionsList;
