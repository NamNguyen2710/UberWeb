import {withRouter} from 'react-router-dom';
import { Form, Field, ErrorMessage, withFormik } from 'formik';
import * as yup from 'yup';

const riderList = ['Jaden Gulbrandsen', 'Godascalc Feld', 'Līva Kovac', 'Tanja Hutchinson', 'Boyd Kováč'];

const ContactUs = () => {
  return (
    <div className="general-bg">
      <div className="white-box">
        <div className="contact-box">
          <Form className="contact-form">
            <h2>Contact Us</h2>

            <div className="input-row">
              <div className="input-col">
                <label className="input-lable">
                  Your Name:
                  <Field 
                    className="input-box"
                    type="text" 
                    name="name" 
                    placeholder="Enter your full name" 
                  />
                </label>
                <ErrorMessage name="name">
                  { msg => <div className="error-msg">{msg}</div> }
                </ErrorMessage>
              </div>
              <div className="input-col">
                <label className="input-lable">
                  Select:
                  <Field className="input-box" as="select" name="rider">
                    { riderList.map(value => <option value={value} key={value}>{value}</option>) }
                  </Field>
                </label>
                <ErrorMessage name="name">
                  { msg => <div className="error-msg">{msg}</div> }
                </ErrorMessage>
              </div>
            </div>

            <div className="input-row">
              <div className="input-col">
                <label className="input-lable">
                  Issue:
                  <Field 
                    className="input-box"
                    type="text" 
                    name="issue" 
                    placeholder="Enter your issue" 
                  />
                </label>
                <ErrorMessage name="issue">
                  { msg => <div className="error-msg">{msg}</div> }
                </ErrorMessage>
              </div>
              <div className="input-col">
                <label className="input-lable">
                  Message:
                  <Field 
                    className="input-box"
                    type="textarea"
                    name="message"
                    placeholder="Describe you issues" 
                  />
                </label>
                <ErrorMessage name="message">
                  { msg => <div className="error-msg">{msg}</div> }
                </ErrorMessage>
              </div>
            </div>
            <button className="round-btn" type="submit">→</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

const ContactUsForm = withRouter((props) => {
  const ContactValidation = yup.object().shape({
    name: yup 
      .string()
      .required("Please enter your name"),
    rider: yup
      .string()
      .required()
      .oneOf([...riderList, "Choose your country postal code"]),
    issue: yup 
      .string()
      .required("Please enter your issue"),
    message: yup 
      .string()
      .required("Please describe your problems more"),
  });

  const ContactFormWithFormik = withFormik({
    mapPropsToValues: () => ({
      name: "",
      rider: riderList[0],
      issue: "",
      message: "",
    }),
    handleSubmit: () => {props.history.push("/")},
    validationSchema: ContactValidation,
  })(ContactUs);
  return <ContactFormWithFormik />
})

export default ContactUsForm;
