import React, {lazy, useEffect} from "react";
import { Marker, Popup } from "react-leaflet";
import {  mapIcon  } from './MapIcon';
const PopUp = lazy(() => import('./PopUp'));


const LeafletMapPopUp = {
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
}

export default function MapPin(props) {

    return (
        props.latitude ?
        <Marker position ={[ props.latitude, props.longitude]} 
            key={props.id}
            icon={mapIcon}>
            <Popup style={LeafletMapPopUp}>
                <PopUp address={props.address} 
                    opening={props.opening}
                    name={props.name}
                    url={props.url}
                    rating={props.rating}
                    wheelchair={props.wheelchair}
                />
            </Popup>
        </Marker>
        :
        null
    )
}