import homeImg from "../../images/uber-home-img.jpg";
import router from "../../router.js";
import { useHistory } from "react-router-dom";

function Home() {
  let history = useHistory();
  function handelClick() {
    history.push(router.SIGNUP);
  }

  return (
    <div className="homepage">
      <div className="white-box">
        <div className="box">
          <img src={homeImg} alt="uber-img" />
          <div>
            <h2>Your ride, on demand</h2>
            <p>
              Whether you're headed to work, the airport, or put on the town,
              Uber connects you with a reliable ride in minutes. One tap and a
              car come directly to you.
            </p>
          </div>
          <button className="black-btn" onClick={handelClick}>
            Register with iPhone
            <span className="inline-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
