import {useState} from 'react';

const Otp = (props) => {
  console.log(props)
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const handleChange = (element, index) => {
    setOtp([...otp.map((val, idx) => idx === index ? element.value : val)]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  }
  return (
    <div className="signupForm">
      <div className="col">
        <p>Enter the 4-digit code sent to you at {props.phoneNumber}. </p>
        <p className="clickable-line" onClick={props.revertStep} >Did you enter the correct number?</p>
        <div className="otp-row">
          { otp.map((value, index) => 
            <input 
              className="otp-box"
              type="text"
              name="otp"
              autoComplete="off"
              maxLength="1"
              key={index}
              value={value}
              onChange={event => handleChange(event.target, index)}
            />
          )}
        </div>
        <p className="clickable-line">I didn’t receive code.</p>
        <button className="round-btn" onClick={props.handleSubmit}>→</button>
      </div>
    </div>
  );
}

export default Otp;
