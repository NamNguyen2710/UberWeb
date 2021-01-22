import React from "react";

import { shallow } from "enzyme";
import Home from "../containers/HomePage/Home";

describe("Home", () => {
  it("should render", () => {
    shallow(<Home />);
  });
});
