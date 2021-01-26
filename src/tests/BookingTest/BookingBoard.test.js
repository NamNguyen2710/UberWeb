import { waitFor } from "@testing-library/react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import BookingBoard from "../../containers/BookingPage/BookingBoard";

describe("Booking board Booking flow", () => {
  it("render correctly", () => {
    const revertToSearch = jest.fn();
    const booking = jest.fn();
    const from = { info: "" };
    const to = { info: "" };
    const snapshot = renderer
      .create(
        <BookingBoard
          from={from}
          to={to}
          revertToSearch={revertToSearch}
          confirmBooking={booking}
        />
      )
      .toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it("revert and submit", async () => {
    const revertToSearch = jest.fn();
    const booking = jest.fn();
    const from = { info: "" };
    const to = { info: "" };
    const wrapper = mount(
      <BookingBoard
        from={from}
        to={to}
        revertToSearch={revertToSearch}
        confirmBooking={booking}
      />
    );

    wrapper.find(".row").at(0).props().onClick();
    await waitFor(() => {
      expect(revertToSearch).toBeCalledWith("from");
    });

    wrapper.find(".row").at(1).props().onClick();
    await waitFor(() => {
      expect(revertToSearch).toBeCalledWith("to");
    });

    wrapper.find(".back-btn").props().onClick();
    await waitFor(() => {
      expect(revertToSearch).toBeCalledWith("to");
    });

    wrapper.find(".black-btn").props().onClick();
    await waitFor(() => {
      expect(booking).toHaveBeenCalled();
    });
  });
});
