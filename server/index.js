const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// Routes
app.use('/', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctor-panel', require('./routes/doctorPanelRoutes')); // Doctor Action Routes

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
