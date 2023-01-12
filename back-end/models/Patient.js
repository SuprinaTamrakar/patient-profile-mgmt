const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let patientSchema = new Schema(
  {
    name: {
      type: String,
    },
    gender: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    zipCode: {
      type: Number,
    },
    streetAddress: {
      type: String,
    },
    city: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    email: {
      type: String,
    },
    lastAppointment: {
      type: Date,
    },
    nextAppointment: {
      type: Date,
    },
  },
  {
    collection: "patients",
  }
);

module.exports = mongoose.model("Patient", patientSchema);
