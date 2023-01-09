import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";

const PatientForm = (props) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    phoneNumber: Yup.number()
      .positive("Invalid phone number.")
      .integer("Invalid phone number.")
      .required("Required"),
    zipCode: Yup.number().required("Required"),
    streetAddress: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    birthday: Yup.date().required("Required"),
    email: Yup.string().email("You have entered an invalid email address."),
    lastAppointment: Yup.date().max(Yup.date.today, "Date is invalid"),
    nextAppointment: Yup.date().min(Date.today, "Date is invalid."),
  });
  console.log(props);
  return (
    <div className="form-wrapper">
      <Formik {...props} validationSchema={validationSchema}>
        <Form>
          <FormGroup>
            <Field name="name" type="text" className="form-control" />
            <ErrorMessage
              name="name"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <Field name="gender" type="text" className="form-control" />
            <ErrorMessage
              name="gender"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <Field name="phoneNumber" type="number" className="form-control" />
            <ErrorMessage
              name="phoneNumber"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <Field name="zipCode" type="number" className="form-control" />
            <ErrorMessage
              name="zipCode"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <Field name="streetAddress" type="text" className="form-control" />
            <ErrorMessage
              name="streetAddress"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <Field name="city" type="text" className="form-control" />
            <ErrorMessage
              name="city"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <Field name="birthday" type="date" className="form-control" />
            <ErrorMessage
              name="birthday"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <Field name="email" type="text" className="form-control" />
            <ErrorMessage
              name="email"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <Field name="lastAppointment" type="date" className="form-control" />
            <ErrorMessage
              name="lastAppointment"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <Field name="nextAppointment" type="date" className="form-control" />
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