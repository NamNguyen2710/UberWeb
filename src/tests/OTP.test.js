import React, { useState } from "react";
import toJson from "enzyme-to-json";
import { shallow, mount } from "enzyme";
import { waitFor } from "@testing-library/react";
import OTP from "../containers/RegistrationPage/OTP";

describe("sign up otp form", () => {
  it("render correctly", () => {
    const handleSubmit = jest.fn();
    const revertStep = jest.fn();
    const phoneNumber = "123 456 7890";
    const error = "Invalid";

    const wrapper = shallow(
      <OTP
        handleSubmit={handleSubmit}
        revertStep={revertStep}
        phoneNumber={phoneNumber}
        error={error}
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("submit incorrect otp", async () => {
    const handleSubmit = jest.fn();
    const revertStep = jest.fn();
    const phoneNumber = "123 456 7890";

    const wrapper = mount(
      <OTP
        handleSubmit={handleSubmit}
        revertStep={revertStep}
        phoneNumber={phoneNumber}
      />
    );

    wrapper.find("button").first().simulate("click");
    await waitFor(() => {
      expect(handleSubmit).not.toHaveBeenCalled();
      expect(wrapper.find(".error-msg").text()).toEqual("Incorrect OTP");
    });
  });

  it.only("submit correct otp", async () => {
    const handleSubmit = jest.fn();
    const revertStep = jest.fn();
    const phoneNumber = "123 456 7890";
    const event = { target: { nextSibling: { focus: jest.fn() }, value: "5" } };

    const wrapper = mount(
      <OTP
        handleSubmit={handleSubmit}
        revertStep={revertStep}
        phoneNumber={phoneNumber}
      />
    );

    wrapper.find(".clickable-line").first().simulate("click");
    await waitFor(() => {
      expect(revertStep).toHaveBeenCalled();
    });

    for (let i = 0; i++; i <= 3) {
      wrapper.find('input[name="otp"]').at(i).props().onChange(event);
      wrapper.update();
      await waitFor(() => {
        expect(wrapper.find('input[name="otp"]').at(i).props().value).toBe("5");
        expect(event.target.nextSibling.focus).toHaveBeenCalledTimes(i + 1);
      });
    }

    wrapper.find("button").simulate("click");
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
