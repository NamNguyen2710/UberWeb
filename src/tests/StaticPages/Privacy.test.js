import React from "react";
import renderer from "react-test-renderer";
import Privacy from "../../containers/StaticPages/Privacy";

describe("Home", () => {
  it("should render", () => {
    const snapshot = renderer.create(<Privacy />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
