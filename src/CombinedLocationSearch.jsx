import React, { useState, useRef } from "react";
import {
  useLoadScript,
  GoogleMap,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";

const libraries = ["places"]; // Include places library
const mapContainerStyle = { width: "100%", height: "400px" };
const center = { lat: 13.736717, lng: 100.523186 }; // Default center

const CombinedLocationSearch = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDDvLgwZXq5b1KoaJxrCOLo-ah_2M5pH7Y", // Replace with your API key
    libraries,
  });

  const [autocomplete, setAutocomplete] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [address, setAddress] = useState("");
  const mapRef = useRef(null);

  // Function to get address from Geocoder
  const fetchAddressFromLatLng = (lat, lng) => {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat, lng };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          setAddress(results[0].formatted_address);
        } else {
          setAddress("No address found");
        }
      } else {
        setAddress(`Geocoder failed: ${status}`);
      }
    });
  };

  // Handle place selection from autocomplete
  const handlePlaceSelect = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place && place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setSelectedPosition({ lat, lng });
        setAddress(place.formatted_address);
      }
    }
  };

  // Handle map click to select a location
  const handleMapClick = (event) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setSelectedPosition({ lat, lng });
      fetchAddressFromLatLng(lat, lng);
    }
  };

  // Handle autocomplete instance load
  const handleLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      {/* Autocomplete Input */}
      <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceSelect}>
        <input
          type="text"
          placeholder="Search for a location"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
          }}
        />
      </Autocomplete>

      {/* Google Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={selectedPosition || center}
        zoom={10}
        onClick={handleMapClick}
      >
        {/* Marker */}
        {selectedPosition && <Marker position={selectedPosition} />}
      </GoogleMap>

      {/* Location Details */}
      <div style={{ marginTop: "20px", color: "black" }}>
        <h3>Selected Address:</h3>
        <p>{address}</p>
        <h3>Selected Coordinates:</h3>
        <p>
          Latitude: {selectedPosition?.lat}, Longitude: {selectedPosition?.lng}
        </p>
      </div>
    </div>
  );
};

export default CombinedLocationSearch;
