import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const UserCard = (props) => {

    const userProfileUrl = `view-profile/${props.userId}`;

    return (
        <div>
            <Card>
                <CardBody>
                    <a href={userProfileUrl}><CardTitle>{props.firstName} {props.lastName}</CardTitle></a>
                    <CardSubtitle>{props.role}</CardSubtitle>
                </CardBody>
                <CardImg width="100%" src="https://www.w3schools.com/w3css/img_avatar3.png" alt="Card image cap" />
                <CardBody>
                    <CardText>{props.description}</CardText>
                    <CardText>{props.phoneNumber}</CardText>
                </CardBody>
                <Link to={userProfileUrl}><Button>Open profile</Button></Link>
            </Card>
        </div>
    );
};

export default UserCard;