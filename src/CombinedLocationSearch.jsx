// CombinedLocationSearch.jsx

import React, { useState, useEffect } from "react";
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
  isEditable = true,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDDvLgwZXq5b1KoaJxrCOLo-ah_2M5pH7Y", // Replace with your API key
    libraries,
  });

  const [autocomplete, setAutocomplete] = useState(null);
  const [selectedLatlong, setSelectedLatlong] = useState(
    initialLatlong || defaultCenter
  );
  const [workplace, setWorkplace] = useState(initialWorkplace || "");
  const [searchInput, setSearchInput] = useState(initialWorkplace || "");

  // Update state when initial values change
  useEffect(() => {
    setSelectedLatlong(initialLatlong || defaultCenter);
    setWorkplace(initialWorkplace || "");
    setSearchInput(initialWorkplace || "");
  }, [initialLatlong, initialWorkplace]);

  const fetchWorkplaceFromLatLng = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat, lng };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK" && results[0]) {
        const formattedAddress = results[0].formatted_address;
        setWorkplace(formattedAddress);
        setSearchInput(formattedAddress);
        if (isEditable && onLocationChange) {
          onLocationChange({
            workplace: formattedAddress,
            latlong: { lat, lng },
          }); // Send data to parent
        }
      } else {
        console.error("Geocoder failed due to: " + status);
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
        setSearchInput(formattedAddress); // Update search input
        if (isEditable && onLocationChange) {
          onLocationChange({
            workplace: formattedAddress,
            latlong: { lat, lng },
          }); // Send data to parent
        }
      }
    }
  };

  const handleMapClick = (event) => {
    if (isEditable && event.latLng) {
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
          style={{ width: "100%", marginBottom: "10px", backgroundColor:"white", color:"grey"}}
          size="large"
          disabled={!isEditable}
        />
      </Autocomplete>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={selectedLatlong}
        zoom={10}
        onClick={isEditable ? handleMapClick : undefined}
        options={{
          draggable: isEditable,
          zoomControl: true,
          scrollwheel: true,
          disableDoubleClickZoom: false,
        }}
      >
       <Marker position={selectedLatlong} />
      </GoogleMap>



    </div>
  );
};

export default CombinedLocationSearch;
