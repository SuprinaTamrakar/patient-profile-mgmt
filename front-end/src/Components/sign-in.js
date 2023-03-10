import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";
import { PATIENT_LIST, SIGN_UP } from ".././Constants/Routes";

const SignIn = (props) => {
  const [formValues] = useState({
    email: "",
    password: "",
  });

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("You have entered an invalid email address."),
    password: Yup.string().required("Required"),
  });

  const navigate = useNavigate();

  const signUp = () => {
    navigate(SIGN_UP);
  };

  const onSubmit = (userObject) => {
    axios
      .post("http://localhost:4000/sign-in", userObject)
      .then((response) => {
        if (response.status === 200) {
          const token = response.data["token"];
          if (token) {
            localStorage.setItem("token", token);
            navigate(PATIENT_LIST);
          }
        } else Promise.reject();
      })
      .catch((err) => alert("Could not sign in."));
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
          <h3>Sign In</h3>
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
            {props.children} Sign In
          </Button>
        </Form>
      </Formik>
      <u className="forgot-password text-right" onClick={signUp}>
        Not registered yet?
      </u>
    </div>
  );
};

export default SignIn;
