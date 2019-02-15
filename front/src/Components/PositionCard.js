import React from "react";
import { Card, CardImg, CardBody, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const PositionCard = props => {
  const positionUrl = `position-details/${props.positionId}`;
  let activePosition = "";

  if (props.active) {
    activePosition = "Active";
  } else {
    activePosition = "Inactive";
  }

  return (
    <Row>
      <Col>
        <Card style={{ marginBottom: "1em" }}>
          <Link to={positionUrl} style={{ color: "black" }}>
            <CardBody>
              <Row>
                <Col xs="12" sm="6" lg="6">
                  <CardImg
                    top
                    style={{ width: "50%" }}
                    src="https://aw-publicwebstorage-cdn-endpoint-prod-001.azureedge.net/aw-content/logo_main_green.svg"
                  />
                </Col>
                <Col xs="12" sm="6" lg="6">
                  <h5>{props.company}</h5>
                  <h6>{props.role}</h6>
                  <p>{props.location}</p>
                  <p>{props.description.slice(0,150)}...</p>
                  <p
                    style={{
                      fontWeight: "bold",
                      color: activePosition === "Active" ? "#2CCB61" : "red"
                    }}
                  >
                    {activePosition}
                  </p>
                </Col>
              </Row>
            </CardBody>
          </Link>
        </Card>
      </Col>
    </Row>
  );
};

export default PositionCard;
