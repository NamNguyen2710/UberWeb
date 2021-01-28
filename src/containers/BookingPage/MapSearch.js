import ReactLeafletSearch from "react-leaflet-search";
import { LatLng } from "leaflet";

function MapSearch(props) {
  return (
    <ReactLeafletSearch
      position="topleft"
      search={
        props.firstSearch && props.initSearch.lat
          ? new LatLng(props.initSearch.lat, props.initSearch.lng)
          : ""
      }
      onChange={({ latLng, info }) => {
        props.handleSearchFound(latLng, info);
      }}
      openSearchOnLoad
      inputPlaceholder={
        props.searchStage === "to"
          ? "Where would you like to go?"
          : "Choose your starting point"
      }
      showMarker={false}
    />
  );
}

export default MapSearch;
