import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CiFaceSmile } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";
import { RiHome8Line, RiEdit2Line } from "react-icons/ri"; // Imported RiEdit2Line
import { MdOutlineHomeRepairService } from "react-icons/md";
import { FaRegQuestionCircle, FaRegListAlt } from "react-icons/fa";
import { getDoc, doc, updateDoc } from 'firebase/firestore'; // Changed to getDoc and doc
import { db } from './Firebase';

function Profile() {
    const { id } = useParams();  // Changed lineId to id
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // State for edit mode
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userDoc = doc(db, "users", id);
                const userSnapshot = await getDoc(userDoc);
                if (userSnapshot.exists()) {
                    setUser({ id: userSnapshot.id, ...userSnapshot.data() });
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

                <div style={{
                    textAlign: 'center',
                    marginTop: '35px',
                    padding: '0 20px',
                    width: "100%",
                    maxWidth: "1000px",
                    
                }}>
                    <div style={{ margin: '5px 0', textAlign: "right", width: "97%", maxWidth: "1000px", marginRight: "3rem" }}>{user.Service}</div>
                    <h2 style={{ margin: '5px 0' }}>{user.Name}</h2>
                    <p style={{ margin: '5px 0' }}>{user.Position}</p>
                </div>

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
                            cursor: "pointer" // Added cursor pointer for better UX
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
                            <div style={{ marginTop: "3px" }}><RiHome8Line /></div>
                            <div>ที่อยู่</div>
                        </div>
                        {isEditing ? (
                        <input
                            name="Address"
                            value={formData.Address}
                            onChange={handleChange}
                            style={{ backgroundColor: '#EAEAEA', borderRadius: '9px', padding: '5px' }}
                        />
                    ) : (
                        <div>{user.Address}</div>
                    )}
                    </div>

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
                            <div style={{ marginTop: "3px" }}><MdOutlineHomeRepairService /></div>
                            <div>สถานที่ทำงาน</div>
                        </div>
                        {isEditing ? (
                        <input
                            name="Workplace"
                            value={formData.Workplace}
                            onChange={handleChange}
                            style={{ backgroundColor: '#EAEAEA', borderRadius: '9px', padding: '5px' }}
                        />
                    ) : (
                        <div>{user.Workplace}</div>
                    )}
                    </div>
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
                    
                     <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    //marginBottom:"10px"
                    marginLeft: "15px",
                    marginRight: "15px",
                    padding: "10px"
                }}>
                    <div>ข้อมูลอื่นๆ</div>
                    <div style={{
                        display: "flex",
                        gap: "10px"
                    }}>

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
                        <div style={{
                            marginTop: "3px"
                        }}><FaRegQuestionCircle /></div>
                        <div>ธุรกิจส่วนตัว</div>
                    </div>
                    {isEditing ? (
                        <input
                            name="Workplace"
                            value={formData.Business}
                            onChange={handleChange}
                            style={{ backgroundColor: '#EAEAEA', borderRadius: '9px', padding: '5px' }}
                        />
                    ) : (
                        <div>{user.Business}</div>
                    )}
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: "#831818",
                    marginBottom: "5px",
                    marginLeft: "15px",
                    marginRight: "15px",
                    borderRadius: "0px 0px 14px 14px",
                    padding: "10px"

                }}>
                    <div style={{
                        display: "flex",
                        gap: "10px"
                    }}>
                        <div style={{
                            marginTop: "3px"
                        }}><FaRegListAlt /></div>
                        <div>รายละเอียด</div>
                    </div>
                    {isEditing ? (
                        <input
                            name="Detail"
                            value={formData.Detail}
                            onChange={handleChange}
                            style={{ backgroundColor: '#EAEAEA', borderRadius: '9px', padding: '5px' }}
                        />
                    ) : (
                        <div>{user.Detail}</div>
                    )}
                </div>

                </div>
            
        </div>
    );
}

export default Profile;