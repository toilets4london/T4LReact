import React, { useState, useEffect, useRef } from "react";
import DismissableAlert from "./DismissableAlert";
import { Alert, Button } from "react-bootstrap";
import { client } from "../Client/client";
import axios from "axios";
import MapComponent from "./MapComponent";
import { useParams } from "react-router-dom";
import isValidBorough from "./Boroughs";
import SearchBar from "./SearchBar";

export default function BoroughEmbeddableMap(props) {
  let { borough } = useParams();
  const defaultLatitude = 51.509865;
  const defaultLongitude = -0.118092;

  const [toilets, setToilets] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [locationError, setLocationError] = useState();
  const [center, setCenter] = useState([defaultLatitude, defaultLongitude]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const mapRef = useRef();

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    if (!isValidBorough(borough)) {
      return;
    }
    if (!isLoaded && !error) {
      client
        .get(`/toilets/?borough=${borough}&page_size=2000`)
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
    }
  }, [error, isLoaded, borough]);

  useEffect(() => {
    if (isValidBorough(borough)) {
      const fetchData = async () => {
        const result = await axios(
          "https://nominatim.openstreetmap.org/search?q=" +
            borough +
            "+London" +
            "&format=json&limit=1"
        );
        setCenter([result.data[0].lat, result.data[0].lon]);
      };
      fetchData();
    }
  }, [borough]);

  useEffect(() => {
    if (props.searchQuery !== null) {
      const fetchData = async () => {
        const result = await axios(
          "https://nominatim.openstreetmap.org/search?q=" +
            props.searchQuery +
            "&format=json&limit=1"
        );
        setCenter([result.data[0].lat, result.data[0].lon]);
      };
      fetchData();
    }
  }, [props.searchQuery]);

  const getLocation = () => {
    const handleLocationError = (error) => {
      console.log(error.message);
      setLocationError(error.message);
    };
    const handleLocationSuccess = (position) => {
      setCurrentLocation([position.coords.latitude, position.coords.longitude]);
      const map = mapRef.current.leafletElement;
      const currentCentre = map.getCenter();
      if (currentCentre !== position) {
        setCenter(currentCentre);
        setCenter([position.coords.latitude, position.coords.longitude]);
      }
    };
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 3000,
    };
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      handleLocationSuccess,
      handleLocationError,
      options
    );
  };

  if (isValidBorough(borough)) {
    return (
      <div className="full-page">
        <SearchBar
          handleSearchQuery={props.handleSearch}
          title={`${capitalizeFirstLetter(borough.replaceAll("+"," "))} Toilets`}
        />
        <div>
          {locationError ? (
            <DismissableAlert message="Geolocation is currently unavailable in this browser, try searching for your location manually" />
          ) : null}
          {error ? (
            <Alert variant="danger" className="error-alert">
              Unfortunately there was an error loading toilet data, try
              reloading the page
            </Alert>
          ) : null}
          {!isLoaded ? (
            <Alert variant="warning" className="error-alert">
              Loading toilet data - please wait
            </Alert>
          ) : null}
          <Button
            variant="secondary"
            size="sm"
            className="go-to-button"
            onClick={getLocation}
          >
            Go to my location
          </Button>
          <MapComponent
            center={center}
            currentLocation={currentLocation}
            toilets={toilets}
            mapRef={mapRef}
          />
        </div>
      </div>
    );
  }

  return <h1>Invalid Borough</h1>;
}
