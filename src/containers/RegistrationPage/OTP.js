import React from "react";

const Otp = (props) => {
  const [otp, setOtp] = React.useState(new Array(4).fill(""));
  const [otpError, setOtpError] = React.useState("");

  const handleChange = (element, index) => {
    setOtp([...otp.map((val, idx) => (idx === index ? element.value : val))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const handleSubmit = () => {
    console.log(otp);
    if (otp.indexOf("") > -1) {
      setOtpError("Incorrect OTP");
    } else {
      props.handleSubmit(otp);
    }
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
              onChange={(event) => handleChange(event.target, index)}
            />
          ))}
        </div>
        <p className="error-msg">{otpError}</p>
        <p className="clickable-line">I didn’t receive code.</p>
        <button className="round-btn" onClick={handleSubmit}>
          →
        </button>
      </div>
    </div>
  );
};

export default Otp;
