import React from "react";
import { Marker, Popup } from "react-leaflet";
import ToiletPopUp from './ToiletPopUp';

export default function MapPin(props) {

    return (
        <Marker position={[props.latitude, props.longitude]} key={props.id}>
            <Popup autoPan={true}>
                <ToiletPopUp
                    {...props}
                    latLng={`${props.latitude},${props.longitude}`}
                />
            </Popup>
        </Marker>
    )

}