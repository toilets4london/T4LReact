import React from "react";
import { Map, TileLayer } from "react-leaflet";
import MapPin from "./MapPin";
import MarkerClusterGroup from "react-leaflet-markercluster";

export default function MapComponent(props) {
  const defaultLatitude = 51.5074;
  const defaultLongitude = 0.1278;
  const location = props.location;

  return (
    props.toilets.length > 0 ?
    <Map 
      center={[location ? location.latitude : defaultLatitude, location ? location.longitude : defaultLongitude]} 
      zoom={14}
      animate={false}
      doubleClickZoom={true}
      touchZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <MarkerClusterGroup>
        {props.toilets.map(t => {
          return (<MapPin latitude={t.latitude} 
            longitude={t.longitude} 
            key={t.id} 
            id={t.id}
            address={t.address}
            url={t.url}
            wheelchair={t.wheelchair}
            name={t.name}
            ratings={t.ratings}
            opening={t.opening_hours}
            />)
        })}
      </MarkerClusterGroup>
    </Map>
    :
    "Unfortunately there was a problem loading the data - please try again later - we may be conducting system maintenance"
  );
}