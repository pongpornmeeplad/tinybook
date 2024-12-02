import React, { useState } from "react";
import {
  useLoadScript,
  GoogleMap,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";

const libraries = ["places"]; // Include places library
const mapContainerStyle = { width: "100%", height: "400px" };
const defaultCenter = { lat: 13.736717, lng: 100.523186 }; // Default center

const CombinedLocationSearch = ({
  onLocationChange,
  initialLatlong,
  initialAddress,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_API_KEY", // Replace with your API key
    libraries,
  });

  const [autocomplete, setAutocomplete] = useState(null);
  const [selectedLatlong, setSelectedLatlong] = useState(
    initialLatlong || null
  );
  const [address, setAddress] = useState(initialAddress || "");
  const [searchInput, setSearchInput] = useState("");

  const fetchAddressFromLatLng = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat, lng };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK" && results[0]) {
        const formattedAddress = results[0].formatted_address;
        setAddress(formattedAddress);
        onLocationChange({ address: formattedAddress, latlong: { lat, lng } }); // Send data to parent
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
        setAddress(place.formatted_address);
        onLocationChange({
          address: place.formatted_address,
          latlong: { lat, lng },
        }); // Send data to parent
      }
    }
  };

  const handleMapClick = (event) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setSelectedLatlong({ lat, lng });
      fetchAddressFromLatLng(lat, lng);
    }
  };

  const handleLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceSelect}>
        <input
          type="text"
          placeholder="Search for a location"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ width: "100%", padding: "12px", marginBottom: "10px" }}
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
        <h3>Selected Address:</h3>
        <p>{address}</p>
        <h3>Selected Coordinates:</h3>
        <p>
          Latitude: {selectedLatlong?.lat}, Longitude: {selectedLatlong?.lng}
        </p>
      </div>
    </div>
  );
};

export default CombinedLocationSearch;
