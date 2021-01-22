import { Form, Field, ErrorMessage, withFormik } from "formik";
import * as yup from "yup";

const Phone = (props) => {
  return (
    <div className="signupForm">
      <Form className="col">
        <h2>Get moving with Uber</h2>
        <div className="input-row">
          <Field className="input-box" as="select" name="postalCode">
            {props.postalCodeList.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </Field>
          <Field
            className="input-box"
            type="tel"
            name="phoneNumber"
            placeholder="Enter your mobile number"
          />
        </div>
        <ErrorMessage name="phoneNumber">
          {(msg) => <div className="error-msg">{msg}</div>}
        </ErrorMessage>
        <label>
          <Field type="checkbox" name="agreeTerm" />
          Agree Terms and Conditions
        </label>
        <ErrorMessage name="agreeTerm">
          {(msg) => <div className="error-msg">{msg}</div>}
        </ErrorMessage>
        <button className="round-btn" type="submit">
          →
        </button>
      </Form>
    </div>
  );
};
const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

const SignUpValidation = yup.object().shape({
  postalCode: yup.string(),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Please enter your phone number"),
  agreeTerm: yup
    .boolean()
    .oneOf([true], "The terms and conditions must be accepted."),
});

export default withFormik({
  mapPropsToValues: (props) => ({
    postalCode: props.postalCodeList[0],
    phoneNumber: "",
    agreeTerm: false,
  }),
  handleSubmit: (values, bag) =>
    bag.props.handleSubmit(values, bag.setSubmitting),
  validationSchema: SignUpValidation,
})(Phone);
