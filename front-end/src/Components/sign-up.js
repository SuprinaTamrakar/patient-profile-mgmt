import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SIGN_IN } from ".././Constants/Routes";

const SignUp = () => {
  const [formValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSubmit = (userObject) => {
    axios
      .post("http://localhost:4000/sign-up", userObject)
      .then((response) => {
        if (response.status === 200) {
          alert("Registered successfully.");
        } else Promise.reject();
      })
      .catch((err) => alert("Could not register."));
  };

  const navigate = useNavigate();

  const signIn = () => {
    navigate(SIGN_IN);
  };

  return (
    <div className="sign-in-container">
      <form>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
          />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-primary"
            onSubmit={onSubmit}
            initialValues={formValues}
            enableReinitialize
          >
            Sign Up
          </button>
        </div>
        <u className="forgot-password text-right" onClick={signIn}>
          Already registered?
        </u>
      </form>
    </div>
  );
};

export default SignUp;
