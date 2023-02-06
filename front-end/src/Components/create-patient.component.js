// CreatePatient Component for add new patient

// Import Modules
import React, { useState } from "react";
import axios from "axios";
import PatientForm from "./PatientForm";
import { NavBar } from ".././Common/NavBar";

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

  const token = localStorage.getItem("token");
  if (token === null) {
    alert("No Token!");
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
        if (response.status === 200) {
          alert("Patient successfully created");
          window.location.href = "/patient-list";
        } else Promise.reject();
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
