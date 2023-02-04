const patientController = require("./controller/patientController");
const patientService = require("./service/patientService");
const patientSchema = require("./models/Patient");

jest.mock("./models/Patient", () => {
  return {
    create: jest.fn().mockImplementation((patient, callback) => {
      return callback(null, patient);
    }),
    find: jest.fn().mockImplementation((callback) => {
      callback(null, [
        {
          name: "John Doe",
          gender: "Male",
          phoneNumber: "1234567890",
          zipCode: 123456,
          streetAddress: "1 Main St",
          city: "New York",
          birthday: new Date("01-01-2000"),
          email: "johndoe@email.com",
          lastAppointment: new Date("01-01-2021"),
          nextAppointment: new Date("01-01-2022"),
        },
        {
          name: "Jane Doe",
          gender: "Female",
          phoneNumber: "0987654321",
          zipCode: 654321,
          streetAddress: "2 Main St",
          city: "Los Angeles",
          birthday: new Date("01-01-1999"),
          email: "janedoe@email.com",
          lastAppointment: new Date("01-01-2022"),
          nextAppointment: new Date("01-01-2023"),
        },
      ]);
    }),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn().mockReturnValue(Promise.resolve({})),
    findByIdAndRemove: jest.fn().mockReturnValue(Promise.resolve({}))
  };
});

  describe("createPatient", () => {
    it("creates a new patient", async () => {
      const req = {
        body: {
          name: "John Doe",
          gender: "Male",
          phoneNumber: "1234567890",
          zipCode: 12345,
          streetAddress: "1 Main St",
          city: "New York",
          birthday: new Date(),
          email: "johndoe@email.com",
          lastAppointment: new Date(),
          nextAppointment: new Date(),
        },
      };

      const next = jest.fn();

      await patientController.createPatient(req, null, next);
      expect(patientSchema.create).toHaveBeenCalledWith(
        req.body,
        expect.any(Function)
      );
      expect(next).toHaveBeenCalledWith(null, req.body);
    });
  });

describe("getPatients", () => {
  it("should return a list of patients", async () => {
    patientService.getPatients((error, data) => {
      expect(error).toBeNull();
      expect(data).toEqual([
        {
          name: "John Doe",
          gender: "Male",
          phoneNumber: "1234567890",
          zipCode: 123456,
          streetAddress: "1 Main St",
          city: "New York",
          birthday: new Date("01-01-2000"),
          email: "johndoe@email.com",
          lastAppointment: new Date("01-01-2021"),
          nextAppointment: new Date("01-01-2022"),
        },
        {
          name: "Jane Doe",
          gender: "Female",
          phoneNumber: "0987654321",
          zipCode: 654321,
          streetAddress: "2 Main St",
          city: "Los Angeles",
          birthday: new Date("01-01-1999"),
          email: "janedoe@email.com",
          lastAppointment: new Date("01-01-2022"),
          nextAppointment: new Date("01-01-2023"),
        },
      ]);
    });
  });
});

describe("getPatient", () => {
  it("should return a single patient", async () => {
    const fakePatient = {
      name: "John Doe",
      gender: "Male",
      phoneNumber: "555-555-5555",
      zipCode: 12345,
      streetAddress: "123 Main St",
      city: "Anytown",
      birthday: new Date("2000-01-01"),
      email: "johndoe@email.com",
      lastAppointment: new Date("2022-12-31"),
      nextAppointment: new Date("2023-01-01"),
    };
    const fakeId = "1234567890";

    patientSchema.findById.mockImplementationOnce((id, callback) => {
      if (id === fakeId) {
        return callback(null, fakePatient);
      } else {
        return callback(new Error("Patient not found"));
      }
    });

    patientService.getPatient(fakeId, (error, data) => {
      expect(error).toBeNull();
      expect(data).toEqual(fakePatient);
      expect(patientSchema.findById).toHaveBeenCalledWith(
        fakeId,
        expect.any(Function)
      );
    });
  });

  it("should return an error if there is an issue with the database", async () => {
    const fakeError = new Error("Database error");
    const fakeId = "1234567890";

    patientSchema.findById.mockImplementationOnce((id, callback) => {
      return callback(fakeError);
    });

    patientService.getPatient(fakeId, (error, data) => {
      expect(error).toEqual(fakeError);
      expect(data).toBeUndefined();
      expect(patientSchema.findById).toHaveBeenCalledWith(
        fakeId,
        expect.any(Function)
      );
    });
  });
});

describe("updatePatient", () => {
  it("should update a patient", async () => {
    const fakePatient = {
      name: "John Doe",
      gender: "Male",
      phoneNumber: "555-555-5555",
      zipCode: 12345,
      streetAddress: "123 Main St",
      city: "Anytown",
      birthday: "1999-01-01",
      email: "johndoe@example.com",
      lastAppointment: "2022-01-01",
      nextAppointment: "2022-02-01",
    };

    const result = await patientService.updatePatient("123", fakePatient);
    expect(patientSchema.findByIdAndUpdate).toHaveBeenCalledWith(
      "123",
      { $set: fakePatient },
      expect.any(Function)
    );
  });

});

const mongoose = require("mongoose");

describe('deletePatient', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: {
        id: mongoose.Types.ObjectId()
      }
    };
    res = {
      status: jest.fn().mockReturnValue({
        json: jest.fn()
      })
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should delete a patient successfully', async () => {
    patientSchema.findByIdAndRemove.mockImplementation((id, callback) => {
      callback(null, {});
    });

    await patientController.deletePatient(req, res, next);

    expect(patientSchema.findByIdAndRemove).toHaveBeenCalledWith(req.params.id, expect.any(Function));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status().json).toHaveBeenCalledWith({ msg: {} });
  });

  it('should throw an error if patient deletion fails', async () => {
    const errorMessage = 'Error deleting patient';

    patientSchema.findByIdAndRemove.mockImplementation((id, callback) => {
      callback(errorMessage);
    });

    await patientController.deletePatient(req, res, next);

    expect(patientSchema.findByIdAndRemove).toHaveBeenCalledWith(req.params.id, expect.any(Function));
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});
