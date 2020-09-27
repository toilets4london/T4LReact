import L from 'leaflet';

const mapIcon = L.icon({
    iconUrl: require('../img/pin.svg'),
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});

export { mapIcon };