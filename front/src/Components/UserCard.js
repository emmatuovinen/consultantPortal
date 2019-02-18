import React from 'react';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Col, Row
} from 'reactstrap';

const UserCard = (props) => {
    const userProfileUrl = `view-profile/${props.userId}`;

    let skills;
    if (props.userSkills) {
        skills = props.userSkills.map((skill, index) => {
            return <li key={index}>{skill}</li>
        })
            .slice(0, 4);
    }

    let roles;
    if (props.preferableRoles) {
        roles = props.preferableRoles.map((role, index) => {
            return <li key={index}>{role}</li>
        })
    }

    return (
        <Row>
            <Col>
                <Card style={{ margin: "10px" }}>
                    <CardBody>
                        <Row>
                            <Col xs="12" sm="4" lg="4">
                                <a href={userProfileUrl}><CardTitle><h4>{props.firstName} {props.lastName}</h4></CardTitle></a>
                                <CardSubtitle><h6>{props.role}</h6></CardSubtitle>
                                <CardImg style={{ width: "100px" }} src={props.pictureUrl} alt={props.lastName} />
                            </Col>

                            <Col xs="12" sm="6" lg="4">
                                <h5>Skills</h5>
                                <p>{props.children} </p>
                                {skills}
                            </Col>

                            <Col xs="12" sm="6" lg="4">
                                <h5>Positions</h5>
                                {roles}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default UserCard;