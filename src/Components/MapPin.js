import React, { useEffect } from "react";
import { Marker, Popup } from "react-leaflet";

export default function MapPin(props) {

    return (
        props.latitude ?
        <Marker position ={[ props.latitude, props.longitude]} key={props.id}>
            <Popup>
                <span>ADDRESS: {props.address}</span>
                <br />
                <a href={props.url}>Link</a><br />
            </Popup>
        </Marker>
        :
        null
    )
}