import React from "react";
import { render, fireEvent , screen } from "@testing-library/react";
import CreatePatient from "./Components/create-patient.component";

jest.mock("axios");

describe("CreatePatient", () => {
  it("should make a post request to create a patient and show an alert message if successful", async () => {
    const mockSuccessResponse = { status: 200 };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<CreatePatient />);
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

    fireEvent.change(nameInput, { target: { value: "John Smith" } });
    fireEvent.change(genderInput, { target: { value: "male" } });
    fireEvent.change(phoneNumberInput, { target: { value: "123-456-7890" } });
    fireEvent.change(zipCodeInput, { target: { value: "12345" } });
    fireEvent.change(streetAddressInput, { target: { value: "123 Main St" } });
    fireEvent.change(cityInput, { target: { value: "New York" } });
    fireEvent.change(birthdayInput, { target: { value: "01/01/1980" } });
    fireEvent.change(emailInput, { target: { value: "johnsmith@email.com" } });
    fireEvent.change(lastAppointmentInput, { target: { value: "12/01/2020" } });
    fireEvent.change(nextAppointmentInput, { target: { value: "01/01/2021" } });
    fireEvent.click(submitButton);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:4000/patients/create-patient",
      {
        method: "POST",
        body: JSON.stringify({
          name: "John Smith",
          gender: "male",
          phoneNumber: "123-456-7890",
          zipCode: "12345",
          streetAddress: "123 Main St",
          city: "New York",
          birthday: "01/01/1980",
          email: "johnsmith@email.com",
          lastAppointment: "12/01/2020",
          nextAppointment: "01/01/2021",
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    expect(alertSpy).toHaveBeenCalledWith("Patient successfully created");
  });

  it("should show an alert message if the post request fails", async () => {
    const mockError = new Error("Request failed");
    const mockFetchPromise = Promise.reject(mockError);
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    await expect(mockFetchPromise).rejects.toThrow("Request failed");
    expect(alertSpy).toHaveBeenCalledWith("Something went wrong");
  });
});
