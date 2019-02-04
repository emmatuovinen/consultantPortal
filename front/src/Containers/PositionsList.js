import React, { Component } from "react";
import { GetAllPositions } from "../serviceClients/PositionService";
import { Col, Container, Row } from "reactstrap";
import PositionCard from "../Components/PositionCard";

class PositionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: []
    };
  }

  componentDidMount = () => {
    GetAllPositions(response => {
      if (response.status === 200) {
        console.log(response.data);
        let allPositions = response.data;
        this.setState({ positions: allPositions });
      } else {
          console.log("Error, response.status: " + response.status);
      }
    });
  };

  render() {
    let positionsList = this.state.positions.map((position, index) => {
      return (
        <Col key={index} sm="12" md="4" lg="3">
          <PositionCard
            key={position.positionId}
            description={position.positionDescription}
            role={position.positionRole}
            location={position.location}
            active={position.isActive}
          />
        </Col>
      );
    });
    return (
      <Container>
        <Row>{positionsList}</Row>
      </Container>
    );
  }
}

export default PositionsList;
