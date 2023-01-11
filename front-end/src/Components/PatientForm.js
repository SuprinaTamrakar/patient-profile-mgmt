import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";

const PatientForm = (props) => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, "Invalid phone number.")
      .required("Required"),
    zipCode: Yup.number().required("Required"),
    streetAddress: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    birthday: Yup.date().required("Required"),
    email: Yup.string().email("You have entered an invalid email address."),
    lastAppointment: Yup.date().max(Date(), "Date is invalid"),
    nextAppointment: Yup.date().min(Date(), "Date is invalid."),
  });
  console.log(props);
  return (
    <div className="form-wrapper">
      <Formik {...props} validationSchema={validationSchema}>
        <Form>
          <FormGroup>
            <label>Name:</label>
            <Field name="name" type="text" className="form-control" />
            <ErrorMessage
              name="name"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <label>Gender:</label>
            <Field name="gender" type="text" className="form-control" />
            <ErrorMessage
              name="gender"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <label>Phone Number:</label>
            <Field name="phoneNumber" type="number" className="form-control" />
            <ErrorMessage
              name="phoneNumber"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <label>ZIP code:</label>
            <Field name="zipCode" type="number" className="form-control" />
            <ErrorMessage
              name="zipCode"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <label>Street Address:</label>
            <Field name="streetAddress" type="text" className="form-control" />
            <ErrorMessage
              name="streetAddress"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <label>City:</label>
            <Field name="city" type="text" className="form-control" />
            <ErrorMessage
              name="city"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <label>Birthday:</label>
            <Field name="birthday" type="date" className="form-control" />
            <ErrorMessage
              name="birthday"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <label>Email:</label>
            <Field name="email" type="text" className="form-control" />
            <ErrorMessage
              name="email"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <label>Last Appointment:</label>
            <Field
              name="lastAppointment"
              type="date"
              className="form-control"
            />
            <ErrorMessage
              name="lastAppointment"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <label>Next Appointment:</label>
            <Field
              name="nextAppointment"
              type="date"
              className="form-control"
            />
            <ErrorMessage
              name="nextAppointment"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <Button variant="danger" size="lg" block="block" type="submit">
            {props.children}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default PatientForm;
