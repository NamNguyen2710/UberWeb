import { ErrorMessage } from "formik";

const FieldErrorMessage = ({ fieldName, classNames = "error-msg" }) => (
  <ErrorMessage
    name={fieldName}
    render={(msg) => <div className={classNames}>{msg}</div>}
  />
);

export default FieldErrorMessage;
