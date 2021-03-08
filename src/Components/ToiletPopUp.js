import React, { useEffect, useState } from "react";
import { Card, ListGroup } from 'react-bootstrap';
import { routeMatrixApiClient } from '../Client/routeMatrixApiClient';

export default function ToiletPopUp(props) {

    const formatDuration = s => {
        if (s < 0) s = -s;
        const time = {
            day: Math.floor(s / 86400),
            hour: Math.floor(s / 3600) % 24,
            minute: Math.floor(s / 60) % 60,
        };
        return Object.entries(time)
            .filter(val => val[1] !== 0)
            .map(val => val[1] + ' ' + (val[1] !== 1 ? val[0] + 's' : val[0]))
            .join(', ');
    };

    const [distance, setDistance] = useState(null);

    useEffect(() => {
        if (props.currentLatLng && props.latLng) {
            routeMatrixApiClient.post('', {
                "locations": [
                    props.currentLatLng,
                    props.latLng
                ]
            })
                .then(
                    (result) => {
                        console.log(result.data.distance[1] + " km");
                        setDistance(result.data.distance[1]);
                    },
                    (error) => {
                        console.log(error.message)
                    }
                );
        }
    }, [props.currentLatLng, props.latLng]);

    return (
        <Card style={{ width: '18rem' }}>
            <ListGroup variant="flush">
                {distance ? <ListGroup.Item><b>Distance : </b>{distance.toFixed(1) + " km "}</ListGroup.Item> : null}
                {distance ? <ListGroup.Item><b>Walking time : </b>{formatDuration(distance * 720)}</ListGroup.Item> : null}
                {props.name ? <ListGroup.Item><b>Name : </b>{props.name}</ListGroup.Item> : null}
                {props.opening_hours ? <ListGroup.Item><b>Opening hours : </b>{props.opening_hours}</ListGroup.Item> : null}
                {props.address ? <ListGroup.Item><b>Full address : </b>{props.address}</ListGroup.Item> : null}
                <ListGroup.Item><b>Wheelchair accessible : </b>{props.wheelchair ? "Yes" : "No / no data provided"}</ListGroup.Item>
                <ListGroup.Item><b>Baby change facilities : </b>{props.baby_change ? "Yes" : "No"}</ListGroup.Item>
                {props.fee ? <ListGroup.Item><b>Fee : </b>{props.fee}</ListGroup.Item> : null}
                {props.covid ? <ListGroup.Item><b>Notice : </b>{props.covid}</ListGroup.Item> : null}
                {props.rating ? <ListGroup.Item><b>Avg rating : </b>{props.rating}</ListGroup.Item> : null}
                {props.num_ratings ? <ListGroup.Item><b>Number of ratings : </b>{props.num_ratings}</ListGroup.Item> : null}
                {props.id ? <ListGroup.Item><b>Toilets4London id : </b>{props.id}</ListGroup.Item> : null}
            </ListGroup>
        </Card>
    )
}


