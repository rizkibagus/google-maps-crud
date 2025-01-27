const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Inisialisasi express
const app = express();
const PORT = process.env.PORT || 5000;

// Allowed domain Vercel dan localhost
const allowedOrigins = [
  'https://google-maps-crud.vercel.app',
  'http://localhost:5173'
];


// Middleware
app.use(cors({
  origin: allowedOrigins, // Gunakan array untuk multi-domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
  }));
app.use(bodyParser.json());

// Connected to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log('Database connection error:', err));

// Routes
const locationRoutes = require('./routes/locationRoutes');
app.use('/api/locations', locationRoutes);

// Running server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});