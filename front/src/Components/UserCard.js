import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Col, Row
} from 'reactstrap';

const UserCard = (props) => {
console.log(props);
    const userProfileUrl = `view-profile/${props.userId}`;
    
    let skills;
    if (props.userSkills) {
        skills = props.userSkills.map(skill => {
        return <li>{skill}</li>
    })}
    
    let roles;
    if (props.preferableRoles) {
        roles = props.preferableRoles.map(role => {
            return <li>{role}</li>
    })}

    return (
        <Row>
            <Col>
                <Card>
                    <CardBody>
                        <Row>
                            <Col xs="12" sm="4" lg="4">
                                <a href={userProfileUrl}><CardTitle><h3>{props.firstName} {props.lastName}</h3></CardTitle></a>
                                <CardSubtitle><h4>{props.role}</h4></CardSubtitle>
                                <CardImg width="100%" src="https://www.w3schools.com/w3css/img_avatar3.png" alt="Card image cap" />
                            </Col>
                            
                            <Col xs="12" sm="2" lg="4">
                                <CardText>
                                    <h3>SKILLS</h3> 
                                    {skills}
                                </CardText>
                            </Col>

                            <Col xs="12" sm="6" lg="4">
                                <CardText>
                                    <h3>ROLES</h3>
                                    {roles}
                                </CardText>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default UserCard;