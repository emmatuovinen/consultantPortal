import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';

const UserCard = (props) => {
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle>{props.firstName} {props.lastName}</CardTitle>
                    <CardSubtitle>{props.role}</CardSubtitle>
                </CardBody>
                <CardImg width="100%" src="https://www.w3schools.com/w3css/img_avatar3.png" alt="Card image cap" />
                <CardBody>
                    <CardText>{props.description}</CardText>
                    <CardText>{props.phoneNumber}</CardText>
                </CardBody>
            </Card>
        </div>
    );
};

export default UserCard;