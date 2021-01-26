import React from "react";
import renderer from "react-test-renderer";
import Home from "../containers/HomePage/Home";

describe("Home", () => {
  it("should render", () => {
    const snapshot = renderer.create(<Home />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
