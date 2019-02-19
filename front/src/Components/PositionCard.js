import React from "react";
import { Card, CardImg, CardBody, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import './Styles/PositionCard.css';

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
        <Card>
          <Link to={positionUrl}>
            <CardBody>
              <Row>
                
                <Col className= 'two-logos' xs="12" sm="4" lg="4" >
                <div><b> place for AW-logo + company-logo </b></div>
                  </Col>
                  
                  <Col xs="12" sm="4" lg="4">
                    <div className='company-role-location'>
                      <h3>{props.company}</h3>
                      <h4>{props.role}</h4>
                      <p>{props.location}</p>
                    </div>
                  </Col>

                  <Col xs="12" sm="4" lg="4">
                    <p>{props.description.slice(0,150)}...</p>
                    <p
                    style={{
                      fontWeight: "bold",
                      color: activePosition === "Active" ? "#047364" : "red"
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




/* return (
  <Row>
    <Col>
      <Card>
        <Link to={positionUrl}
          <CardBody>
            <Row>
              <Col className= 'two-logos' xs="12" sm="12" lg="6" >
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

export default PositionCard; */

