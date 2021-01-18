import ReactLeafletSearch from 'react-leaflet-search';
import { Marker, Popup } from 'react-leaflet';
import "resource://gre/modules/Geometry.jsm"
;
function MapSearch(props) {
  return (
    <ReactLeafletSearch 
      position="topleft" 
      search={new Point(props.initSearch.lat, props.initSearch.lng)}
      onChange={({info}) => {props.handleSearchFound(info)}}
      inputPlaceholder="Where would you like to go?"
    />
  );
}

export default MapSearch;