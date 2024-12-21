// src/components/FriendsMap.jsx

import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase"; // ตรวจสอบให้แน่ใจว่า path ถูกต้องตามโครงสร้างโปรเจคของคุณ

const FriendsMap = () => {
    const mapContainerStyle = {
        width: "100vw",
        height: "100vh",
    };

    const defaultCenter = {
        lat: 13.7563, // ตัวอย่าง: กรุงเทพฯ
        lng: 100.5018,
    };

    const mapOptions = {
        disableDefaultUI: false,
        zoomControl: true,
    };

    const infoWindowStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
        maxWidth: "250px",
        borderRadius: "15px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
        backgroundColor: "#fff",
    };

    const profilePicStyle = {
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        marginBottom: "15px",
        objectFit: "cover",
        border: "3px solid #4CAF50",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    };

    const titleStyle = {
        margin: "5px 0",
        fontSize: "1.5em",
        color: "#333",
        textAlign: "center",
    };

    const addressStyle = {
        margin: "0",
        textAlign: "center",
        fontSize: "1em",
        color: "#555",
    };

    const telStyle = {
        margin: "5px 0",
        textAlign: "center",
        fontSize: "1em",
        color: "#555",
    };

    const nicknameStyle = {
        margin: "5px 0",
        textAlign: "center",
        fontSize: "1em",
        color: "#555",
    };

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [iconCache, setIconCache] = useState({});

    // ฟังก์ชันสร้างไอคอนวงกลมที่มีรูปภาพ
    const createCircularIcon = async (imageUrl) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const reader = new FileReader();
            return new Promise((resolve, reject) => {
                reader.onloadend = () => {
                    const base64Image = reader.result;
                    const svg = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">
                            <defs>
                                <clipPath id="circleClip">
                                    <circle cx="25" cy="25" r="25" />
                                </clipPath>
                            </defs>
                            <image
                                href="${base64Image}"
                                width="50"
                                height="50"
                                clip-path="url(#circleClip)"
                            />
                            <circle
                                cx="25"
                                cy="25"
                                r="25"
                                fill="none"
                                stroke="#FFFFFF"
                                stroke-width="5"
                            />
                        </svg>
                    `;
                    const dataUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
                    resolve(dataUrl);
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error("Error creating circular icon:", error);
            return "/default-marker.png"; // ใช้ default marker ในกรณีเกิดข้อผิดพลาด
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUsers(usersList);
            } catch (error) {
                console.error("Error fetching users: ", error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const loadIcons = async () => {
            const newIconCache = { ...iconCache };
            for (const user of users) {
                const imageUrl = user.Picpic || "/default-marker.png";
                if (!newIconCache[imageUrl]) {
                    const iconUrl = await createCircularIcon(imageUrl);
                    newIconCache[imageUrl] = iconUrl;
                }
            }
            setIconCache(newIconCache);
        };

        if (users.length > 0) {
            loadIcons();
        }
    }, [users]);

    const handleMapClick = useCallback(() => {
        setSelectedUser(null);
    }, []);

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps...</div>;

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={8}
            center={defaultCenter}
            options={mapOptions}
            onClick={handleMapClick}
        >
            {users.map(user => (
                <Marker
                    key={user.id}
                    position={{ lat: user.Latlong.lat, lng: user.Latlong.lng }}
                    onClick={() => setSelectedUser(user)}
                    icon={{
                        url: iconCache[user.Picpic || "/default-marker.png"] || "/default-marker.png",
                        scaledSize: new window.google.maps.Size(50, 50),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(25, 25),
                    }}
                />
            ))}

            {selectedUser && (
                <InfoWindow
                    position={{ lat: selectedUser.Latlong.lat, lng: selectedUser.Latlong.lng }}
                    onCloseClick={() => setSelectedUser(null)}
                >
                    <div style={infoWindowStyle}>
                        <img
                            src={selectedUser.Picpic || "/default-profile.png"}
                            alt={`${selectedUser.Name}'s profile`}
                            style={profilePicStyle}
                        />
                        <h2 style={titleStyle}>{selectedUser.Name} ({selectedUser.Service})</h2>
                        <p style={addressStyle}>{selectedUser.Address}</p>
                        <p style={telStyle}>Tel: {selectedUser.Tel}</p>
                        <p style={nicknameStyle}>Nickname: {selectedUser.Nickname}</p>
                        {/* เพิ่มรายละเอียดโปรไฟล์อื่น ๆ ตามต้องการ */}
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
};

export default FriendsMap;
