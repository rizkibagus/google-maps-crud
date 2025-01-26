const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Inisialisasi aplikasi
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Sesuaikan dengan port frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }));
app.use(bodyParser.json());

// Koneksi ke MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log('Database connection error:', err));

// Routes
const locationRoutes = require('./routes/locationRoutes');
app.use('/api/locations', locationRoutes);

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});