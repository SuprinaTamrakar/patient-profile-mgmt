const patientService = require("../service/patientService");

exports.createPatient = (req, res, next) => {
  patientService.createPatient(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      return res.json(data);
    }
  });
};

exports.getPatients = (req, res) => {
  patientService.getPatients((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

exports.getPatient = (req, res) => {
  patientService.getPatient(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

exports.updatePatient = (req, res, next) => {
  patientService.updatePatient(req.params.id, req.body, (error, data) => {
    if (error) {
      return next(error);
      console.log(error);
    } else {
      res.json(data);
      console.log("Patient updated successfully !");
    }
  });
};

exports.deletePatient = (req, res, next) => {
  patientService.deletePatient(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
};
