import React from 'react';
import {withRouter} from 'react-router-dom';
import {UserContext} from '../../components/User-context';
import Info from './Info';
import Otp from './OTP';
import Phone from './Phone';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpStep: 1,
      phone: '',
      user: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.revertStep = this.revertStep.bind(this);
  }

  handleSubmit(values, setSubmitting) {
    console.log(values)
    switch (this.state.signUpStep) {
      case 1: 
        this.setState({ 
          signUpStep: 2,
          phone: `(${values.postalCode}) ${values.phoneNumber}`,
        });
        setSubmitting(false);
        break;
      case 2:
        this.setState({
          signUpStep: 3,
        });
        break;
      case 3:
        this.setState({
          user: values.username,
        });
        setSubmitting(false);
        withRouter( ({history}) => {history.push('/')});
        break;
      default:
        withRouter( ({history}) => {history.push('/')});
    }
  }

  revertStep() {
    this.setState(state => { return {signUpStep: state.signUpStep - 1} })
  }

  render() {
    const postalCode = ['+84', '+1', '+61'];
    let signUpStep;
    switch (this.state.signUpStep) {
      case 2:
        signUpStep = <Otp handleSubmit={this.handleSubmit} phoneNumber={this.state.phone} revertStep={this.revertStep} />
        break;
      case 3:
        signUpStep = <Info handleSubmit={this.handleSubmit} />
        break;
      default:
        signUpStep = <Phone handleSubmit={this.handleSubmit} postalCodeList={postalCode} />
    }
    return (
      <div className="general-bg">
        <div className="white-box">
          <UserContext.Provider value={this.state.user}>
            {signUpStep}
          </UserContext.Provider>
        </div>
      </div>
    );
  }
}
SignUp.contextType = UserContext;

export default SignUp;