import React from 'react';
import { Link } from "react-router-dom";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Col, Row, Badge
} from 'reactstrap';
import './Styles/SmallCard.css';
import './Styles/App.css';

const UserCardSmall = (props) => {
    const userProfileUrl = `/view-profile/${props.userId}`;

    let skillsmatched = props.positionSkills.map((positionSkill, index) => {
        return props.userSkills.find(userSkill => {
            if (positionSkill !== userSkill) {
                return null;
            }
            return (
                userSkill
            );
        });
    });

    skillsmatched = skillsmatched.map((skill, index) => {
        if (skill !== null) {
            return (
                <span key={index}><Badge className="small-card-skill-badge">{skill}</Badge></span>
            )
        } else {
            return null;
        }
    });

    return (
        <Card className= 'small-card'>
            <Link to={userProfileUrl}>
                <CardBody>
                    
                        <Col>
                        <Row>
                        <Col className= 'name' sm='12' ><a href={userProfileUrl}><CardTitle><h4>{props.firstName} {props.lastName}</h4></CardTitle></a></Col>
                        </Row>
                        <Row>
                            <Col className= 'title' sm='12'><CardSubtitle><h6>{props.role}</h6></CardSubtitle></Col>
                        </Row>
                            <CardImg className= 'small-card-img' src={props.pictureUrl} alt={props.lastName} />
                        </Col>
                        <Col className='skills-matched'>
                            <CardText>
                                {props.children}
                            </CardText>
                            {skillsmatched}
                        </Col>
                    
                </CardBody>
            </Link>
        </Card >
    );
}

export default UserCardSmall;