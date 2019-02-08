import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col
} from "reactstrap";
import { Link } from "react-router-dom";

const PositionCard = props => {
  const positionUrl = `position-details/${props.positionId}`;
  let activePosition = "";

  if (props.active) {
    activePosition = "✅ Active";
  } else {
    activePosition = "🛑 Inactive";
  }

  return (
    <Link to={positionUrl} style={{ color: "black"}} >
      <Row>
        <Col>
          <Card style={{margin: "1em"}}>
            <CardBody >
              <Row>
                <Col xs="12" sm="6" lg="6">
                  <CardImg
                    top
                    style={{width:"50%"}}
                    src="https://aw-publicwebstorage-cdn-endpoint-prod-001.azureedge.net/aw-content/logo_main_green.svg"
                  />
                </Col>
                <Col xs="12" sm="6" lg="6">
                  <CardTitle>{props.role}</CardTitle>
                  <p>{props.location}</p>
                  <p>{activePosition}</p>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Link>
  );
};

export default PositionCard;
