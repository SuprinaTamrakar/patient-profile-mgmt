import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import { CREATE_PATIENT, PATIENT_LIST, SIGN_OUT } from ".././Constants/Routes";

export const NavBar = () => (
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand>
        <Link to={PATIENT_LIST} className="nav-link">
          Patient Profile Management App
        </Link>
      </Navbar.Brand>

      <Nav className="justify-content-end">
        <Nav>
          <Link to={CREATE_PATIENT} className="nav-link">
            Create Patient
          </Link>
        </Nav>

        <Nav>
          <Link to={PATIENT_LIST} className="nav-link">
            Patient List
          </Link>
        </Nav>

        <Nav>
          <Link to={SIGN_OUT} className="nav-link">
            Sign Out
          </Link>
        </Nav>
      </Nav>
    </Container>
  </Navbar>
);
