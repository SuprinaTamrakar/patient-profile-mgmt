// EditPatient Component for update patient data

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import PatientForm from "./PatientForm";

// EditPatient Component
const EditPatient = (props) => {
  const [formValues, setFormValues] = useState({
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

  //onSubmit handler
  const onSubmit = (patientObject) => {
    axios
      .put(
        "http://localhost:4000/patients/update-patient/" +
          props.match.params.id,
        patientObject
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Patient successfully updated");
          props.history.push("/patient-list");
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  // Load data from server and reinitialize patient form
  useEffect(() => {
    axios
      .get(
        "http://localhost:4000/patients/update-patient/" + props.match.params.id
      )
      .then((res) => {
        const {
          name,
          gender,
          phoneNumber,
          zipCode,
          streetAddress,
          city,
          birthday,
          email,
          lastAppointment,
          nextAppointment,
        } = res.data;
        setFormValues({
          name,
          gender,
          phoneNumber,
          zipCode,
          streetAddress,
          city,
          birthday,
          email,
          lastAppointment,
          nextAppointment,
        });
      })
      .catch((err) => console.log(err));
  },[props.match.params.id]);
  // Return patient form
  return (
    <PatientForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      Update Patient
    </PatientForm>
  );
};

// Export EditPatient Component
export default EditPatient;
