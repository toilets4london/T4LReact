import React, { lazy } from "react";
import { Marker, Popup } from "react-leaflet";
import {  mapIcon  } from './MapIcon';
const ToiletPopUp = lazy(() => import('./ToiletPopUp'));

export default function MapPin(props) {

    return (
        props.latitude ?
        <Marker position ={[ props.latitude, props.longitude]} 
            key={props.id}
            icon={mapIcon}>
            <div>
            <Popup>
                <ToiletPopUp address={props.address} 
                    opening={props.opening}
                    name={props.name}
                    url={props.url}
                    rating={props.rating}
                    wheelchair={props.wheelchair}
                />
            </Popup>
            </div>
        </Marker>
        :
        null
    )
}