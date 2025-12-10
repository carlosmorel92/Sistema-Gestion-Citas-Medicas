require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;
const authRoutes = require('./routes/auth');
const apptRoutes = require('./routes/appointments');
const usersRoutes = require('./routes/users');
const doctorsRoutes = require('./routes/doctors');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/appointments', apptRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/doctors', doctorsRoutes);

app.get('/', (req, res) => res.send('SGCM backend running'));

app.listen(port, () => console.log(`Server running on port ${port}`));
