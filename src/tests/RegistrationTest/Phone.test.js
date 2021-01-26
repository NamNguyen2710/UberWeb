import React from "react";
import { mount } from "enzyme";
import { waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import Phone from "../../containers/RegistrationPage/Phone";

describe("sign up phone form", () => {
  it("render correctly", () => {
    const handleSubmit = jest.fn();
    const postalCodeList = [];
    const snapshot = renderer
      .create(
        <Phone handleSubmit={handleSubmit} postalCodeList={postalCodeList} />
      )
      .toJSON();

    expect(snapshot).toMatchSnapshot();
  });

  it("submit to get error", async () => {
    const handleSubmit = jest.fn();
    const postalCodeList = ["+84", "+1"];
    const wrapper = mount(
      <Phone handleSubmit={handleSubmit} postalCodeList={postalCodeList} />
    );

    const phoneField = wrapper.find('input[name="phoneNumber"]');
    const submitBtn = wrapper.find("button");

    phoneField.simulate("focus");
    phoneField.simulate("change", {
      target: { value: "123 456", name: "phoneNumber" },
    });
    phoneField.simulate("blur");
    await waitFor(() => {
      expect(wrapper.find('input[name="phoneNumber"]').props().value).toBe(
        "123 456"
      );
    });

    submitBtn.simulate("submit");
    await waitFor(() => {
      expect(
        wrapper.find("ErrorMessageImpl[name='phoneNumber'] div").exists()
      ).toBeTruthy();
      expect(
        wrapper.find("ErrorMessageImpl[name='agreeTerm'] div").exists()
      ).toBeTruthy();
      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });

  it("correct input phone then submit", async () => {
    const handleSubmit = jest.fn();
    const postalCodeList = ["+84", "+1"];
    const wrapper = mount(
      <Phone handleSubmit={handleSubmit} postalCodeList={postalCodeList} />
    );

    const postalCodeField = wrapper.find('select[name="postalCode"]');

    const phoneField = wrapper.find('input[name="phoneNumber"]');
    const agreeTermField = wrapper.find('input[name="agreeTerm"]');
    const submitBtn = wrapper.find("button");

    postalCodeField.simulate("focus");
    postalCodeField.simulate("change", {
      target: { value: "+1", name: "postalCode" },
    });
    postalCodeField.simulate("blur");
    await waitFor(() => {
      expect(wrapper.find('select[name="postalCode"]').props().value).toBe(
        "+1"
      );
    });

    phoneField.simulate("focus");
    phoneField.simulate("change", {
      target: { value: "123 456 7890", name: "phoneNumber" },
    });
    phoneField.simulate("blur");
    await waitFor(() => {
      expect(wrapper.find('input[name="phoneNumber"]').props().value).toBe(
        "123 456 7890"
      );
    });

    agreeTermField.simulate("change", {
      target: { value: true, name: "agreeTerm" },
    });
    await waitFor(() => {
      expect(wrapper.find('input[name="agreeTerm"]').props().checked).toBe(
        true
      );
    });

    expect(wrapper.find(".error-msg").exists()).toBeFalsy();

    submitBtn.simulate("submit");
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
