import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiFaceSmile } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";
import { RiHome8Line, RiEdit2Line } from "react-icons/ri";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { FaRegQuestionCircle, FaRegListAlt } from "react-icons/fa";
import { getDocs, query, where, collection, updateDoc } from 'firebase/firestore';
import { db } from './Firebase';

function Profile() {
    const [user, setUser] = useState(null);
    const [showEditButton, setShowEditButton] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        Nickname: '',
        Tel: '',
        Address: '',
        Workplace: '',
        Business: '',
        Detail: '',
        Name: '',
        Service: '',
        Position: ''
    });

    useEffect(() => {
        const fetchUserByLineId = async () => {
            try {
                // Get the LineId from the LIFF profile
                const profile = await window.liff.getProfile();
                const currentLineId = profile?.userId;

                // Query Firestore for a user document where LineId matches the current user's LineId
                const q = query(collection(db, "users"), where("LineId", "==", currentLineId));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    // Assuming there is only one document per LineId
                    const userDoc = querySnapshot.docs[0];
                    const userData = userDoc.data();

                    console.log('userData', userData);
                    setUser({ id: userDoc.id, ...userData });

                    // Show the edit button if the LineId matches the user's profile
                    setShowEditButton(true);

                    // Initialize form data with fetched data
                    setFormData({
                        Nickname: userData.Nickname || '',
                        Tel: userData.Tel || '',
                        Address: userData.Address || '',
                        Workplace: userData.Workplace || '',
                        Business: userData.Business || '',
                        Detail: userData.Detail || '',
                        Name: userData.Name || '',
                        Service: userData.Service || '',
                        Position: userData.Position || ''
                    });
                } else {
                    console.error("No such user with this LineId!");
                }
            } catch (error) {
                console.error("Error fetching user by LineId: ", error);
            }
        };

        fetchUserByLineId();
    }, []);

    // Toggle edit mode for all sections
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    // Handle input change for all fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Save all updated information to Firestore
    const handleSave = async () => {
        try {
            const userDoc = doc(db, "users", user.id);
            await updateDoc(userDoc, formData);
            setUser({ ...user, ...formData }); // Update local user state
            setIsEditing(false); // Exit edit mode
        } catch (error) {
            console.error("Error updating user: ", error);
        }
    };

    if (!user) {
        return (
            <div style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                backgroundColor: "#510808",
                fontFamily: "'Kanit', sans-serif",
                fontSize: "1.5rem"
            }}>
                Loading...
            </div>
        );
    }

    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#510808",
            display: 'flex',
            flexDirection: 'column',
            color: 'white',
            fontFamily: "'Kanit', sans-serif",
            overflowY: 'auto',
            alignItems: "center",
            paddingBottom: '20px'
        }}>
            {/* Header Section */}
            <div style={{
                width: "100%",
                height: "35vh",
                backgroundImage: 'url("https://previews.123rf.com/images/rawpixel/rawpixel1705/rawpixel170502548/77394524-beauty-nature-outdoors-outside-sunlight.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
            }}>
                <div style={{
                    position: 'absolute',
                    bottom: '-50px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '5px solid white',
                    backgroundColor: 'white'
                }}>
                    <img src={user.Picpic} alt="Profile" style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }} />
                </div>
            </div>


            <div style={{ textAlign: 'center', marginTop: '30px', width: "100%", maxWidth: "1000px" }}>
                <div style={{ justifyContent: "space-between", alignItems: "center" }}>
                    {isEditing ? (
                        <div style={{ width: "100%" }}>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}>
                                <div style={{ display: "flex", gap: "10px", cursor: "pointer", alignItems: 'center', marginLeft: "15px" }} onClick={handleEditToggle}>
                                    {!isEditing && <RiEdit2Line color="#BB6969" size={20} />}
                                    <span style={{ color: "#BB6969" }}>
                                        {isEditing ? 'ยกเลิก' : 'แก้ไข'}
                                    </span>
                                    {isEditing && (
                                        <div style={buttonContainerStyle}>
                                            <button onClick={handleSave} style={buttonStyle}>
                                                บันทึก
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div style={{ margin: '5px 10px', textAlign: "right", width: "97%", marginRight: "3rem" }}>
                                    <input
                                        name="Service"
                                        value={formData.Service}
                                        onChange={handleChange}
                                        style={{ font: 'inherit', backgroundColor: '#831818', borderRadius: '7px', padding: '5px', border: 'none', width: '30%', fontSize: '1rem', color: '#ffffff', textAlign: 'center', outline: 'none' }}
                                        placeholder="Service"
                                    />
                                </div>
                            </div>

                            <h2 style={{ margin: '5px 0' }}>
                                <input
                                    name="Name"
                                    value={formData.Name}
                                    onChange={handleChange}
                                    style={{ font: 'inherit', backgroundColor: '#831818', borderRadius: '7px', padding: '5px', border: 'none', width: '80%', fontSize: '1rem', color: '#ffffff', textAlign: 'center', outline: 'none' }}
                                    placeholder="Name"
                                />
                            </h2>
                            <p style={{ margin: '5px 0' }}>
                                <input
                                    name="Position"
                                    value={formData.Position}
                                    onChange={handleChange}
                                    style={{ font: 'inherit', backgroundColor: '#831818', borderRadius: '7px', padding: '5px', border: 'none', width: '80%', fontSize: '1rem', color: '#ffffff', textAlign: 'center', outline: 'none' }}

                                    placeholder="Position"
                                />
                            </p>
                        </div>
                    ) : (
                        <div style={{ width: "100%" }}>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}>
                                {showEditButton && <div style={{ display: "flex", gap: "10px", cursor: "pointer", alignItems: 'center', marginLeft: "15px" }} onClick={handleEditToggle}>
                                    <RiEdit2Line color="#BB6969" size={20} />
                                    <span style={{ color: "#BB6969" }}>
                                        {isEditing ? 'ยกเลิก' : 'แก้ไข'}
                                    </span>
                                    {isEditing && (
                                        <div style={buttonContainerStyle}>
                                            <button onClick={handleSave} style={buttonStyle}>
                                                บันทึก
                                            </button>
                                        </div>
                                    )}
                                </div>}
                                <div style={{ margin: '5px 20px', textAlign: "right", width: "97%", marginRight: "3rem" }}>{user.Service}</div>

                            </div>

                            <h2 style={{ margin: '5px 0' }}>{user.Name}</h2>
                            <p style={{ margin: '5px 0' }}>{user.Position}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Add more sections as per your previous code */}
        </div>
    );
}

/* Styles */
const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center"
};

const buttonStyle = {
    backgroundColor: '#BB6969',
    color: 'white',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
    border: 'none',
    fontSize: '1rem'
};

export default Profile;
