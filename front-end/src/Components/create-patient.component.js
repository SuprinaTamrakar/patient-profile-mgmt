// CreatePatient Component for add new patient

// Import Modules
import React, { useState } from "react";
import axios from "axios";
import PatientForm from "./PatientForm";
import { NavBar } from ".././Common/NavBar";
import { useNavigate } from "react-router-dom";
import { SIGN_IN } from "../Constants/Routes";

//CreatePatient Component
const CreatePatient = () => {
  const [formValues] = useState({
    name: "",
    gender: "",
    phoneNumber: "",
    zipCode: "",
    streetAddress: "",
    city: "",
    birthday: "",
    email: "",
    lastAppointment: "",
    nextAppointment: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token === null) {
    navigate(SIGN_IN);
  }
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const onSubmit = (patientObject) => {
    axios
      .post(
        "http://localhost:4000/patients/create-patient",
        patientObject,
        headers
      )
      .then((response) => {
        if (response.status === 200) alert("Patient successfully created");
        else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  return (
    <>
      <NavBar />
      <h3>Create Patient</h3>
      <PatientForm
        initialValues={formValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        Create Patient
      </PatientForm>
    </>
  );
};

export default CreatePatient;
