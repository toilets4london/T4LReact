import React from "react";
import { Marker, Popup } from "react-leaflet";
import ToiletPopUp from './ToiletPopUp';

export default function MapPin(props) {

    return (
        <Marker position={[props.latitude, props.longitude]}
            key={props.id}>
            <Popup autoPan={true}>
                <ToiletPopUp 
                    address={props.address}
                    opening={props.opening}
                    name={props.name}
                    url={props.url}
                    rating={props.rating}
                    wheelchair={props.wheelchair}
                />
            </Popup>
        </Marker>
    )

}