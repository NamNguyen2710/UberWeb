import { useState } from "react";
import { Form, Field, ErrorMessage, withFormik } from "formik";
import * as yup from "yup";
import male_avatar from "../../images/male-icon.png";
import female_avatar from "../../images/female-icon.png";
import ava_dummy from "../../images/ava-dummy.png";

const Info = (props) => {
  const [imgSrc, setImgSrc] = useState(ava_dummy);

  const updateAva = (event) => {
    let file = event.currentTarget.files[0];
    props.setFieldValue("file", file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgSrc(reader.result);
    };
  };

  const chooseAva = () => {
    document.getElementById("avatar").click();
  };

  return (
    <div className="signupForm">
      <div className="col">
        <Form className="col">
          <h2>Enter your info</h2>
          <Field
            className="input-box"
            type="text"
            name="name"
            placeholder="Enter your full name"
          />
          <ErrorMessage name="name">
            {(msg) => <div className="error-msg">{msg}</div>}
          </ErrorMessage>
          <h4>Select gender</h4>
          <div>
            <label>
              <Field
                className="gender-radio"
                type="radio"
                name="gender"
                value="male"
              />
              <img className="gender-ava" src={male_avatar} alt="male-avatar" />
            </label>
            <label>
              <Field
                className="gender-radio"
                type="radio"
                name="gender"
                value="female"
              />
              <img
                className="gender-ava"
                src={female_avatar}
                alt="female-avatar"
              />
            </label>
          </div>
          <ErrorMessage name="gender">
            {(msg) => <div className="error-msg">{msg}</div>}
          </ErrorMessage>
          <input
            className="ava-input"
            type="file"
            name="avatar"
            id="avatar"
            accept="image/png, image/jpeg"
            onChange={updateAva}
          />
          <div className="upload-ava-row" onClick={chooseAva}>
            <div className="upload-ava-box">
              <img
                className="upload-ava"
                id="user-ava"
                src={imgSrc}
                alt="avatar"
              />
            </div>
            <h3 className="upload-ava-text">Upload profile picture</h3>
          </div>
          <button className="round-btn" type="submit">
            →
          </button>
        </Form>
      </div>
    </div>
  );
};

const SignUpValidation = yup.object().shape({
  name: yup.string().required("Please enter your full name"),
  gender: yup.string().required("Please choose your gender"),
});

const InfoForm = withFormik({
  mapPropsToValues: () => ({
    name: "",
    gender: "",
    avatar: {},
  }),
  handleSubmit: (values, bag) =>
    bag.props.handleSubmit(values, bag.setSubmitting),
  validationSchema: SignUpValidation,
})(Info);

export default InfoForm;
