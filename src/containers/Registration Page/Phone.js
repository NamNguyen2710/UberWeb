import { Form, Field, withFormik } from 'formik';
import * as yup from 'yup';

const Phone = (props) => {
  return (
    <div className="signupForm">
      <h2>Get moving with Uber</h2>
      <Form className="col">
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
        <label>
          <Field
            type="checkbox" 
            name="agreeTerm"
          />
          Agree Terms and Conditions
        </label>
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
      .oneOf([...props.postalCodeList, "Choose your country postal code."]),
    phoneNumber: yup
      .number()
      .min(8)
      .max(10)
      .required(),
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
    // validationSchema: SignUpValidation,
  })(Phone);
  return <PhoneFormWithFormik {...props} />
}

export default PhoneForm;
