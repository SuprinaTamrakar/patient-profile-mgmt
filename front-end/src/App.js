// Import React
import React from "react";

// Import Bootstrap
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// Import Custom CSS
import "./App.css";

// Import from react-router-dom
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import other React Component
import CreatePatient from "./Components/create-patient.component";
import EditPatient from "./Components/edit-patient.component";
import PatientList from "./Components/patient-list.component";

// App Component
const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/create-patient"} className="nav-link">
                  Patient Profile Management App
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                <Nav>
                  <Link to={"/create-patient"} className="nav-link">
                    Create Patient
                  </Link>
                </Nav>

                <Nav>
                  <Link to={"/patient-list"} className="nav-link">
                    Patient List
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Routes>
                  <Route exact path="/" element={<CreatePatient />} />
                  <Route path="/create-patient" element={<CreatePatient />} />
                  <Route path="/edit-patient/:id" element={<EditPatient />} />
                  <Route path="/patient-list" element={<PatientList />} />
                </Routes>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
};

export default App;
