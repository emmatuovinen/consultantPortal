import React from 'react';
import { CardImg, CardTitle, CardSubtitle, Col, Row, Container } from 'reactstrap';
import './Styles/userCard.css';

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