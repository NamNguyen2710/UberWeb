import CurrentLocation from "../../containers/BookingPage/CurrentLocation";
import React, { useState, useEffect, useRef } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import { waitFor } from "@testing-library/react";

describe("CurrentLocation in booking flow", () => {
  it("render correctly", async () => {
    const searchHome = jest.fn();
    const wrapper = mount(<CurrentLocation searchHome={searchHome} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
