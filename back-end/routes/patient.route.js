let mongoose = require("mongoose"),
  express = require("express"),
  jwt = require("jsonwebtoken"),
  router = express.Router(),
  dotenv = require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

// Patient Model
let patientSchema = require("../models/Patient");

// Middleware
const auth = require("../middleware/auth");

// CREATE Patient
router.post("/create-patient", auth, (req, res, next) => {
  patientSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// READ Patients
router.get("/", auth, (req, res) => {
  patientSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// UPDATE patient
router
  .route("/update-patient/:id")
  // Get Single Patient
  .get(auth, (req, res) => {
    patientSchema.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  })

  // Update Patient Data
  .put(auth, (req, res, next) => {
    patientSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      (error, data) => {
        if (error) {
          return next(error);
          console.log(error);
        } else {
          res.json(data);
          console.log("Patient updated successfully !");
        }
      }
    );
  });

// Delete Patient
router.delete("/delete-patient/:id", auth, (req, res, next) => {
  patientSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
