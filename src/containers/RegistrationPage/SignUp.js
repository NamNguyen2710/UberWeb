import React from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../components/User-context";
import Info from "./Info";
import Otp from "./OTP";
import Phone from "./Phone";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpStep: 1,
      phone: "",
      otpError: "",
      redirect: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.revertStep = this.revertStep.bind(this);
  }

  handleSubmit(values, setSubmitting) {
    switch (this.state.signUpStep) {
      case 1:
        this.setState({
          signUpStep: 2,
          phone: `(${values.postalCode}) ${values.phoneNumber}`,
        });
        setSubmitting(false);
        break;
      case 2:
        //check OTP
        if (values.indexOf("") > -1) {
          this.setState({ otpError: "Incorrect OTP" });
        } else this.setState({ signUpStep: 3 });
        break;
      case 3:
        this.props.changeUser(values);
        this.setState({ redirect: "/booking" });
        break;
      default:
        this.setState({ redirect: "/" });
    }
  }

  revertStep() {
    this.setState((state) => {
      return { signUpStep: state.signUpStep - 1 };
    });
  }

  render() {
    const postalCode = ["+84", "+1", "+61"];
    let signUpStep;
    switch (this.state.signUpStep) {
      case 2:
        signUpStep = (
          <Otp
            handleSubmit={this.handleSubmit}
            phoneNumber={this.state.phone}
            revertStep={this.revertStep}
            error={this.state.otpError}
          />
        );
        break;
      case 3:
        signUpStep = <Info handleSubmit={this.handleSubmit} />;
        break;
      default:
        signUpStep = (
          <Phone handleSubmit={this.handleSubmit} postalCodeList={postalCode} />
        );
    }

    if (this.state.redirect) return <Redirect to={this.state.redirect} />;

    return (
      <div className="general-bg">
        <div className="white-box">{signUpStep}</div>
      </div>
    );
  }
}

const SignUpWithContext = () => (
  <UserContext.Consumer>
    {({ changeUser }) => <SignUp changeUser={changeUser} />}
  </UserContext.Consumer>
);

export default SignUpWithContext;
