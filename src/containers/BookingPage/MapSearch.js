import ReactLeafletSearch from 'react-leaflet-search';
import { LatLng } from 'leaflet';

function MapSearch(props) {
  return (
    <ReactLeafletSearch 
      position="topleft"
      search={props.firstSearch ? new LatLng(props.initSearch.lat, props.initSearch.lng) : ''}
      onChange={({latLng, info}) => {props.handleSearchFound(latLng, info)}}
      inputPlaceholder="Where would you like to go?"
      showMarker={false}
    />
  );
}

export default MapSearch;