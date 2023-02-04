import React from 'react';
import { render, fireEvent , screen} from '@testing-library/react';
import axios from 'axios';
import CreatePatient from './CreatePatient';

jest.mock('axios');

describe('CreatePatient', () => {
  it('submits the form with the correct data', async () => {
    render(<CreatePatient />);
    const form = screen.getByTestId('patient-form');
    const nameInput = screen.getByTestId('name-input');
    const genderInput = screen.getByTestId('gender-input');
    const phoneNumberInput = screen.getByTestId('phoneNumber-input');
    const zipCodeInput = screen.getByTestId('zipCode-input');
    const streetAddressInput = screen.getByTestId('streetAddress-input');
    const cityInput = screen.getByTestId('city-input');
    const birthdayInput = screen.getByTestId('birthday-input');
    const emailInput = screen.getByTestId('email-input');
    const lastAppointmentInput = screen.getByTestId('lastAppointment-input');
    const nextAppointmentInput = screen.getByTestId('nextAppointment-input');
    // const submitButton = screen.getByTestId('submit-button');
  
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(genderInput, { target: { value: 'Male' } });
    fireEvent.change(phoneNumberInput, { target: { value: '123-456-7890' } });
    fireEvent.change(zipCodeInput, { target: { value: '12345' } });
    fireEvent.change(streetAddressInput, { target: { value: '123 Main St' } });
    fireEvent.change(cityInput, { target: { value: 'New York' } });
    fireEvent.change(birthdayInput, { target: { value: '01/01/2000' } });
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(lastAppointmentInput, { target: { value: '12/31/2022' } });
    fireEvent.change(nextAppointmentInput, { target: { value: '01/01/2023' } });
    fireEvent.submit(form);

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:4000/patients/create-patient', 
      {
        name: 'John Doe',
        gender: 'Male',
        phoneNumber: '123-456-7890',
        zipCode: '12345',
        streetAddress: '123 Main St',
        city: 'New York',
        birthday: '01/01/2000',
        email: 'johndoe@example.com',
        lastAppointment: '12/31/2022',
        nextAppointment: '01/01/2023',
      }
    );
  });
});
