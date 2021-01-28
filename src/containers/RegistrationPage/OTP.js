import { useState } from "react";

const Otp = (props) => {
  const [otp, setOtp] = useState(new Array(4).fill(""));

  const inputFocus = (event, index) => {
    if (event.keyCode === 46 || event.keyCode === 8) {
      setOtp([...otp.map((val, idx) => (idx === index ? "" : val))]);
      if (event.target.previousSibling) {
        event.target.previousSibling.select();
      }
    } else {
      if (!isNaN(event.key)) {
        setOtp([...otp.map((val, idx) => (idx === index ? event.key : val))]);
        if (event.target.nextSibling) {
          event.target.nextSibling.select();
        }
      }
    }
  };
  const handleSubmit = () => {
    props.handleSubmit(otp);
  };

  return (
    <div className="signupForm">
      <div className="col">
        <p>Enter the 4-digit code sent to you at {props.phoneNumber}. </p>
        <p className="clickable-line" onClick={props.revertStep}>
          Did you enter the correct number?
        </p>
        <div className="otp-row">
          {otp.map((value, index) => (
            <input
              className="otp-box"
              type="text"
              name="otp"
              autoComplete="off"
              maxLength="1"
              key={index}
              value={value}
              autoFocus={index === 0}
              onChange={() => {}}
              onKeyUp={(event) => inputFocus(event, index)}
            />
          ))}
        </div>
        <p className="error-msg">{props.error}</p>
        <p className="clickable-line">I didn’t receive code.</p>
        <button className="round-btn" onClick={handleSubmit}>
          →
        </button>
      </div>
    </div>
  );
};

export default Otp;
