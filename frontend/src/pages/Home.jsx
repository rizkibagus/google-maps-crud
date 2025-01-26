import { useEffect, useState } from 'react';
import axios from 'axios';
import { getLocations, addLocation, updateLocation, deleteLocation } from '../api/locationApi';
import LocationForm from '../components/LocationForm';
import LocationList from '../components/LocationList';
import Map from '../components/Map';

const Home = () => {
  const [locations, setLocations] = useState([]);
  const [editingLocation, setEditingLocation] = useState(null);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    const { data } = await getLocations();
    setLocations(data);
  };

  const handleAddOrUpdate = async (location) => {
    console.log('Data sebelum geocoding:', location); // Debugging log
  
    try {
      // Lakukan geocoding untuk mendapatkan latitude dan longitude berdasarkan alamat
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: location.address,
            key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Pastikan API key benar
          },
        }
      );
  
      const geometry = response.data.results[0]?.geometry.location;
  
      if (!geometry) {
        alert('Alamat tidak valid. Tidak dapat menemukan koordinat.');
        return;
      }
  
      // Tambahkan latitude dan longitude ke data lokasi
      const newLocation = {
        ...location,
        latitude: geometry.lat,
        longitude: geometry.lng,
      };
  
      console.log('Data yang dikirim ke backend:', newLocation); // Debugging log
  
      // Tentukan apakah sedang menambahkan atau mengedit lokasi
      if (editingLocation) {
        await updateLocation(editingLocation._id, newLocation);
        setEditingLocation(null);
      } else {
        await addLocation(newLocation);
      }
  
      // Refresh daftar lokasi
      loadLocations();
    } catch (error) {
      console.error('Error saat geocoding:', error);
      alert('Gagal mendapatkan koordinat lokasi.');
    }
  };
  

  const handleDelete = async (id) => {
    await deleteLocation(id);
    loadLocations();
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <LocationForm onSubmit={handleAddOrUpdate} initialData={editingLocation} />
      <LocationList locations={locations} onEdit={setEditingLocation} onDelete={handleDelete} />
      <Map locations={locations} />
    </div>
  );
};

export default Home;
