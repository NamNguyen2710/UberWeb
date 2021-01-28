import React from "react";
import { withRouter } from "react-router-dom";
import { UserContext } from "../../components/User-context";
import { Form, Field, ErrorMessage, withFormik } from "formik";
import * as yup from "yup";

function Login() {
  return (
    <div className="general-bg">
      <div className="white-box">
        <div className="login-form">
          <Form className="col">
            <h3>Log In</h3>
            <label className="input-row">
              Username:
              <Field
                className="input-box"
                type="text"
                name="username"
                placeholder="Username"
              />
            </label>
            <label className="input-row">
              Password:
              <Field
                className="input-box"
                type="text"
                name="password"
                placeholder="Password"
              />
            </label>
            <ErrorMessage name="username">
              {(msg) => <div className="error-msg">{msg}</div>}
            </ErrorMessage>
            <ErrorMessage name="password">
              {(msg) => <div className="error-msg">{msg}</div>}
            </ErrorMessage>
            <button className="round-btn" type="submit">
              →
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

const LoginForm = withRouter((props) => {
  const LoginSchema = yup.object({
    username: yup.string().required("Please enter username"),
    password: yup.string().required("Please enter password"),
  });
  const LoginWithFormik = withFormik({
    mapPropsToValues: () => ({
      username: "",
      password: "",
    }),
    handleSubmit: (value) => {
      props.changeUser({ user: value.username });
      props.history.push("/booking");
    },
    validationSchema: LoginSchema,
  })(Login);
  return <LoginWithFormik />;
});

const LoginWithContext = () => (
  <UserContext.Consumer>
    {({ changeUser }) => <LoginForm changeUser={changeUser} />}
  </UserContext.Consumer>
);

export default LoginWithContext;
