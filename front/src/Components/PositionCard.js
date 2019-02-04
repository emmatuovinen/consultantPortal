import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from "reactstrap";


const PositionCard = (props) => {

        return (
            <div>
                <Card>
                    <CardBody>
                    <CardImg top width="100%" src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"/>
                        <CardTitle>{props.role}</CardTitle>
                        <CardSubtitle>{props.location}</CardSubtitle>
                        <CardText>{props.description}</CardText>
                    </CardBody>
                </Card>
               
            </div>
        );
    }


export default PositionCard;