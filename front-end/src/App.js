// Import React
import React from "react";

// Import Bootstrap
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// Import Custom CSS
import "./App.css";

// Import from react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import other React Component
import CreatePatient from "./Components/create-patient.component";
import EditPatient from "./Components/edit-patient.component";
import PatientList from "./Components/patient-list.component";
import SignIn from "./Components/sign-in";
import { CREATE_PATIENT, EDIT_PATIENT, PATIENT_LIST } from "./Constants/Routes";

// App Component
const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        
        </header>
        <div className="app-table">
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Routes>
                  <Route exact path="/" element={<SignIn />} />
                  <Route path={CREATE_PATIENT} element={<CreatePatient />} />
                  <Route path={EDIT_PATIENT} element={<EditPatient />} />
                  <Route path={PATIENT_LIST} element={<PatientList />} />
                </Routes>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Router>
  );
};

export default App;
