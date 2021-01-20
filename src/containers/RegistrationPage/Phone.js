import { Form, Field, ErrorMessage, withFormik } from 'formik';
import * as yup from 'yup';

const Phone = (props) => {
  return (
    <div className="signupForm">
      <Form className="col">
        <h2>Get moving with Uber</h2>
        <div className="input-row">
          <Field className="input-box" as="select" name="postalCode">
            { props.postalCodeList.map(value => <option value={value} key={value}>{value}</option>) }
          </Field>
          <Field 
            className="input-box"
            type="tel" 
            name="phoneNumber" 
            placeholder="Enter your mobile number" 
          />
        </div>
        <ErrorMessage name="phoneNumber">
          { msg => <div className="error-msg">{msg}</div> }
        </ErrorMessage>
        <label>
          <Field
            type="checkbox" 
            name="agreeTerm"
          />
          Agree Terms and Conditions
        </label>
        <ErrorMessage name="agreeTerm">
          { msg => <div className="error-msg">{msg}</div> }
        </ErrorMessage>
        <button className="round-btn" type="submit">→</button>
      </Form>
    </div>
  );
}

const PhoneForm = props => {
  const SignUpValidation = yup.object().shape({
    postalCode: yup
      .string()
      .required()
      .oneOf([...props.postalCodeList, "Choose your country postal code"]),
    phoneNumber: yup
      .number("Please enter valid phone number")
      .min(10000000, "Please enter valid phone number")
      .max(999999999999, "Please enter valid phone number")
      .required("Please enter your phone number"),
    agreeTerm: yup
      .boolean()
      .oneOf([true], "The terms and conditions must be accepted."),
  });

  const PhoneFormWithFormik = withFormik({
    mapPropsToValues: () => ({
      postalCode: props.postalCodeList[1],
      phoneNumber: "",
      agreeTerm: false,
    }),
    handleSubmit: (values, bag) => bag.props.handleSubmit(values, bag.setSubmitting),
    validationSchema: SignUpValidation,
  })(Phone);
  return <PhoneFormWithFormik {...props} />
}

export default PhoneForm;
