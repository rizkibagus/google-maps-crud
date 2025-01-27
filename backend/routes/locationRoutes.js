const express = require('express');
const Location = require('../models/Location');

const router = express.Router();

// GET All Location
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST (For Create Location)
router.post('/', async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ message: 'Semua field wajib diisi!' });
  }

  const location = new Location({ name, address, latitude, longitude });

  try {
    const newLocation = await location.save();
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (For Update Location)
router.put('/:id', async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      req.params.id,
      { name, address, latitude, longitude },
      { new: true }
    );

    if (!updatedLocation) {
      return res.status(404).json({ message: 'Lokasi tidak ditemukan!' });
    }

    res.json(updatedLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE (For Delete Location)
router.delete('/:id', async (req, res) => {
  try {
    const deletedLocation = await Location.findByIdAndDelete(req.params.id);

    if (!deletedLocation) {
      return res.status(404).json({ message: 'Lokasi tidak ditemukan!' });
    }

    res.json({ message: 'Lokasi berhasil dihapus!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
