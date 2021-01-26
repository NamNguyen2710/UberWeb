import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import current_marker from "../../images/current-marker.svg";

function MyMap(props) {
  const [location, setLocation] = useState();

  const mapRef = useRef(null);

  useEffect(() => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    map.locate({ setView: true, timeout: 1000 });
    map.on("locationfound", (e) => {
      console.log("found");
      props.searchHome({ lat: e.latlng.lat, lng: e.latlng.lng });
      setLocation(e.latlng);
    });
    map.on("locationerror", () => {
      console.log("not found");
      props.searchHome({ lat: null, lng: null });
    });
  }, []);

  const currentMarker = new L.Icon({
    iconUrl: current_marker,
    iconRetinaUrl: current_marker,
    popupAnchor: [-0, -0],
    iconSize: [32, 32],
  });

  return (
    <Map className="map" ref={mapRef} center={[-37.8136, 144.9631]} zoom={14}>
      <TileLayer
        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {location === null || location === undefined ? null : (
        <Marker position={location} icon={currentMarker}>
          <Popup>You are here</Popup>
        </Marker>
      )}
      {props.children}
    </Map>
  );
}

export default MyMap;
