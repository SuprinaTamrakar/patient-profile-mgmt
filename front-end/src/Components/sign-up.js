import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SIGN_IN } from ".././Constants/Routes";

const SignUp = (props) => {
  const [formValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("You have entered an invalid email address."),
    password: Yup.string().required("Required"),
  });

  const navigate = useNavigate();

  const onSubmit = (userObject) => {
    axios
      .post("http://localhost:4000/sign-up", userObject)
      .then((response) => {
        if (response.status === 200) {
          navigate(SIGN_IN);
        } else Promise.reject();
      })
      .catch((err) => alert("Could not register."));
  };

  const signIn = () => {
    navigate(SIGN_IN);
  };

  return (
    <div className="sign-in-container">
      <Formik
        {...props}
        validationSchema={validationSchema}
        initialValues={{ formValues }}
        onSubmit={onSubmit}
      >
        <Form>
          <h3>Sign Up</h3>
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
            <label>Email:</label>
            <Field name="email" type="text" className="form-control" />
            <ErrorMessage
              name="email"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <label>Password:</label>
            <Field name="password" type="password" className="form-control" />
            <ErrorMessage
              name="password"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <Button variant="primary" size="lg" block="block" type="submit">
            {props.children} Sign Up
          </Button>
        </Form>
      </Formik>
      <u className="forgot-password text-right" onClick={signIn}>
        Already registered?
      </u>
    </div>
  );
};

export default SignUp;
