import React from "react";
import { Card, ListGroup } from 'react-bootstrap';

export default function ToiletPopUp(props) {
    return (
        <Card style={{ width: '18rem' }} className="pop-up">
            <Card.Body>
                <Card.Title>{props.name ? props.name : "Toilet"}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.opening ? props.opening : "Opening hours not provided"}</Card.Subtitle>
                <Card.Text>
                    Full address: {props.address}
                </Card.Text>
                <ListGroup variant="flush">
                    <ListGroup.Item>Wheelchair accessible : {props.wheelchair ? "Yes" : "No"}</ListGroup.Item>
                    <ListGroup.Item>Baby change facilties : {props.baby_change ? "Yes" : "No"}</ListGroup.Item>
                    <ListGroup.Item>Rating : {props.rating ? props.rating : "No ratings yet"}</ListGroup.Item>
                    <ListGroup.Item action href={props.url} target="_blank">Link to API</ListGroup.Item>
                    <ListGroup.Item action href="#" target="_blank">Leave a review (not available yet)</ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    )
}


