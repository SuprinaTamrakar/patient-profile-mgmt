import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import { EDIT_PATIENT } from "./Constants/Routes";

const PatientTableRow = (props) => {
  const {
    _id,
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
  } = props.obj;

  const deletePatient = () => {
    axios
      .delete("http://localhost:4000/patients/delete-patient/" + _id)
      .then((res) => {
        if (res.status === 200) {
          alert("Patient successfully deleted");
          window.location.reload();
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{gender}</td>
      <td>{phoneNumber}</td>
      <td>{name}</td>
      <td>{zipCode}</td>
      <td>{streetAddress}</td>
      <td>{city}</td>
      <td>{birthday}</td>
      <td>{email}</td>
      <td>{lastAppointment}</td>
      <td>{nextAppointment}</td>
      <td>
        <Link className="edit-link" to={EDIT_PATIENT + _id}>
          Edit
        </Link>
        <Button onClick={deletePatient} size="sm" variant="danger">
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default PatientTableRow;
