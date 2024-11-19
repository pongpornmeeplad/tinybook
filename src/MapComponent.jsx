import React, { useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const initialCenter = {
  lat: 13.7563, // Bangkok
  lng: 100.5018,
};

function MapComponent() {
  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [markerPosition, setMarkerPosition] = useState(initialCenter);
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const autocompleteService = useRef(null);
  const inputRef = useRef();

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (window.google && window.google.maps && window.google.maps.places) {
      if (!autocompleteService.current) {
        autocompleteService.current =
          new window.google.maps.places.AutocompleteService();
      }

      if (value && autocompleteService.current) {
        autocompleteService.current.getPlacePredictions(
          { input: value },
          (predictions, status) => {
            if (status === "OK" && predictions) {
              setSuggestions(predictions);
            } else {
              setSuggestions([]);
            }
          }
        );
      } else {
        setSuggestions([]);
      }
    }
  };


  const handleSuggestionClick = (placeId, description) => {
    setInputValue(description);
    setSuggestions([]);

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ placeId }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        const newCenter = {
          lat: location.lat(),
          lng: location.lng(),
        };
        setMapCenter(newCenter);
        setMarkerPosition(newCenter);
      } else {
        alert("ไม่สามารถย้ายไปยังสถานที่นี้ได้: " + status);
      }
    });
  };

  const handleSearchClick = () => {
    if (inputValue) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: inputValue }, (results, status) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          const newCenter = {
            lat: location.lat(),
            lng: location.lng(),
          };
          setMapCenter(newCenter);
          setMarkerPosition(newCenter);
        } else {
          alert("ไม่พบสถานที่: " + status);
        }
      });
    }
  };
  

  return (
    <div>
      {/* ช่องค้นหา */}
      <div style={{ position: "relative", marginBottom: "10px" }}>
        <input
          type="text"
          ref={inputRef}
          placeholder="ค้นหาสถานที่..."
          value={inputValue}
          onChange={handleInputChange}
          style={{ width: "300px", padding: "5px" }}
        />
        <button
          onClick={handleSearchClick}
          style={{ marginLeft: "5px", padding: "5px" }}
        >
          ค้นหา
        </button>

        {/* Dropdown สำหรับ Autocomplete */}
        {suggestions.length > 0 && (
  <ul
    style={{
      listStyleType: "none",
      margin: 0,
      padding: 0,
      position: "absolute",
      top: "30px",
      left: "0",
      width: "300px",
      border: "1px solid #ccc",
      backgroundColor: "#fff",
      zIndex: 1000,
    }}
  >
    {suggestions.map((suggestion) => (
      <li
        key={suggestion.place_id}
        onClick={() =>
          handleSuggestionClick(
            suggestion.place_id,
            suggestion.description
          )
        }
        style={{
          padding: "10px",
          cursor: "pointer",
          color: "black", // เพิ่มสีตัวอักษรเป็นสีดำ
        }}
      >
        {suggestion.description}
      </li>
    ))}
  </ul>
)}

      </div>

      {/* แผนที่ */}
      <LoadScript googleMapsApiKey="AIzaSyDDvLgwZXq5b1KoaJxrCOLo-ah_2M5pH7Y"
        libraries={["places"]}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={14}
        >
          {/* เพิ่ม Marker */}
          <Marker position={markerPosition} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default MapComponent;
