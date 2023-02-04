const patientSchema = require("../models/Patient");

exports.createPatient = (patient, callback) => {
  patientSchema.create(patient, (error, data) => {
    if (error) {
      return callback(error);
    } else {
      return callback(null, data);
    }
  });
};

exports.getPatients = (callback) => {
  patientSchema.find((error, data) => {
    if (error) {
      return callback(error);
    } else {
      return callback(null, data);
    }
  });
};

exports.getPatient = (id, callback) => {
  patientSchema.findById(id, (error, data) => {
    if (error) {
      return callback(error);
    } else {
      return callback(null, data);
    }
  });
};

exports.updatePatient = (id, patient, callback) => {
  patientSchema.findByIdAndUpdate(id, { $set: patient }, (error, data) => {
    if (error) {
      return callback(error);
    } else {
      return callback(null, data);
    }
  });
};

exports.deletePatient = (id, callback) => {
  patientSchema.findByIdAndRemove(id, (error, data) => {
    if (error) {
      return callback(error);
    } else {
      return callback(null, data);
    }
  });
};
