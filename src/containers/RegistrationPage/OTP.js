import {useState} from 'react';

const Otp = (props) => {
  const [otp, setOtp] = useState(new Array(4).fill(''));
  
  const handleChange = (element, index) => {
    setOtp([...otp.map((val, idx) => idx === index ? element.value : val)]);
    
  }
  const inputFocus = (event) => {
    if (event.key === "Delete" || event.key === "Backspace") {
      if (event.target.previousSibling) {
        event.target.previousSibling.focus()
      }
    } else {
      if (event.target.nextSibling) {
        event.target.nextSibling.focus();
      }
    }
  };
  const handleSubmit = () => { props.handleSubmit(otp) };

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
              onKeyUp={event => inputFocus(event, index)}
            />
          )}
        </div>
        <p className="error-msg">{props.error}</p>
        <p className="clickable-line">I didn’t receive code.</p>
        <button className="round-btn" onClick={handleSubmit}>→</button>
      </div>
    </div>
  );
}

export default Otp;
