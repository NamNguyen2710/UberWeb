import React from 'react';
import MyMap from './CurrentLocation';
import MapSearch from './MapSearch';
import BookingBoard from './BookingBoard';
import { Redirect } from 'react-router-dom';

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initSearch: [],
      from: '',
      to: '',
      redirect: null,
    }
    this.handleSearchFound = this.handleSearchFound.bind(this);
    this.revertToSearch = this.revertToSearch.bind(this);
    this.searchHome = this.searchHome.bind(this);
    this.confirmBooking = this.confirmBooking.bind(this);
  }

  handleSearchFound(info, value=null) {
    if (value) {
      this.setState({[value]: info});
    } else if (this.state.from === "") {
      this.setState({from: info});
    } else {
      this.setState({to: info});
    }
  }

  searchHome(value) {
    this.setState({initSearch: value});
  }

  revertToSearch(value) {

  }

  confirmBooking() {
    this.setState({ redirect: "/" })
  }

  render() {
    if (this.state.redirect !== null) return <Redirect to={this.state.redirect} />
    let bookingControl;
    if (this.state.from === '' || this.state.to === '') {
      bookingControl = 
        <MapSearch 
          handleSearchFound={this.handleSearchFound}
          initSearch={this.state.initSearch}
        />;
    } else { 
      bookingControl = 
        <BookingBoard 
          from={this.state.from}
          to={this.state.to}
          revertToSearch={this.revertToSearch}
          confirmBooking={this.confirmBooking}
        />
    }
    return (
      <div className="booking-page">
        <MyMap searchHome={this.searchHome}>
          {bookingControl}
        </MyMap>
      </div>
    );
  }
}

export default Booking;