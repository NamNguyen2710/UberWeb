import React from "react";
import router from "../../router";
import MyMap from "./CurrentLocation";
import MapSearch from "./MapSearch";
import BookingBoard from "./BookingBoard";
import { Redirect } from "react-router-dom";
import { Marker, Popup } from "react-leaflet";

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initSearch: {},
      firstSearch: true,
      from: {
        position: null,
        info: "",
      },
      to: {
        position: null,
        info: "",
      },
      searchStage: "from",
      redirect: null,
    };
    this.handleSearchFound = this.handleSearchFound.bind(this);
    this.revertToSearch = this.revertToSearch.bind(this);
    this.searchHome = this.searchHome.bind(this);
    this.confirmBooking = this.confirmBooking.bind(this);
  }

  handleSearchFound(latlng, info) {
    if (
      this.state.initSearch.lat === latlng.lat &&
      this.state.initSearch.lng === latlng.lng
    ) {
      this.setState({
        [this.state.searchStage]: {
          position: latlng,
          info: info + " (Your Location)",
        },
      });
    } else {
      this.setState({
        [this.state.searchStage]: {
          position: latlng,
          info: info,
        },
      });
    }
    if (this.state.searchStage === "from")
      this.setState({
        searchStage: "to",
        firstSearch: false,
      });
  }

  searchHome(value) {
    this.setState({ initSearch: value });
  }

  revertToSearch(value) {
    this.setState({
      [value]: {
        position: null,
        info: "",
      },
      searchStage: value,
    });
  }

  confirmBooking() {
    this.setState({ redirect: router.HOME });
  }

  render() {
    if (this.state.redirect !== null)
      return <Redirect to={this.state.redirect} />;

    let bookingBoard;
    if (this.state.from.info !== "" && this.state.to.info !== "") {
      bookingBoard = (
        <BookingBoard
          from={this.state.from}
          to={this.state.to}
          revertToSearch={this.revertToSearch}
          confirmBooking={this.confirmBooking}
        />
      );
    } else {
      if (this.state.initSearch.hasOwnProperty("lat")) {
        bookingBoard = (
          <MapSearch
            handleSearchFound={this.handleSearchFound}
            initSearch={this.state.initSearch}
            firstSearch={this.state.firstSearch}
          />
        );
      }
    }

    return (
      <div className="booking-page">
        <MyMap searchHome={this.searchHome}>
          {bookingBoard}
          {this.state.from.position && this.state.from.position.lat && (
            <Marker position={this.state.from.position}>
              <Popup>{this.state.from.info}</Popup>
            </Marker>
          )}
          {this.state.to.position && this.state.to.position.lat && (
            <Marker position={this.state.to.position}>
              <Popup>{this.state.to.info}</Popup>
            </Marker>
          )}
        </MyMap>
      </div>
    );
  }
}

export default Booking;
