import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Col, Row
} from 'reactstrap';

const UserCard = (props) => {
console.log(props);
    const userProfileUrl = `view-profile/${props.userId}`;

    return (
        <Row>
            <Col>
                <Card>
                    <CardBody>
                        <Row>
                            <Col xs="12" sm="4" lg="4">
                                <a href={userProfileUrl}><CardTitle>{props.firstName} {props.lastName}</CardTitle></a>
                                <CardSubtitle>{props.role}</CardSubtitle>
                                <CardImg width="100%" src="https://www.w3schools.com/w3css/img_avatar3.png" alt="Card image cap" />
                            </Col>
                            
                            <Col xs="12" sm="2" lg="4">
                                <CardText>SKILLS HERE {props.userSkills}</CardText>
                            </Col>
                            <Col xs="12" sm="6" lg="4">
                                <CardText>ROLES HERE {props.preferableRoles}</CardText>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default UserCard;