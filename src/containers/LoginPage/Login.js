import React from "react";
import { withRouter } from "react-router-dom";
import * as yup from "yup";

import { UserContext } from "../../components/User-context";

import Background from "../../components/Background";
import { Form, Field, withFormik } from "formik";
import FieldErrorMessage from "../../components/FieldErrorMessage";

function Login() {
  return (
    <Background>
      <div className="white-box">
        <div className="login-form">
          <Form className="col">
            <h3>Log In</h3>
            <label className="input-row">
              <span>Username:</span>
              <Field
                className="input-box"
                type="text"
                name="username"
                placeholder="Username"
              />
            </label>
            <label className="input-row">
              <span>Password:</span>
              <Field
                className="input-box"
                type="text"
                name="password"
                placeholder="Password"
              />
            </label>
            <FieldErrorMessage fieldName="username" />
            <FieldErrorMessage fieldName="password" />
            <button className="round-btn" type="submit">
              →
            </button>
          </Form>
        </div>
      </div>
    </Background>
  );
}

const LoginSchema = yup.object({
  username: yup.string().required("Please enter username"),
  password: yup.string().required("Please enter password"),
});

const LoginForm = withRouter(
  withFormik({
    mapPropsToValues: () => ({
      username: "",
      password: "",
    }),
    handleSubmit: (value, bag) => {
      bag.props.changeUser({ user: value.username });
      bag.props.history.push("/booking");
    },
    validationSchema: LoginSchema,
  })(Login)
);

const LoginWithContext = () => (
  <UserContext.Consumer>
    {({ changeUser }) => <LoginForm changeUser={changeUser} />}
  </UserContext.Consumer>
);

export default LoginWithContext;
