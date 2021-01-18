import React, {useState, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

function CurrentLocation(props) {
  const [location, setLocation] = useState();

  const map = useMap();

  useEffect(() => {
    map.locate({setView: true});
    map.on("locationfound", (e) => {setLocation(e.latlng)})
  }, []);

  return ( (location === null || location === undefined) ? null : (
    <Marker position={location}>
      <Popup>You are here</Popup>
    </Marker> 
  ));
}

function MyMap() {
  return (
    <MapContainer
      className="map"
      center={[-37.8136, 144.9631]}
      zoom={14}
    >
      <TileLayer attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <CurrentLocation />
    </MapContainer>
  );
}

export default MyMap;