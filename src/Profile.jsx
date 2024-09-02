import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CiFaceSmile } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";
import { RiHome8Line, RiEdit2Line } from "react-icons/ri";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { FaRegQuestionCircle, FaRegListAlt } from "react-icons/fa";
import { getDoc, doc, updateDoc } from 'firebase/firestore'; // Added updateDoc
import { db } from './Firebase';

function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // State for edit mode
    const [formData, setFormData] = useState({}); // State for form data

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userDoc = doc(db, "users", id);
                const userSnapshot = await getDoc(userDoc);
                if (userSnapshot.exists()) {
                    const data = { id: userSnapshot.id, ...userSnapshot.data() };
                    setUser(data);
                    setFormData(data); // Initialize form data with fetched data
                } else {
                    console.error("No such user!");
                }
            } catch (error) {
                console.error("Error fetching user: ", error);
            }
        };

        fetchUser();
    }, [id]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        try {
            const userDoc = doc(db, "users", id);
            await updateDoc(userDoc, formData);
            setUser(formData); // Update user data with the new form data
            setIsEditing(false); // Exit edit mode
        } catch (error) {
            console.error("Error updating user: ", error);
        }
    };

    if (!user) {
        return <div style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            backgroundColor: "#510808",
            fontFamily: "'Kanit', sans-serif",
            fontSize: "1.5rem"
        }}>Loading...</div>;
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
            overflow: 'hidden',
            position: 'relative',
            alignItems: "center",
        }}>
            {/* Existing Profile Header Code */}

            <div style={{
                width: "100%",
                maxWidth: "1000px"
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginLeft: "15px",
                    marginRight: "15px",
                    padding: "10px"
                }}>
                    <div>ข้อมูลพื้นฐาน</div>
                    <div style={{
                        display: "flex",
                        gap: "10px",
                        cursor: "pointer"
                    }} onClick={handleEditToggle}>
                        <div style={{
                            color: "#BB6969"
                        }}><RiEdit2Line /></div>
                        <div style={{
                            color: "#BB6969"
                        }}>แก้ไข</div>
                    </div>
                </div>

                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: "#831818",
                    marginBottom: "5px",
                    marginLeft: "15px",
                    marginRight: "15px",
                    borderRadius: "14px 14px 0px 0px",
                    padding: "10px"
                }}>
                    <div style={{
                        display: "flex",
                        gap: "10px"
                    }}>
                        <div style={{ marginTop: "3px" }}><CiFaceSmile /></div>
                        <div>ชื่อเล่น</div>
                    </div>
                    {isEditing ? (
                        <input
                            name="Nickname"
                            value={formData.Nickname}
                            onChange={handleChange}
                            style={{ backgroundColor: '#EAEAEA', borderRadius: '9px', padding: '5px' }}
                        />
                    ) : (
                        <div>{user.Nickname}</div>
                    )}
                </div>

                {/* Repeat for other fields like เบอร์โทร, ที่อยู่, etc. */}
                
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: "#831818",
                    marginBottom: "5px",
                    marginLeft: "15px",
                    marginRight: "15px",
                    padding: "10px"
                }}>
                    <div style={{
                        display: "flex",
                        gap: "10px"
                    }}>
                        <div style={{ marginTop: "3px" }}><BsTelephone /></div>
                        <div>เบอร์โทร</div>
                    </div>
                    {isEditing ? (
                        <input
                            name="Tel"
                            value={formData.Tel}
                            onChange={handleChange}
                            style={{ backgroundColor: '#EAEAEA', borderRadius: '9px', padding: '5px' }}
                        />
                    ) : (
                        <div>{user.Tel}</div>
                    )}
                </div>

                {/* Add a Save button */}
                {isEditing && (
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px"
                    }}>
                        <button
                            onClick={handleSave}
                            style={{
                                backgroundColor: '#BB6969',
                                color: 'white',
                                borderRadius: '9px',
                                padding: '10px 20px',
                                cursor: 'pointer'
                            }}
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
