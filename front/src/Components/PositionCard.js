import React from "react";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Link } from "react-router-dom";

const PositionCard = props => {
  const positionUrl = `position-details/${props.positionId}`;
  let activePosition = "";
  
  if(props.active) {
      activePosition="✅";
    
  } else {
      activePosition="🛑";
  }

  return (
    <div>
      <Link to={positionUrl}>
        <Card>
          <CardBody>
            <CardImg
              top
              width="100%"
              src="https://aw-publicwebstorage-cdn-endpoint-prod-001.azureedge.net/aw-content/logo_main_green.svg"
            />
            <CardTitle>{props.role}</CardTitle>
            <CardSubtitle>{props.location}</CardSubtitle>
            <CardSubtitle>{activePosition}</CardSubtitle>
          </CardBody>
        </Card>
      </Link>
      
    </div>
  );
};

export default PositionCard;
