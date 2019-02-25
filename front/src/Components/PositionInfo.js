import React from "react";
import { Row, Container, Col} from "reactstrap";

const PositionDetailsForConsultant = (props) => {
  let position = props.position;

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <img
              alt="logo"
              src="https://aw-publicwebstorage-cdn-endpoint-prod-001.azureedge.net/aw-content/logo_main_green.svg"
              height="120px"
              length="120px"
            />
          </Col>
          <Col>           
              <h3>{position.positionRole}</h3>
              <p>Location: {position.location}</p>
              <p>Description: {position.positionDescription}</p>
              <p>Position status: {props.positionStatus}</p>
                       
          </Col>
          <Col>
          <p>Skills:</p>
              <ul>{props.positionSkills}</ul>
              </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PositionDetailsForConsultant;
