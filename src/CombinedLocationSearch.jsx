import React, { useState } from "react";
import {
  useLoadScript,
  GoogleMap,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";
import { Input } from "antd"; // Import Ant Design Input component

const libraries = ["places"]; // Include places library
const mapContainerStyle = { width: "100%", height: "400px" };
const defaultCenter = { lat: 13.736717, lng: 100.523186 }; // Default center

const CombinedLocationSearch = ({
  onLocationChange,
  initialLatlong,
  initialWorkplace,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_API_KEY", // Replace with your API key
    libraries,
  });

  const [autocomplete, setAutocomplete] = useState(null);
  const [selectedLatlong, setSelectedLatlong] = useState(
    initialLatlong || null
  );
  const [workplace, setWorkplace] = useState(initialWorkplace || "");
  const [searchInput, setSearchInput] = useState("");

  const fetchWorkplaceFromLatLng = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat, lng };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK" && results[0]) {
        const formattedAddress = results[0].formatted_address;
        setWorkplace(formattedAddress);
        onLocationChange({ workplace: formattedAddress, latlong: { lat, lng } }); // Send data to parent
      }
    });
  };

  const handlePlaceSelect = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setSelectedLatlong({ lat, lng });
        const formattedAddress = place.formatted_address;
        setWorkplace(formattedAddress);
        onLocationChange({
          workplace: formattedAddress,
          latlong: { lat, lng },
        }); // Send data to parent
        setSearchInput(formattedAddress); // Update search input
      }
    }
  };

  const handleMapClick = (event) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setSelectedLatlong({ lat, lng });
      fetchWorkplaceFromLatLng(lat, lng);
    }
  };

  const handleLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceSelect}>
        <Input
          placeholder="ค้นหาสถานที่" // "Search for a location" in Thai
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
          size="large"
        />
      </Autocomplete>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={selectedLatlong || defaultCenter}
        zoom={10}
        onClick={handleMapClick}
      >
        {selectedLatlong && <Marker position={selectedLatlong} />}
      </GoogleMap>

      <div style={{ marginTop: "20px", color: "black" }}>
        <h3>ที่อยู่ที่เลือก:</h3> {/* "Selected Address" in Thai */}
        <p>{workplace}</p>
        <h3>พิกัดที่เลือก:</h3> {/* "Selected Coordinates" in Thai */}
        <p>
          ละติจูด: {selectedLatlong?.lat}, ลองจิจูด: {selectedLatlong?.lng}
        </p>
      </div>
    </div>
  );
};

export default CombinedLocationSearch;
