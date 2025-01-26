import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const Map = ({ locations }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <GoogleMap
      zoom={12}
      center={{ lat: -7.966620, lng: 112.632632 }}
      mapContainerClassName="w-full h-96"
    >
      {locations.map((loc) => (
        <Marker
          key={loc._id}
          position={{ lat: loc.latitude, lng: loc.longitude }}
          title={loc.name}
        />
      ))}
    </GoogleMap>
  );
};

export default Map;
