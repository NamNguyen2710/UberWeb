import { withRouter } from "react-router-dom";
import * as yup from "yup";

import { Form, Field, withFormik } from "formik";
import FieldErrorMessage from "../../components/FieldErrorMessage";
import Background from "../../components/Background";

const riderList = [
  "Jaden Gulbrandsen",
  "Godascalc Feld",
  "Līva Kovac",
  "Tanja Hutchinson",
  "Boyd Kováč",
];

const ContactUs = () => {
  return (
    <Background>
      <div className="white-box">
        <div className="contact-box">
          <Form className="contact-form">
            <h2>Contact Us</h2>

            <div className="row">
              <div className="input-col">
                <label className="input-row">
                  <span>Your Name:</span>
                  <Field
                    className="input-box"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                  />
                </label>
                <FieldErrorMessage fieldName="name" />
              </div>

              <div className="input-col">
                <label className="input-row">
                  <span>Select:</span>
                  <Field className="input-box" as="select" name="rider">
                    {riderList.map((value) => (
                      <option value={value} key={value}>
                        {value}
                      </option>
                    ))}
                  </Field>
                </label>
                <FieldErrorMessage fieldName="rider" />
              </div>
            </div>

            <div className="row">
              <div className="input-col">
                <label className="input-row">
                  <span>Issue:</span>
                  <Field
                    className="input-box"
                    type="text"
                    name="issue"
                    placeholder="Enter your issue"
                  />
                </label>
                <FieldErrorMessage fieldName="issue" />
              </div>

              <div className="input-col">
                <label className="input-row">
                  <span>Message:</span>
                  <Field
                    className="input-box"
                    type="textarea"
                    name="message"
                    placeholder="Describe you issues"
                  />
                </label>
                <FieldErrorMessage fieldName="message" />
              </div>
            </div>
            <button className="round-btn" type="submit">
              →
            </button>
          </Form>
        </div>
      </div>
    </Background>
  );
};

const ContactUsForm = withRouter((props) => {
  const ContactValidation = yup.object().shape({
    name: yup.string().required("Please enter your name"),
    rider: yup
      .string()
      .required()
      .oneOf([...riderList, "Choose your country postal code"]),
    issue: yup.string().required("Please enter your issue"),
    message: yup.string().required("Please describe your problems more"),
  });

  const ContactFormWithFormik = withFormik({
    mapPropsToValues: () => ({
      name: "",
      rider: riderList[0],
      issue: "",
      message: "",
    }),
    handleSubmit: () => {
      props.history.push("/");
    },
    validationSchema: ContactValidation,
  })(ContactUs);
  return <ContactFormWithFormik />;
});

export default ContactUsForm;
