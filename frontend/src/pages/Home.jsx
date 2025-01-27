import { useEffect, useState } from 'react';
import axios from 'axios';
import { getLocations, addLocation, updateLocation, deleteLocation } from '../api/locationApi';
import LocationForm from '../components/LocationForm';
import LocationList from '../components/LocationList';
import Map from '../components/Map';
import { GOOGLE_MAPS_API_KEY } from '../constants';

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
    
  
    try {
      // Do geoconding to get latitude and longitude based on address
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: location.address,
            key: GOOGLE_MAPS_API_KEY, // Make sure the API key is correct
          },
        }
      );
  
      const geometry = response.data.results[0]?.geometry.location;
  
      if (!geometry) {
        alert('Alamat tidak valid. Tidak dapat menemukan koordinat.');
        return;
      }
  
      // Added latitude and longitude to location data
      const newLocation = {
        ...location,
        latitude: geometry.lat,
        longitude: geometry.lng,
      };
  
     
  
      // Determine whether adding or editing location
      if (editingLocation) {
        await updateLocation(editingLocation._id, newLocation);
        setEditingLocation(null);
      } else {
        await addLocation(newLocation);
      }
  
      // Refresh location list
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
