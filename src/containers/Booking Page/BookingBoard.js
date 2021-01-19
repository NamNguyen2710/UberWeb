import location_marker from '../../images/location-marker.png'

function BookingBoard(props) {
  return (
    <div className="confirm-board">
      <div className="row" onClick={() => {props.revertToSearch("from")}}>
        <img src={location_marker} alt="from" />
        <div className="col">
          <h4>From</h4>
          {props.from.info}
        </div>
      </div>
      <div className="row" onClick={() => {props.revertToSearch("to")}}>
        <img src={location_marker} alt="to"/>
        <div className="col">
          <h4>To</h4>
          {props.to.info}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h4>Prize: $9,76</h4>
          <p>Kilometer: 3.85km</p>
          <p>Time: 35 minutes</p>
        </div>
        <div>
          Fare Breakdown
        </div>
      </div>
      <div className="btn-row">
        <button className="back-btn" onClick={() => {props.revertToSearch("to")}}>← Back</button>
        <button className="black-btn" onClick={props.confirmBooking}>Confirm →</button>
      </div>
    </div>
  );
}

export default BookingBoard;