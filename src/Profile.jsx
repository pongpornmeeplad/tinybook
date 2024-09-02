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

    // State for editing Name, Service, and Position
    const [isEditingNameService, setIsEditingNameService] = useState(false);
    const [formDataNameService, setFormDataNameService] = useState({
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
            <div style={loadingStyle}>
                Loading...
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            {/* Header Section */}
            <div style={headerStyle}>
                <div style={profileImageContainerStyle}>
                    <img src={user.Picpic} alt="Profile" style={profileImageStyle} />
                </div>
            </div>

            <div style={contentContainerStyle}>
                <div style={{ ...sectionStyle, ...{ textAlign: 'center' } }}>
                    {isEditingNameService ? (
                        <div style={{ width: "100%" }}>
                            <div style={editInputContainerStyle}>
                                <input
                                    name="Service"
                                    value={formDataNameService.Service}
                                    onChange={handleChangeNameService}
                                    style={{ ...inputStyle, textAlign: 'right' }}
                                    placeholder="Service"
                                />
                            </div>
                            <h2 style={editInputContainerStyle}>
                                <input
                                    name="Name"
                                    value={formDataNameService.Name}
                                    onChange={handleChangeNameService}
                                    style={inputStyle}
                                    placeholder="Name"
                                />
                            </h2>
                            <p style={editInputContainerStyle}>
                                <input
                                    name="Position"
                                    value={formDataNameService.Position}
                                    onChange={handleChangeNameService}
                                    style={inputStyle}
                                    placeholder="Position"
                                />
                            </p>
                        </div>
                    ) : (
                        <div style={{ width: "100%" }}>
                            <div style={infoTextRightStyle}>{user.Service}</div>
                            <h2>{user.Name}</h2>
                            <p>{user.Position}</p>
                        </div>
                    )}
                    <div style={editToggleStyle} onClick={handleEditToggleNameService}>
                        <RiEdit2Line color="#BB6969" size={20} />
                        <span style={editTextStyle}>
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
            <div style={sectionContainerStyle}>
                <div style={sectionHeaderStyle}>
                    <div>ข้อมูลพื้นฐาน</div>
                    <div style={editToggleStyle} onClick={handleEditToggleBasic}>
                        <RiEdit2Line color="#BB6969" size={20} />
                        <span style={editTextStyle}>
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
                        <span>ที่ทำงาน</span>
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

                {/* Save Button for Basic Information */}
                {isEditingBasic && (
                    <div style={buttonContainerStyle}>
                        <button onClick={handleSaveBasic} style={buttonStyle}>
                            บันทึก
                        </button>
                    </div>
                )}
            </div>

            {/* Other Information Section */}
            <div style={sectionContainerStyle}>
                <div style={sectionHeaderStyle}>
                    <div>ข้อมูลอื่น ๆ</div>
                    <div style={editToggleStyle} onClick={handleEditToggleOther}>
                        <RiEdit2Line color="#BB6969" size={20} />
                        <span style={editTextStyle}>
                            {isEditingOther ? 'ยกเลิก' : 'แก้ไข'}
                        </span>
                    </div>
                </div>

                {/* Business Field */}
                <div style={fieldContainerStyle}>
                    <div style={labelContainerStyle}>
                        <FaRegQuestionCircle size={20} />
                        <span>กิจการ</span>
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

                {/* Save Button for Other Information */}
                {isEditingOther && (
                    <div style={buttonContainerStyle}>
                        <button onClick={handleSaveOther} style={buttonStyle}>
                            บันทึก
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

// Styles
const containerStyle = {
    padding: '20px',
    fontFamily: "'Kanit', sans-serif",
};

const headerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
};

const profileImageContainerStyle = {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    overflow: 'hidden',
};

const profileImageStyle = {
    width: '100%',
    height: 'auto',
};

const contentContainerStyle = {
    textAlign: 'center',
    marginBottom: '30px',
};

const sectionContainerStyle = {
    marginBottom: '20px',
};

const sectionHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
};

const sectionStyle = {
    marginBottom: '20px',
};

const fieldContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
};

const labelContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
};

const inputStyle = {
    width: 'calc(100% - 50px)',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontFamily: "'Kanit', sans-serif",
};

const buttonContainerStyle = {
    textAlign: 'center',
    marginTop: '10px',
};

const buttonStyle = {
    backgroundColor: '#BB6969',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontFamily: "'Kanit', sans-serif",
};

const editToggleStyle = {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
};

const editTextStyle = {
    fontSize: '14px',
    color: '#BB6969',
    fontFamily: "'Kanit', sans-serif",
};

const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '24px',
    fontFamily: "'Kanit', sans-serif",
    color: '#BB6969',
};

const infoTextRightStyle = {
    fontSize: '16px',
    textAlign: 'right',
    marginBottom: '5px',
};

const editInputContainerStyle = {
    marginBottom: '10px',
};

export default Profile;
