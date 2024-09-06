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
        const fetchUser = async () => {
            try {
                const userDoc = doc(db, "users", id);
                const userSnapshot = await getDoc(userDoc);
                if (userSnapshot.exists()) {
                    const userData = userSnapshot.data();
                    setUser({ id: userSnapshot.id, ...userData });
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
            setUser({ ...user, ...formData });
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating user: ", error);
        }
    };

    if (!user) {
        return (
            <div style={loadingStyle}>
                Loading...
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            {/* Header Section */}
            <div style={headerStyle}>
                <div style={profilePicContainerStyle}>
                    <img src={user.Picpic} alt="Profile" style={profilePicStyle} />
                </div>
            </div>

            <div style={infoContainerStyle}>
                <div style={infoWrapperStyle}>
                    {isEditing ? (
                        <div style={formStyle}>
                            <div style={inputContainerStyle}>
                                <input
                                    name="Service"
                                    value={formData.Service}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    placeholder="Service"
                                />
                            </div>

                            <h2 style={inputHeadingStyle}>
                                <input
                                    name="Name"
                                    value={formData.Name}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    placeholder="Name"
                                />
                            </h2>
                            <p style={inputParagraphStyle}>
                                <input
                                    name="Position"
                                    value={formData.Position}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    placeholder="Position"
                                />
                            </p>
                        </div>
                    ) : (
                        <div style={infoTextStyle}>
                            <div style={infoDetailStyle}>{user.Service}</div>
                            <h2 style={infoHeadingStyle}>{user.Name}</h2>
                            <p style={infoParagraphStyle}>{user.Position}</p>
                        </div>
                    )}
                    <div style={editButtonContainerStyle} onClick={handleEditToggle}>
                        <RiEdit2Line color="#BB6969" size={20} />
                        <span style={editButtonTextStyle}>
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
                </div>
            </div>

            {/* Basic Information Section */}
            <div style={sectionStyle}>
                <div style={sectionHeaderStyle}>ข้อมูลพื้นฐาน</div>
                {renderField('Nickname', CiFaceSmile, 'ชื่อเล่น')}
                {renderField('Tel', BsTelephone, 'เบอร์โทร')}
                {renderField('Address', RiHome8Line, 'ที่อยู่')}
                {renderField('Workplace', MdOutlineHomeRepairService, 'สถานที่ทำงาน')}
            </div>

            {/* Other Information Section */}
            <div style={sectionStyle}>
                <div style={sectionHeaderStyle}>ข้อมูลอื่นๆ</div>
                {renderField('Business', FaRegQuestionCircle, 'ธุรกิจส่วนตัว')}
                {renderField('Detail', FaRegListAlt, 'รายละเอียด')}
            </div>
        </div>
    );

    function renderField(name, Icon, label) {
        return (
            <div style={fieldContainerStyle}>
                <div style={labelContainerStyle}>
                    <Icon size={20} />
                    <span>{label}</span>
                </div>
                {isEditing ? (
                    <input
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                ) : (
                    <div>{user[name] || '-'}</div>
                )}
            </div>
        );
    }
}

/* Styles */
const containerStyle = {
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
};

const loadingStyle = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    backgroundColor: "#510808",
    fontFamily: "'Kanit', sans-serif",
    fontSize: "1.5rem"
};

const headerStyle = {
    width: "100%",
    height: "35vh",
    backgroundImage: 'url("https://previews.123rf.com/images/rawpixel/rawpixel1705/rawpixel170502548/77394524-beauty-nature-outdoors-outside-sunlight.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative'
};

const profilePicContainerStyle = {
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
};

const profilePicStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
};

const infoContainerStyle = {
    textAlign: 'center',
    marginTop: '30px',
    width: "100%",
    maxWidth: "1000px"
};

const infoWrapperStyle = {
    justifyContent: "space-between",
    alignItems: "center"
};

const formStyle = {
    width: "100%"
};

const inputContainerStyle = {
    margin: '5px 0',
    textAlign: "right",
    width: "97%",
    marginRight: "3rem"
};

const inputStyle = {
    backgroundColor: '#831818',
    borderRadius: '5px',
    padding: '5px',
    border: 'none',
    width: '50%',
    fontSize: '1rem',
    color: '#ffffff',
    textAlign: 'right'
};

const inputHeadingStyle = {
    margin: '5px 0'
};

const inputParagraphStyle = {
    margin: '5px 0'
};

const infoTextStyle = {
    width: "100%"
};

const infoDetailStyle = {
    margin: '5px 0',
    textAlign: "right",
    width: "97%",
    marginRight: "3rem"
};

const infoHeadingStyle = {
    margin: '5px 0'
};

const infoParagraphStyle = {
    margin: '5px 0'
};

const editButtonContainerStyle = {
    display: "flex",
    gap: "10px",
    cursor: "pointer",
    alignItems: 'center',
    marginLeft: "15px"
};

const editButtonTextStyle = {
    color: "#BB6969"
};

const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center"
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

const sectionStyle = {
    width: "100%",
    maxWidth: "1000px",
    marginTop: '20px'
};

const sectionHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: "15px",
    marginRight: "15px",
    padding: "10px",
    alignItems: 'center'
};

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

export default Profile;
