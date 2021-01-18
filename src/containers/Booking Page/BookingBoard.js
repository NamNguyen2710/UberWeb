import location_marker from '../../images/location-marker.png'

function BookingBoard(props) {
  return (
    <div>
      <div>
        <img src={location_marker} alt="from" />
        <h4>From</h4>
        {props.from}
      </div>
      <div>
        <img src={location_marker} alt="to"/>
        <h4>To</h4>
        {props.to}
      </div>
      <div>
        <div>
          <h4>Prize: $9,76</h4>
          <p>Kilometer: 3.85km</p>
          <p>Time: 35 minutes</p>
        </div>
        <div>
          Fare Breakdown
        </div>
      </div>
      <div>
        <button>Back</button>
        <button onClick={props.confirmBooking}>Confirm</button>
      </div>
    </div>
  );
}

export default BookingBoard;