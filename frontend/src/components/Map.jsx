import { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '../constants';

const Map = ({ locations }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  // State for storing map center location
  const [center, setCenter] = useState({ lat: -7.966620, lng: 112.632632 }); // Default: Malang

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.warn("Gagal mendapatkan lokasi. Menggunakan lokasi default.");
        }
      );
    }
  }, []);

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <GoogleMap zoom={12} center={center} mapContainerClassName="w-full h-96">
    {locations.map((loc) => (
      <Marker key={loc._id} position={{ lat: loc.latitude, lng: loc.longitude }} title={loc.name} />
    ))}
  </GoogleMap>

  );
};

export default Map;
