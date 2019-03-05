import React from 'react';
import { CardImg, Badge, CardTitle, CardSubtitle, Col, Row, Container } from 'reactstrap';
import './Styles/userCard.css';

const UserCard = (props) => {
    const userProfileUrl = `view-profile/${props.userId}`;

    let skills;
    if (props.userSkills) {
        skills = props.userSkills.map((skill, index) => {
            return <Badge className="skill-badge" key={index}>{skill}</Badge>
        })
            .slice(0, 5);
    }

    let roles;
    if (props.preferableRoles) {
        roles = props.preferableRoles.map((role, index) => {
            return <li key={index}>{role}</li>
        })
    }

    return (
        <Container className= 'consultant-box'>
            <Col>
                <Row>
                    <Col xs="12" sm="6" md="3">
                        <div className= 'background-img'>
                            <CardImg src={props.pictureUrl} alt={props.lastName}/>
                        </div>
                    </Col>

                    <Col xs="12" sm="6" md="3">
                        <div className= 'name-title'>
                            <a href={userProfileUrl}><CardTitle><h4>{props.firstName} {props.lastName}</h4></CardTitle></a>
                            <CardSubtitle><h6>{props.role}</h6></CardSubtitle>
                        </div>
                    </Col>

                    <Col xs="12" sm="5" md="3">
                        <div className= 'skills'>
                            <h5>Skills</h5>
                            {props.children}
                            {skills}
                        </div>
                    </Col>

                    <Col xs="12" sm="7" md="3">
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