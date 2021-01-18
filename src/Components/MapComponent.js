import React from "react";
import { Map, TileLayer, CircleMarker, Popup, ZoomControl } from "react-leaflet";
import MapPin from "./MapPin";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Card } from 'react-bootstrap';

export default function MapComponent(props) {

  return (
    <Map
      center={props.center}
      zoom={15}
      animate={false}
      doubleClickZoom={true}
      touchZoom={true}
      zoomControl={false}
      ref={props.mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {props.currentLocation ?
        <CircleMarker center={props.currentLocation}>
          <Popup>
            <Card body>Current location</Card>
          </Popup>
        </CircleMarker>
        : null}
      <MarkerClusterGroup>
        {props.toilets.map(t => {
          return <MapPin 
            key={t.id}
            {...t}
            currentLatLng={props.currentLocation ? `${props.currentLocation[0]}, ${props.currentLocation[1]}` : null}
            onReport={props.onReport}
          />
        })}
      </MarkerClusterGroup>
      <ZoomControl position="bottomright" />
    </Map>
  )
}