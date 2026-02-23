const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/book', appointmentController.bookAppointment);
router.get('/patient/:patientId', appointmentController.getPatientAppointments);
router.get('/availability', appointmentController.checkAvailability);
router.put('/cancel/:id', appointmentController.cancelAppointment);

module.exports = router;
