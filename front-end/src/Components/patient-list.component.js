import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import PatientTableRow from "./PatientTableRow";

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/patients/")
      .then(({ data }) => {
        setPatients(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const DataTable = () => {
    return patients.map((res, i) => {
        return <PatientTableRow obj = {res} key={i}/>;
    });
  };
  return(
    <div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Phone Number</th>
            <th>ZIP Code</th>
            <th>Street Address</th>
            <th>City</th>
            <th>Birthday</th>
            <th>Email</th>
            <th>Last Appointment</th>
            <th>Next Appointment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{DataTable()}</tbody>
      </Table>
    </div>
  );
};

export default PatientList;