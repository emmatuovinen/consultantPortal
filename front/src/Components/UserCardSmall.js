import React from 'react';
import { Link } from "react-router-dom";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Col, Row, Badge
} from 'reactstrap';

const UserCardSmall = (props) => {
    const userProfileUrl = `/view-profile/${props.userId}`;
    console.log("props: ", props)

    let skillsmatched = props.positionSkills.map((positionSkill, index) => {
        return props.userSkills.find(userSkill => {
            if (positionSkill !== userSkill) {
                return null;
            }
            return (
                userSkill
            );
        });
    })

    skillsmatched = skillsmatched.map(skill => {
        if (skill !== null) {
            return (
                <span><Badge color="success">{skill}</Badge></span>
            )
        }

    })

    console.log("skillsmatch: ", skillsmatched);
    return (

        <Card style={{ margin: "10px", }}>
            <Link to={userProfileUrl} style={{ color: "black" }} >
                <CardBody>
                    <Row>
                        <Col>
                            <CardTitle><h4>{props.firstName} {props.lastName}</h4></CardTitle>
                            <CardSubtitle><h6>{props.role}</h6></CardSubtitle>
                            <CardImg style={{ width: "100px" }} src={props.pictureUrl} alt={props.lastName} />
                        </Col>
                        <Col>
                            <CardText>
                                {props.children}
                            </CardText>
                            {skillsmatched}
                        </Col>

                    </Row>
                </CardBody>
            </Link>
        </Card >

    );
}

export default UserCardSmall;