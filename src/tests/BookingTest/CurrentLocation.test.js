import CurrentLocation from "../../containers/BookingPage/CurrentLocation";
import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import { waitFor } from "@testing-library/react";

describe("CurrentLocation in booking flow", () => {
  it("render correctly", async () => {
    navigator.geolocation.getCurrentPosition.mockImplementationOnce(
      (onSuccess) => {
        console.log("succ");
        return Promise.resolve(
          onSuccess({ coords: { latitude: 10, longitude: 10 } })
        );
      }
    );
    const searchHome = jest.fn();
    const wrapper = mount(<CurrentLocation searchHome={searchHome} />);
    await waitFor(
      () => {
        // expect(toJson(wrapper)).toMatchSnapshot();
        expect(searchHome).toBeCalledWith();
      },
      { timeout: 11000 }
    );
  }, 20000);
});
