import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CiFaceSmile } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";
import { RiHome8Line, RiEdit2Line } from "react-icons/ri";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { FaRegQuestionCircle, FaRegListAlt } from "react-icons/fa";
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './Firebase';

function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    // State for editing basic information
    const [isEditingBasic, setIsEditingBasic] = useState(false);
    const [formDataBasic, setFormDataBasic] = useState({
        Nickname: '',
        Tel: '',
        Address: '',
        Workplace: ''
    });

    // State for editing other information
    const [isEditingOther, setIsEditingOther] = useState(false);
    const [formDataOther, setFormDataOther] = useState({
        Business: '',
        Detail: ''
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userDoc = doc(db, "users", id);
                const userSnapshot = await getDoc(userDoc);
                if (userSnapshot.exists()) {
                    const userData = userSnapshot.data();
                    setUser({ id: userSnapshot.id, ...userData });

                    // Initialize form data with fetched data
                    setFormDataBasic({
                        Nickname: userData.Nickname || '',
                        Tel: userData.Tel || '',
                        Address: userData.Address || '',
                        Workplace: userData.Workplace || ''
                    });

                    setFormDataOther({
                        Business: userData.Business || '',
                        Detail: userData.Detail || ''
                    });

                    setFormDataNameService({
                        Name: userData.Name || '',
                        Service: userData.Service || '',
                        Position: userData.Position || ''
                    });
                } else {
                    console.error("No such user!");
                }
            } catch (error) {
                console.error("Error fetching user: ", error);
            }
        };

        fetchUser();
    }, [id]);

    // State for editing Name, Service, and Position
    const [isEditingNameService, setIsEditingNameService] = useState(false);
    const [formDataNameService, setFormDataNameService] = useState({
        Name: '',
        Service: '',
        Position: ''
    });
    // Toggle edit mode for Name, Service, and Position
    const handleEditToggleNameService = () => {
        setIsEditingNameService(!isEditingNameService);
    };

    // Handle input change for Name, Service, and Position
    const handleChangeNameService = (e) => {
        const { name, value } = e.target;
        setFormDataNameService({ ...formDataNameService, [name]: value });
    };

    // Toggle edit mode for basic information
    const handleEditToggleBasic = () => {
        setIsEditingBasic(!isEditingBasic);
    };

    // Toggle edit mode for other information
    const handleEditToggleOther = () => {
        setIsEditingOther(!isEditingOther);
    };

    // Handle input change for basic information
    const handleChangeBasic = (e) => {
        const { name, value } = e.target;
        setFormDataBasic({ ...formDataBasic, [name]: value });
    };

    // Handle input change for other information
    const handleChangeOther = (e) => {
        const { name, value } = e.target;
        setFormDataOther({ ...formDataOther, [name]: value });
    };
    // Save updated Name, Service, and Position to Firestore
    const handleSaveNameService = async () => {
        try {
            const userDoc = doc(db, "users", id);
            await updateDoc(userDoc, formDataNameService);
            setUser({ ...user, ...formDataNameService }); // Update local user state
            setIsEditingNameService(false); // Exit edit mode
        } catch (error) {
            console.error("Error updating user: ", error);
        }
    };

    // Save updated basic information to Firestore
    const handleSaveBasic = async () => {
        try {
            const userDoc = doc(db, "users", id);
            await updateDoc(userDoc, formDataBasic);
            setUser({ ...user, ...formDataBasic }); // Update local user state
            setIsEditingBasic(false); // Exit edit mode
        } catch (error) {
            console.error("Error updating user: ", error);
        }
    };

    // Save updated other information to Firestore
    const handleSaveOther = async () => {
        try {
            const userDoc = doc(db, "users", id);
            await updateDoc(userDoc, formDataOther);
            setUser({ ...user, ...formDataOther }); // Update local user state
            setIsEditingOther(false); // Exit edit mode
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

            <div style={{ textAlign: 'center', marginTop: '30px', padding: '0 20px', width: "100%", maxWidth: "1000px" }}>
                <div style={{ justifyContent: "space-between", alignItems: "center" }}>
                    {isEditingNameService ? (
                        <div style={{ width: "100%" }}>
                            <div style={{ margin: '5px 0', textAlign: "right", width: "97%", marginRight: "3rem" }}>
                                <input
                                    name="Service"
                                    value={formDataNameService.Service}
                                    onChange={handleChangeNameService}
                                    style={{ ...inputStyle, textAlign: 'right' }}
                                    placeholder="Service"
                                />
                            </div>
                            <h2 style={{ margin: '5px 0' }}>
                                <input
                                    name="Name"
                                    value={formDataNameService.Name}
                                    onChange={handleChangeNameService}
                                    style={{ ...inputStyle, }}
                                    placeholder="Name"
                                />
                            </h2>
                            <p style={{ margin: '5px 0' }}>
                                <input
                                    name="Position"
                                    value={formDataNameService.Position}
                                    onChange={handleChangeNameService}
                                    style={{ ...inputStyle, }}
                                    placeholder="Position"
                                />
                            </p>
                        </div>
                    ) : (
                        <div style={{ width: "100%" }}>
                            <div style={{ margin: '5px 0', textAlign: "right", width: "97%", marginRight: "3rem" }}>{user.Service}</div>
                            <h2 style={{ margin: '5px 0' }}>{user.Name}</h2>
                            <p style={{ margin: '5px 0' }}>{user.Position}</p>
                        </div>
                    )}
                    <div style={{ display: "flex", gap: "10px", cursor: "pointer", alignItems: 'center', marginLeft: "15px", }} onClick={handleEditToggleNameService}>
                        <RiEdit2Line color="#BB6969" size={20} />
                        <span style={{ color: "#BB6969" }}>
                            {isEditingNameService ? 'ยกเลิก' : 'แก้ไข'}
                        </span>
                    </div>
                </div>

                {/* Save Button for Name, Service, and Position */}
                {isEditingNameService && (
                    <div style={buttonContainerStyle}>
                        <button onClick={handleSaveNameService} style={buttonStyle}>
                            บันทึก
                        </button>
                    </div>
                )}
            </div>



            {/* Basic Information Section */}
            <div style={{
                width: "100%",
                maxWidth: "1000px",
                marginTop: '20px'
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginLeft: "15px",
                    marginRight: "15px",
                    padding: "10px",
                    alignItems: 'center'
                }}>
                    <div>ข้อมูลพื้นฐาน</div>
                    {isEditingBasic && (
                        <div style={buttonContainerStyle}>
                            <button onClick={handleSaveBasic} style={buttonStyle}>
                                บันทึก
                            </button>
                        </div>
                    )}


                    <div style={{
                        display: "flex",
                        gap: "10px",
                        cursor: "pointer",
                        alignItems: 'center'
                    }} onClick={handleEditToggleBasic}>
                        <RiEdit2Line color="#BB6969" size={20} />
                        <span style={{ color: "#BB6969" }}>
                            {isEditingBasic ? 'ยกเลิก' : 'แก้ไข'}
                        </span>
                    </div>
                </div>

                {/* Nickname Field */}
                <div style={fieldContainerStyle}>
                    <div style={labelContainerStyle}>
                        <CiFaceSmile size={20} />
                        <span>ชื่อเล่น</span>
                    </div>
                    {isEditingBasic ? (
                        <input
                            name="Nickname"
                            value={formDataBasic.Nickname}
                            onChange={handleChangeBasic}
                            style={inputStyle}
                        />
                    ) : (
                        <div>{user.Nickname || '-'}</div>
                    )}
                </div>

                {/* Tel Field */}
                <div style={fieldContainerStyle}>
                    <div style={labelContainerStyle}>
                        <BsTelephone size={20} />
                        <span>เบอร์โทร</span>
                    </div>
                    {isEditingBasic ? (
                        <input
                            name="Tel"
                            value={formDataBasic.Tel}
                            onChange={handleChangeBasic}
                            style={inputStyle}
                        />
                    ) : (
                        <div>{user.Tel || '-'}</div>
                    )}
                </div>

                {/* Address Field */}
                <div style={fieldContainerStyle}>
                    <div style={labelContainerStyle}>
                        <RiHome8Line size={20} />
                        <span>ที่อยู่</span>
                    </div>
                    {isEditingBasic ? (
                        <input
                            name="Address"
                            value={formDataBasic.Address}
                            onChange={handleChangeBasic}
                            style={inputStyle}
                        />
                    ) : (
                        <div>{user.Address || '-'}</div>
                    )}
                </div>

                {/* Workplace Field */}
                <div style={fieldContainerStyle}>
                    <div style={labelContainerStyle}>
                        <MdOutlineHomeRepairService size={20} />
                        <span>สถานที่ทำงาน</span>
                    </div>
                    {isEditingBasic ? (
                        <input
                            name="Workplace"
                            value={formDataBasic.Workplace}
                            onChange={handleChangeBasic}
                            style={inputStyle}
                        />
                    ) : (
                        <div>{user.Workplace || '-'}</div>
                    )}
                </div>

                {/* Save Button for Basic Info */}

            </div>

            {/* Other Information Section */}
            <div style={{
                width: "100%",
                maxWidth: "1000px",
                marginTop: '20px'
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginLeft: "15px",
                    marginRight: "15px",
                    padding: "10px",
                    alignItems: 'center'
                }}>
                    <div>ข้อมูลอื่นๆ</div>


                    {isEditingOther && (
                        <div style={buttonContainerStyle}>
                            <button onClick={handleSaveOther} style={buttonStyle}>
                                บันทึก
                            </button>
                        </div>
                    )}




                    <div style={{
                        display: "flex",
                        gap: "10px",
                        cursor: "pointer",
                        alignItems: 'center'
                    }} onClick={handleEditToggleOther}>
                        <RiEdit2Line color="#BB6969" size={20} />
                        <span style={{ color: "#BB6969" }}>
                            {isEditingOther ? 'ยกเลิก' : 'แก้ไข'}
                        </span>
                    </div>
                </div>

                {/* Business Field */}
                <div style={fieldContainerStyle}>
                    <div style={labelContainerStyle}>
                        <FaRegQuestionCircle size={20} />
                        <span>ธุรกิจส่วนตัว</span>
                    </div>
                    {isEditingOther ? (
                        <input
                            name="Business"
                            value={formDataOther.Business}
                            onChange={handleChangeOther}
                            style={inputStyle}
                        />
                    ) : (
                        <div>{user.Business || '-'}</div>
                    )}
                </div>

                {/* Detail Field */}
                <div style={fieldContainerStyle}>
                    <div style={labelContainerStyle}>
                        <FaRegListAlt size={20} />
                        <span>รายละเอียด</span>
                    </div>
                    {isEditingOther ? (
                        <input
                            name="Detail"
                            value={formDataOther.Detail}
                            onChange={handleChangeOther}
                            style={inputStyle}
                        />
                    ) : (
                        <div>{user.Detail || '-'}</div>
                    )}
                </div>

                {/* Save Button for Other Info */}
            </div>
        </div>
    );
}

/* Styles */
const fieldContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#831818",
    margin: "5px 15px",
    padding: "10px",
    borderRadius: "10px",
    alignItems: "center"
};

const labelContainerStyle = {
    display: "flex",
    gap: "10px",
    alignItems: "center"
};

const inputStyle = {
    backgroundColor: '#831818',
    borderRadius: '5px',
    padding: '5px',
    border: 'none',
    width: '60%',
    fontSize: '1rem',
    color:'#ffffff',
    textAlign:'right'
};

const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
    
};

const buttonStyle = {
    backgroundColor: '#BB6969',
    color: 'white',
    borderRadius: '5px',
    padding: '5px 5px',
    cursor: 'pointer',
    border: 'none',
    fontSize: '1rem'
};

export default Profile;