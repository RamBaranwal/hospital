const express = require('express');
const router = express.Router();
const doctorPanelController = require('../controllers/doctorPanelController');

router.get('/:doctorId/appointments', doctorPanelController.getDoctorAppointments);
router.put('/appointment/:id', doctorPanelController.updateAppointmentStatus);

module.exports = router;
