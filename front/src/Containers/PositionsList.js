import React, { Component } from "react";
import { GetAllPositions } from "../serviceClients/PositionService";

class PositionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: []
    };
  }

  componentDidMount = () => {
    GetAllPositions(response => {
      if (response === 200) {
        console.log(response.data);
        let allPositions = response.data;
        this.setState({ positions: allPositions });
      } else console.log("Error: " + response.status);
    });
  };

  render() {
    let positionsList = this.state.positions.map((position, index) => {
      return (
        <Col key={index} sm="12" md="6" lg="3">
          <UserCard
            key={position.positionId}
            description={position.description}
            role = {position.positionRole}
            location = {position.location}
          />
        </Col>
      );
    });
    return <div>
        {positionsList}
    </div>;
  }
}

export default PositionsList;
