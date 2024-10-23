import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 28.6139, 
  lng: 77.2090,
};

function GoogleMapPicker({ onLocationSelect }) {
  const [markerPosition, setMarkerPosition] = useState(center);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });
    onLocationSelect({ latitude: lat, longitude: lng });
  };

  return (
    <LoadScript googleMapsApiKey="evident-airline-438609-b0">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={handleMapClick}  
      >
        <Marker position={markerPosition} /> 
      </GoogleMap>
    </LoadScript>
  );
}

export default GoogleMapPicker;
