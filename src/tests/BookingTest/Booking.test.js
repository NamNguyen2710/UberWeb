import React from "react";
import Booking from "../../containers/BookingPage/Booking";
import MyMap from "../../containers/BookingPage/CurrentLocation";
import { mount } from "enzyme";
import { waitFor } from "@testing-library/react";
import toJson from "enzyme-to-json";
import { Marker } from "leaflet";

jest.mock(
  "../../containers/BookingPage/CurrentLocation",
  () => ({ children }) => children
);
jest.mock("../../containers/BookingPage/MapSearch", () => "map-search");
jest.mock("../../containers/BookingPage/BookingBoard", () => "booking-board");
jest.mock("react-leaflet", () => ({
  Marker: () => jest.fn(),
  Popup: () => jest.fn(),
}));

const compareObj = (obj1, obj2) =>
  JSON.stringify(obj1) === JSON.stringify(obj2);

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
};
global.navigator.geolocation = mockGeolocation;

describe("booking page", () => {
  it("render correctly", () => {
    const snapshot = mount(<Booking />);
    expect(toJson(snapshot)).toMatchSnapshot();
  });

  it("currentLocation found, search booking flow", async () => {
    const confirm = jest.fn();
    let state;

    const wrapper = mount(<Booking />);
    wrapper.instance().confirmBooking = confirm;

    //test: CurrentLocation return initLocation, set state.from to initLocation
    wrapper.instance().searchHome({ lat: 5, lng: 5 });
    wrapper.update();
    wrapper
      .find("map-search")
      .props()
      .handleSearchFound({ lat: 5, lng: 5 }, "");
    await waitFor(() => {
      wrapper.update();
      state = wrapper.instance().state;
      console.log(wrapper.debug());
      expect(wrapper.find("map-search").exists()).toBeTruthy();
      expect(
        !state.firstSearch &&
          state.searchStage === "to" &&
          compareObj(state.from.position, { lat: 5, lng: 5 }) &&
          state.from.info.includes("(Your Location)")
      ).toBeTruthy();
    });

    //test: MapSearch search state.to location
    wrapper
      .find("map-search")
      .props()
      .handleSearchFound({ lat: 10, lng: 15 }, "Work Location");
    await waitFor(() => {
      wrapper.update();
      state = wrapper.instance().state;
      expect(wrapper.find("map-search").exists()).toBeFalsy();
      expect(wrapper.find("booking-board").exists()).toBeTruthy();
      expect(
        compareObj(state.to.position, { lat: 10, lng: 15 }) &&
          state.searchStage === "to"
      ).toBeTruthy();
    });

    //test: BookingBoard revert to search state.from location
    wrapper.find("booking-board").props().revertToSearch("from");
    await waitFor(() => {
      wrapper.update();
      state = wrapper.instance().state;
      expect(
        state.from.position === null &&
          state.to.position !== null &&
          state.searchStage === "from"
      ).toBeTruthy();
      expect(wrapper.find("booking-board").exists()).toBeFalsy();
      expect(wrapper.find("map-search").exists()).toBeTruthy();
    });

    //test:search state.from location
    wrapper
      .find("map-search")
      .props()
      .handleSearchFound({ lat: 12, lng: 63 }, "Home Location");
    await waitFor(() => {
      wrapper.update();
      state = wrapper.instance().state;
      expect(
        compareObj(state.from.position, { lat: 12, lng: 63 }) &&
          state.searchStage === "to"
      ).toBeTruthy();
      expect(wrapper.find("map-search").exists()).toBeFalsy();
      expect(wrapper.find("booking-board").exists()).toBeTruthy();
    });

    //test: revert to search state.to
    wrapper.find("booking-board").props().revertToSearch("to");
    await waitFor(() => {
      wrapper.update();
      state = wrapper.instance().state;
      expect(
        state.to.position === null &&
          state.from.position !== null &&
          state.searchStage === "to"
      ).toBeTruthy();
      expect(wrapper.find("booking-board").exists()).toBeFalsy();
      expect(wrapper.find("map-search").exists()).toBeTruthy();
    });

    //test: submit
    wrapper
      .find("map-search")
      .props()
      .handleSearchFound({ lat: 10, lng: 15 }, "Work Location");
    wrapper.update();
    wrapper.find("booking-board").props().confirmBooking();
    await waitFor(() => {
      expect(confirm).toHaveBeenCalled();
    });
  });
});
