import CreatePatient from "./src/Components/create-patient.component";
import React from "react";
import { Router } from "react-router-dom";
var axios = require("axios");
var fireEvent = require("@testing-library/react").fireEvent;
var screen = require("@testing-library/react").screen;

jest.mock("axios");

describe("CreatePatient component", () => {
  it("renders correctly", async () => {
    localStorage.setItem("token", "testtoken");
    <Router>
      <CreatePatient />
      {await (async () => {
        const nameInput = screen.getByLabelText("Name");
        expect(nameInput).toBeInTheDocument();
        const genderInput = screen.getByLabelText("Gender");
        expect(genderInput).toBeInTheDocument();
        const phoneNumberInput = screen.getByLabelText("Phone Number");
        expect(phoneNumberInput).toBeInTheDocument();
        const zipCodeInput = screen.getByLabelText("Zip Code");
        expect(zipCodeInput).toBeInTheDocument();
        const streetAddressInput = screen.getByLabelText("Street Address");
        expect(streetAddressInput).toBeInTheDocument();
        const cityInput = screen.getByLabelText("City");
        expect(cityInput).toBeInTheDocument();
        const birthdayInput = screen.getByLabelText("Birthday");
        expect(birthdayInput).toBeInTheDocument();
        const emailInput = screen.getByLabelText("Email");
        expect(emailInput).toBeInTheDocument();
        const lastAppointmentInput = screen.getByLabelText("Last Appointment");
        expect(lastAppointmentInput).toBeInTheDocument();
        const nextAppointmentInput = screen.getByLabelText("Next Appointment");
        expect(nextAppointmentInput).toBeInTheDocument();
      })}
    </Router>;
  });

  it("calls axios post method with the correct parameters on submit", async () => {
    localStorage.setItem("token", "testtoken");
    <Router>
      <CreatePatient />
      {await (async () => {
        const nameInput = screen.getByLabelText("Name");
        const genderInput = screen.getByLabelText("Gender");
        const phoneNumberInput = screen.getByLabelText("Phone Number");
        const zipCodeInput = screen.getByLabelText("Zip Code");
        const streetAddressInput = screen.getByLabelText("Street Address");
        const cityInput = screen.getByLabelText("City");
        const birthdayInput = screen.getByLabelText("Birthday");
        const emailInput = screen.getByLabelText("Email");
        const lastAppointmentInput = screen.getByLabelText("Last Appointment");
        const nextAppointmentInput = screen.getByLabelText("Next Appointment");
        const submitButton = screen.getByText("Create Patient");
        // fill in form fields
        fireEvent.change(nameInput, { target: { value: "Suprina Tamrakar" } });
        fireEvent.change(genderInput, { target: { value: "Female" } });
        fireEvent.change(phoneNumberInput, { target: { value: "1234567890" } });
        fireEvent.change(zipCodeInput, { target: { value: "12345" } });
        fireEvent.change(streetAddressInput, {
          target: { value: "123 Main St" },
        });
        fireEvent.change(cityInput, { target: { value: "Anytown" } });
        fireEvent.change(birthdayInput, { target: { value: "01/01/2000" } });
        fireEvent.change(emailInput, {
          target: { value: "suprina@example.com" },
        });
        fireEvent.change(lastAppointmentInput, {
          target: { value: "01/01/2022" },
        });
        fireEvent.change(nextAppointmentInput, {
          target: { value: "01/01/2023" },
        });
        // submit form
        fireEvent.click(submitButton);

        // check if axios post method was called with the correct parameters
        expect(axios.post).toHaveBeenCalledWith(
          "http://localhost:8080/patients",
          {
            name: "Suprina Tamrakar",
            gender: "Female",
            phoneNumber: "1234567890",
            zipCode: "12345",
            streetAddress: "123 Main St",
            city: "Anytown",
            birthday: "01/01/2000",
            email: "suprina@example.com",
            lastAppointment: "01/01/2022",
            nextAppointment: "01/01/2023",
          },
          {
            headers: {
              Authorization: "Bearer testtoken",
              "Content-Type": "application/json",
            },
          }
        );
      })}
    </Router>;
  });
});
