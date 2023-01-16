import React, { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const [formValues] = useState({
    email: "",
    password: "",
  });

  const onSubmit = (userObject) => {
    axios
      .post("http://localhost:4000/sign-in", userObject)
      .then((response) => {
        if (response.status === 200) {
          alert("Signed in successfully.");
        } else Promise.reject();
      })
      .catch((err) => alert("Could not sign in."));
  };

  return (
    <div className="sign-in-container">
      <form>
        <h3>Sign In</h3>

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
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
