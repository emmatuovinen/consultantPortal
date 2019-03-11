import React from "react";
import { Row, Container, Col} from "reactstrap";
import '../Components/Styles/App.css';

const PositionDetailsForConsultant = (props) => {
  let position = props.position;

  return (
    <div className='position-info'>
        <Container>
            <Row>
                <Col xs="12" sm="4" md="4">
                    <img className='position-logo'
                      alt="logo"
                      src="https://aw-publicwebstorage-cdn-endpoint-prod-001.azureedge.net/aw-content/logo_main_green.svg"
                      height="100px"
                      width="200px"
                    />
                    <h4 className='h4-green-uppercase'>Skills:</h4>
                    {props.positionSkills}
                </Col>
                <Col xs="12" sm="8" md="8">           
                    <h3>{position.positionRole}</h3>
                    <p>Location: {position.location}</p>
                    <p>Description: {position.positionDescription}</p>
                    <p>Position status: {props.positionStatus}</p>       
                </Col> 
            </Row>
        </Container>
    </div>
  );
};

export default PositionDetailsForConsultant;
