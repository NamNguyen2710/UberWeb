import React from "react";
import renderer from "react-test-renderer";
import HowItWorks from "../../containers/StaticPages/HowItWorks";

describe("Home", () => {
  it("should render", () => {
    const snapshot = renderer.create(<HowItWorks />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
