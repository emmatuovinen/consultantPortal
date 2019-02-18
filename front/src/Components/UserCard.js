import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card, CardDeck, Container, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Col, Row
} from 'reactstrap';
import './Styles/userCard.css';
import {Bubbles} from './images/bubbles2.png';


const UserCard = (props) => {
    const userProfileUrl = `view-profile/${props.userId}`;

    let skills;
    if (props.userSkills) {
        skills = props.userSkills.map(skill => {
            return <li>{skill}</li>
        })
            .slice(0, 4);
    }

    let roles;
    if (props.preferableRoles) {
        roles = props.preferableRoles.map(role => {
            return <li>{role}</li>
        })
    }

    return (
        <Container className= 'consultant-box'>
            <Col>
                <Row>
                    <Col className= 'name' sm={{ size: 6, order: 2, offset: 1 }}><a href={userProfileUrl}><CardTitle><h4>{props.firstName} {props.lastName}</h4></CardTitle></a></Col>
                </Row>
                
                <Row>
                    <Col className= 'title' sm={{ size: 6, order: 2, title: 1 }}><CardSubtitle><h6>{props.role}</h6></CardSubtitle></Col>
                </Row>

                <Row>
                    <Col xs="12" sm="12" md="4">
                        <div className= 'background-img'>
                            <CardImg src={props.pictureUrl} alt={props.lastName}/>
                        </div>
                    </Col>

                    <Col xs="12" sm="6" md="3">
                        <div className= 'skills'>
                            <h5>Skills</h5>
                            {props.children}
                            {skills}
                        </div>
                    </Col>

                    <Col xs="12" sm="6" md="4">
                        <div className= 'positions'>
                            <h5>Positions</h5>
                            {roles}
                        </div>
                    </Col>       
                </Row> 
            </Col>   
        </Container>     
    );
};

export default UserCard;














/* return (
    <Container>
        <Col>
            <Card>
                <CardBody>
                    
                    <Col className= 'user-profile' sm="4">
                        <Row>
                            <a href={userProfileUrl}><CardTitle><h4>{props.firstName} {props.lastName}</h4></CardTitle></a>
                        </Row>
                        <Row>
                            <CardSubtitle><h6>{props.role}</h6></CardSubtitle>
                        </Row>

                        <Row>
                            <div className= 'background-img'>
                                <CardImg src={Bubbles}
                            
                                src={props.pictureUrl} alt={props.lastName} />
                            </div>
                        </Row>
                    </Col>

                    <Col sm="2">
                    <div className= 'skills'>
                        <CardText>
                            <h5>Skills</h5>
                            {props.children}
                            {skills}
                        </CardText>
                        </div>
                    </Col>
                    

                    <Col sm="5">
                        <CardText>
                            <h5>Positions</h5>
                            {roles}
                        </CardText>
                    </Col>
                </CardBody> 
            </Card>
        </Col>     
    </Container>
);
};

export default UserCard; */