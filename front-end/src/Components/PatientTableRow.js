import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import * as moment from 'moment';
import axios from "axios";

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

  const formattedBirthday= moment(birthday).format("YYYY-MM-DD");
  const formattedLastAppointment= moment(lastAppointment).format("YYYY-MM-DD");
  const formattedNextAppointment= moment(nextAppointment).format("YYYY-MM-DD");
  
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

  const navigate = useNavigate();

  const editPatient = () => {
    navigate("/update-patient/" + _id);
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{gender}</td>
      <td>{phoneNumber}</td>
      <td>{zipCode}</td>
      <td>{streetAddress}</td>
      <td>{city}</td>
      <td>{formattedBirthday}</td>
      <td>{email}</td>
      <td>{formattedLastAppointment}</td>
      <td>{formattedNextAppointment}</td>
      <td>
        <Button onClick={editPatient} size="sm" variant="primary">
          Edit
        </Button>
        <Button onClick={deletePatient} size="sm" variant="danger">
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default PatientTableRow;
