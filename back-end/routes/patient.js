let express = require("express");
let router = express.Router();

const patientController = require("../controller/patientController");

router.post("/create-patient", patientController.createPatient);
router.get("/", patientController.getPatients);
router.route("/update-patient/:id").get(patientController.getPatient)
                                   .put(patientController.updatePatient);
router.delete("/delete-patient/:id", patientController.deletePatient);

module.exports = router;
