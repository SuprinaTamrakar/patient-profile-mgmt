// EditPatient Component for update patient data

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import PatientForm from "./PatientForm";
import { useParams } from "react-router-dom";
import * as moment from "moment";
import { NavBar } from ".././Common/NavBar";

const token = localStorage.getItem("token");
const headers = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
};

// EditPatient Component
const EditPatient = (props) => {
  const routeParams = useParams();

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
        "http://localhost:4000/patients/update-patient/" + routeParams.id,
        patientObject,
        headers
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Patient successfully updated");
          window.location.href = "/patient-list";
        } else Promise.reject();
      })
      .catch((err) => console.log(err));
  };

  // Load data from server and reinitialize patient form
  useEffect(() => {
    axios
      .get(
        "http://localhost:4000/patients/update-patient/" + routeParams.id,
        headers
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

        const formattedBirthday = moment(birthday).format("YYYY-MM-DD");
        const formattedLastAppointment =
          moment(lastAppointment).format("YYYY-MM-DD");
        const formattedNextAppointment =
          moment(nextAppointment).format("YYYY-MM-DD");

        setFormValues({
          name,
          gender,
          phoneNumber,
          zipCode,
          streetAddress,
          city,
          birthday: formattedBirthday,
          email,
          lastAppointment: formattedLastAppointment,
          nextAppointment: formattedNextAppointment,
        });
      })
      .catch((err) => console.log(err));
  }, [routeParams.id]);
  // Return patient form
  return (
    <>
      <NavBar />
      <h3>Update Patient</h3>
      <PatientForm
        initialValues={formValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        Update Patient
      </PatientForm>
    </>
  );
};

// Export EditPatient Component
export default EditPatient;
