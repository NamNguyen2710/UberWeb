import React, {useState, useEffect, useRef} from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

function MyMap(props) {
  const [location, setLocation] = useState();

  const mapRef = useRef(null);

  useEffect(() => {
    const { current = {} } = mapRef;
    const { leafletElement: map} = current;
    map.locate({setView: true});
    map.on("locationfound", (e) => {
      props.searchHome({lat: e.latlng.lat, lng: e.latlng.lng})
      setLocation(e.latlng)
    });
  }, []);

  return (
    <Map
      className="map"
      ref={mapRef}
      center={[-37.8136, 144.9631]}
      zoom={14}
    >
      <TileLayer attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      { (location === null || location === undefined) ? null : (
        <Marker position={location}>
          <Popup>You are here</Popup>
        </Marker>
      )}
      {props.children}
    </Map>
  );
}

export default MyMap;