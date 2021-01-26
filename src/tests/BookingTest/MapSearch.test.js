import React from "react";
import ReactLeafletSearch from "react-leaflet-search";
import { Map, TileLayer } from "react-leaflet";
import { LatLng } from "leaflet";
import { mount } from "enzyme";
import MapSearch from "../../containers/BookingPage/MapSearch";
import toJson from "enzyme-to-json";

describe("MapSearch in booking", () => {
  it("render correctly", () => {
    const handleSearchFound = jest.fn();
    const initSearch = { lat: 0, lng: 0 };
    const wrapper = mount(
      <Map>
        <TileLayer
          attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapSearch
          firstSearch={true}
          initSearch={initSearch}
          handleSearchFound={handleSearchFound}
        />
      </Map>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
