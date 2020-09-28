import React, {useState, useEffect} from "react";
import { Map, TileLayer } from "react-leaflet";
import MapPin from "./MapPin";
import MarkerClusterGroup from "react-leaflet-markercluster";

const useCurrentLocation = () => {
  const [error, setError] = useState();
  const [location, setLocation] = useState();

  const handleSuccess = position => {
    const { latitude, longitude } = position.coords;
    setLocation({
      latitude,
      longitude
    });
  };

  const handleError = error => {
    setError(error.message);
    console.log(error);
  };

  useEffect(() => {
    var options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    };
    if (!navigator.geolocation) {
      setError('Geolocation is not supported.');
      return;
    }
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, []);
  return { location, error };
};

export default function MapComponent(props) {
  var defaultLatitude = 51.5074;
  var defaultLongitude = 0.1278;
  const { location, error } = useCurrentLocation();

  return (
    props.toilets.length > 0 ?
    <Map 
      center={[location ? location.latitude : defaultLatitude, location ? location.longitude : defaultLongitude]} 
      zoom={12}
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
    "Loading"
  );
}