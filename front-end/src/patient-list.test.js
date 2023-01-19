import React from "react";
import axios from "axios";
import { render, screen } from "@testing-library/react";
import PatientList from "./PatientList";

jest.mock("axios");

describe("PatientList", () => {
  it("should display a table with a list of patients", async () => {
    // Mock the response from the API
    const mockPatients = [
      {
        name: "John Smith",
        gender: "male",
        phoneNumber: "123-456-7890",
        zipCode: "12345",
        streetAddress: "123 Main St",
        city: "New York",
        birthday: "01/01/1980",
        email: "johnsmith@email.com",
        lastAppointment: "12/01/2020",
        nextAppointment: "01/01/2021"
      },
      {
        name: "Jane Doe",
        gender: "female",
        phoneNumber: "098-765-4321",
        zipCode: "67890",
        streetAddress: "456 Park Ave",
        city: "Los Angeles",
        birthday: "02/14/1985",
        email: "janedoe@email.com",
        lastAppointment: "11/15/2020",
        nextAppointment: "12/31/2020"
      }
    ];
    axios.get.mockResolvedValue({ data: mockPatients });

    // Render the component
    render(<PatientList />);

    // Wait for the table to be displayed
    const table = await screen.findByText("Patient List");

    // Check that each patient is displayed in the table
    mockPatients.forEach((patient) => {
      Object.values(patient).forEach((val) => {
        expect(table).toHaveTextContent(val);
      });
    });
  });

  it("should display an error message if the API call fails", async () => {
    // Mock the error from the API
    const mockError = new Error("Request failed");
    axios.get.mockRejectedValue(mockError);

    // Render the component
    render(<PatientList />);

    // Check that the error message is displayed
    const errorMessage = await screen.findByText("Error fetching patients");
    expect(errorMessage).toBeInTheDocument();
  });
});
