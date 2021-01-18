import React from 'react';
import MyMap from './CurrentLocation'

class Booking extends React.Component {

  render() {
    return (
      <div className="booking-page">
        <MyMap />
      </div>
    );
  }
}

export default Booking;