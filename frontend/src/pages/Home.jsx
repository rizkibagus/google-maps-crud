import { useEffect, useState } from "react";
import axios from "axios";
import {
  getLocations,
  addLocation,
  updateLocation,
  deleteLocation,
} from "../api/locationApi";
import LocationForm from "../components/LocationForm";
import LocationList from "../components/LocationList";
import Map from "../components/Map";
import { GOOGLE_MAPS_API_KEY } from "../constants";

const Home = () => {
  const [locations, setLocations] = useState([]);
  const [editingLocation, setEditingLocation] = useState(null);
  const [loading, setLoading] = useState(false); // Added state loading

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    setLoading(true);
    try {
      const { data } = await getLocations();
      setLocations(data);
    } catch (error) {
      console.error("Gagal mengambil lokasi:", error);
      alert("Gagal mengambil data lokasi.");
    } finally {
      setLoading(false); // When finish loading, set to false
    }
  };

  const handleAddOrUpdate = async (location) => {
    setLoading(true); // Started loading when add/edit location

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
        alert("Alamat tidak valid. Tidak dapat menemukan koordinat.");
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
      console.error("Error saat geocoding:", error);
      alert("Gagal mendapatkan koordinat lokasi.");
    } finally {
      setLoading(false); 
    }
  };

  const handleDelete = async (id) => {
    setLoading(true); // Start loading when erase
    try {
      await deleteLocation(id);
      loadLocations();
    } catch (error) {
      console.error("Gagal menghapus lokasi:", error);
      alert("Gagal menghapus lokasi.");
    } finally {
      setLoading(false); // When finish loading, set to false
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <LocationForm
        onSubmit={handleAddOrUpdate}
        initialData={editingLocation}
      />

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <LocationList
          locations={locations}
          onEdit={setEditingLocation}
          onDelete={handleDelete}
        />
      )}

      <Map locations={locations} />
    </div>
  );
};

export default Home;
