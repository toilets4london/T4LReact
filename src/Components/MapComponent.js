import React, { useState, useEffect, useRef } from "react";
import { Map, TileLayer, CircleMarker, Popup, ZoomControl } from "react-leaflet";
import MapPin from "./MapPin";
import { Alert, Button } from 'react-bootstrap';
import MarkerClusterGroup from "react-leaflet-markercluster";
import { client } from '../Client/client';
import axios from 'axios';
import { Card } from 'react-bootstrap';

export default function MapComponent(props) {

  const defaultLatitude = 51.5074;
  const defaultLongitude = 0.1277;

  const [toilets, setToilets] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [locationError, setLocationError] = useState();
  const [center, setCenter] = useState([defaultLatitude, defaultLongitude]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    client.get('/toilets/?page_size=1000')
      .then(
        (result) => {
          setToilets(result.data.results);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  useEffect(() => {
    if (props.searchQuery !== null) {
      const fetchData = async () => {
        const result = await axios(
          'https://nominatim.openstreetmap.org/search?q='+props.searchQuery+'&format=json&limit=1', 
        );
        setCenter([result.data[0].lat, result.data[0].lon]);
      };
      fetchData();
    }
  }, [props.searchQuery]);

  const getLocation = () => {
    const handleLocationError = error => {
      setLocationError(error.message);
    };
    const handleLocationSuccess = position => {
      setCurrentLocation([position.coords.latitude, position.coords.longitude]);
      const map = mapRef.current.leafletElement;
      const currentCenter = map.getCenter();
      if (currentCenter !== position) {
        setCenter(currentCenter);
        setCenter([position.coords.latitude, position.coords.longitude]);
      }
    };
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 3000
    };
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(handleLocationSuccess, handleLocationError, options);
  };

  return (
    <div>
      <div className="error-alerts">
        {locationError ? <Alert variant='warning' className="error-alert">
          Geolocation is currently unavailable in this browser
        </Alert> : null}
        {error ? <Alert variant='danger' className="error-alert">
          Unfortunately there was an error loading toilet data, try reloading the page
        </Alert> : null}
        {!isLoaded ? <Alert variant='warning' className="error-alert">
          Loading toilet data from Toilets4London API ...
        </Alert> : null}
      </div>
      <Button variant="secondary" size="sm" className="go-to-button" onClick={getLocation}>
          Go to my location
      </Button>
      <Map
        center={center}
        zoom={15}
        animate={false}
        doubleClickZoom={true}
        touchZoom={true}
        ref={mapRef}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        { currentLocation ? 
          <CircleMarker center = {currentLocation}>
            <Popup>
              <Card body>Current location</Card>
            </Popup>
          </CircleMarker>
        : null }
        <ZoomControl position="bottomright"/>
        <MarkerClusterGroup>
          {toilets.map(t => {
            return <MapPin latitude={t.latitude}
              longitude={t.longitude}
              key={t.id}
              id={t.id}
              address={t.address}
              url={t.url}
              wheelchair={t.wheelchair}
              name={t.name}
              ratings={t.ratings}
              opening={t.opening_hours}
              baby_change={t.baby_change}
            />
          })}
        </MarkerClusterGroup>
      </Map>
    </div>
  );
}