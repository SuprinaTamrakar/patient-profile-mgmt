// CreatePatient Component for add new patient

// Import Modules
import React, { useState } from "react";
import axios from "axios";
import PatientForm from "./PatientForm";

//CreatePatient Component
const CreatePatient = () => {
  const [formValues] = useState({
    name: '',
    gender: '',
    phoneNumber: '',
    zipCode: '',
    streetAddress: '',
    city: '',
    birthday: '',
    email: '',
    lastAppointment: '',
    nextAppointment: '',
  });

  const onSubmit = (patientObject) => {
    axios
      .post("http://localhost:4000/patients/create-patient", patientObject)
      .then((response) => {
        if (response.status === 200) alert("Patient successfully created");
        else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  return (
    <PatientForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      Create Patient
    </PatientForm>
  );
};

export default CreatePatient;
