// Profile.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CiFaceSmile } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";
import { RiHome8Line, RiEdit2Line } from "react-icons/ri";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { FaRegQuestionCircle, FaRegListAlt, FaChevronLeft } from "react-icons/fa";
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './Firebase';
import CombinedLocationSearch from './CombinedLocationSearch';
import { useNavigate } from 'react-router-dom';

const firstColors = {
  'ทบ.': '#8B0000',
  'ทร.': '#003aff',
  'ทอ.': '#00c5ff',
  'ตร.': '#510808'
};

const secColors = {
  'ทบ.': '#FF0000',
  'ทร.': '#0093ff',
  'ทอ.': '#00ecff',
  'ตร.': '#831818'
};

const thirdColors = {
  'ทบ.': '#FFA07A',
  'ทร.': '#00c5ff',
  'ทอ.': '#48fff6',
  'ตร.': '#bb6969'
};
const serviceImg = {
  'ทบ.': 'https://f.ptcdn.info/400/063/000/ppqeh86vhn39NbDw0Lw-o.jpg',
  'ทร.': 'https://cdn.pixabay.com/photo/2024/03/29/17/54/ship-8663314_960_720.jpg',
  'ทอ.': 'https://png.pngtree.com/thumb_back/fh260/background/20230424/pngtree-fighter-jet-being-blown-away-by-the-ocean-waves-image_2507862.jpg',
  'ตร.': 'https://file.chobrod.com/2018/06/23/nkNHHn8K/1-dodge-charger-purs-896b.jpg'
};
function Profile() {
  const { id } = useParams();
  const navigate = useNavigate()
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
    Position: '',
    Latlong: null,
  });

  // Set the background color dynamically based on the selected Service
  const selectedService = formData.Service || 'ทบ.'; // Default to 'ทบ.' if not set
  const selectedFirstColor = firstColors[selectedService];
  const selectedSecColor = secColors[selectedService];
  const selectedThirdColor = thirdColors[selectedService];
  const selectedserviceImg = serviceImg[selectedService];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDoc = doc(db, "users", id);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUser({ id: userSnapshot.id, ...userData });

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
            Position: userData.Position || '',
            Latlong: userData.Latlong || null,
          });

          // Check if the current user can edit
          const profilelineId = userData.LineId;
          const profile = await window.liff.getProfile();
          const currentLineId = profile?.userId;
          if (profilelineId === currentLineId) {
            setShowEditButton(true);
          } else {
            setShowEditButton(false);
          }
        } else {
          console.error("No such user!");
        }
      } catch (error) {
        console.error("Error fetching user: ", error);
      }
    };

    fetchUser();
  }, [id]);

  // Toggle edit mode for all sections
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Handle input change for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle location change from CombinedLocationSearch
  const handleLocationChange = (locationData) => {
    setFormData({
      ...formData,
      Workplace: locationData.workplace,
      // Address is no longer updated here
      Latlong: locationData.latlong,
    });
  };

  // Save all updated information to Firestore
  const handleSave = async () => {
    try {
      const userDoc = doc(db, "users", id);
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
        backgroundColor: selectedFirstColor,
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
      minHeight: "100vh",
      backgroundColor: selectedFirstColor,
      display: 'flex',
      flexDirection: 'column',
      color: 'white',
      fontFamily: "'Kanit', sans-serif",
      overflowY: 'auto',
      alignItems: "center",
      paddingBottom: '20px'
    }}>
      {/* Header Section */}
      <div 
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    cursor: 'pointer',
                    padding: '5px',
                    zIndex: 9999 
                }} 
                onClick={() => navigate('/Album')}
            >
                <FaChevronLeft size={25} color="#FFFFFF" />
            </div>
      <div style={{
        width: "100%",
        height: "35vh",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(${selectedserviceImg})`,
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
                  <span style={{ color: selectedThirdColor }}>
                    {isEditing ? 'ยกเลิก' : 'แก้ไข'}
                  </span>
                  {isEditing && (
                    <div style={buttonContainerStyle}>
                      <button onClick={handleSave} style={{
                        backgroundColor: selectedThirdColor,
                        color: 'white',
                        borderRadius: '5px',
                        padding: '5px 10px',
                        cursor: 'pointer',
                        border: 'none',
                        fontSize: '1rem'
                      }}>
                        บันทึก
                      </button>
                    </div>
                  )}
                </div>
                <div style={{ margin: '5px 10px', textAlign: "right", width: "97%", marginRight: "3rem" }}>
                  <select
                    name="Service"
                    value={formData.Service}
                    onChange={handleChange}
                    style={{
                      font: 'inherit',
                      backgroundColor: selectedSecColor,
                      borderRadius: '7px',
                      padding: '5px',
                      border: 'none',
                      width: '30%',
                      fontSize: '1rem',
                      color: '#ffffff',
                      textAlign: 'center',
                      outline: 'none'
                    }}
                  >
                    <option value="ทบ.">ทบ.</option>
                    <option value="ทร.">ทร.</option>
                    <option value="ทอ.">ทอ.</option>
                    <option value="ตร.">ตร.</option>
                  </select>
                </div>
              </div>

              <h2 style={{ margin: '5px 0' }}>
                <input
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  style={{
                    font: 'inherit',
                    backgroundColor: selectedSecColor,
                    borderRadius: '7px',
                    padding: '5px',
                    border: 'none',
                    width: '80%',
                    fontSize: '1rem',
                    color: '#ffffff',
                    textAlign: 'center',
                    outline: 'none'
                  }}
                  placeholder="Name"
                />
              </h2>
              <p style={{ margin: '5px 0' }}>
                <input
                  name="Position"
                  value={formData.Position}
                  onChange={handleChange}
                  style={{
                    font: 'inherit',
                    backgroundColor: selectedSecColor,
                    borderRadius: '7px',
                    padding: '5px',
                    border: 'none',
                    width: '80%',
                    fontSize: '1rem',
                    color: '#ffffff',
                    textAlign: 'center',
                    outline: 'none'
                  }}
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
                {showEditButton && (
                  <div style={{ display: "flex", gap: "10px", cursor: "pointer", alignItems: 'center', marginLeft: "15px" }} onClick={handleEditToggle}>
                    <RiEdit2Line color={selectedThirdColor} size={20} />
                    <span style={{ color: selectedThirdColor }}>
                      {isEditing ? 'ยกเลิก' : 'แก้ไข'}
                    </span>
                  </div>
                )}
                <div style={{ margin: '5px 20px', textAlign: "right", width: "97%", marginRight: "3rem" }}>{user.Service}</div>
              </div>

              <h2 style={{ margin: '5px 0' }}>{user.Name}</h2>
              <p style={{ margin: '5px 0' }}>{user.Position}</p>
            </div>
          )}
        </div>
      </div>

      {/* Basic Information Section */}
      <div style={{ width: "100%", maxWidth: "1000px", marginTop: '20px' }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "15px", marginRight: "15px", padding: "10px", alignItems: 'center' }}>
          <div>ข้อมูลพื้นฐาน</div>
        </div>

        {/* Nickname Field */}
        <div style={{
          backgroundColor: selectedSecColor,
          display: "flex",
          justifyContent: "space-between",
          margin: "5px 15px",
          padding: "10px",
          borderRadius: "10px",
          alignItems: "center"
        }} >
          <div style={labelContainerStyle}>
            <CiFaceSmile size={20} />
            <span>ชื่อเล่น</span>
          </div>
          {isEditing ? (
            <input
              name="Nickname"
              value={formData.Nickname}
              onChange={handleChange}
              style={{
                backgroundColor: selectedSecColor,
                border: 'none',
                width: '50%',
                fontSize: '1rem',
                color: 'white',
                textAlign: 'right',
                outline: 'none',
                font: 'inherit'
              }}
            />
          ) : (
            <div>{user.Nickname || '-'}</div>
          )}
        </div>

        {/* Tel Field */}
     {/* Tel Field */}
<div style={{
  backgroundColor: selectedSecColor,
  display: "flex",
  justifyContent: "space-between",
  margin: "5px 15px",
  padding: "10px",
  borderRadius: "10px",
  alignItems: "center"
}} >
  <div style={labelContainerStyle}>
    <BsTelephone size={20} />
    <span>เบอร์โทร</span>
  </div>
  {isEditing ? (
    <input
      name="Tel"
      value={formData.Tel}
      onChange={handleChange}
      style={{
        backgroundColor: selectedSecColor,
        border: 'none',
        width: '50%',
        fontSize: '1rem',
        color: 'white',
        textAlign: 'right',
        outline: 'none',
        font: 'inherit'
      }}
      type="tel" // Use type="tel" for numeric keyboard on mobile
      pattern="[0-9]*"
    />
  ) : (
    <div>
      {user.Tel ? (
        <a href={`tel:${user.Tel}`} style={{ color: '#ffffff', textDecoration: 'none' }}>
          {user.Tel}
        </a>
      ) : (
        '-'
      )}
    </div>
  )}
</div>


        {/* Address Field */}
        <div style={{
          backgroundColor: selectedSecColor,
          display: "flex",
          justifyContent: "space-between",
          margin: "5px 15px",
          padding: "10px",
          borderRadius: "10px",
          alignItems: "center"
        }} >
          <div style={labelContainerStyle}>
            <RiHome8Line size={20} />
            <span>ที่อยู่</span>
          </div>
          {isEditing ? (
            <input
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              style={{
                backgroundColor: selectedSecColor,
                border: 'none',
                width: '50%',
                fontSize: '1rem',
                color: 'white',
                textAlign: 'right',
                outline: 'none',
                font: 'inherit'
              }}
            />
          ) : (
            <div>{user.Address || '-'}</div>
          )}
        </div>

        {/* Workplace Field */}
        <div
          style={{
            backgroundColor: selectedSecColor,
            margin: "5px 15px",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <div style={labelContainerStyle}>
            <MdOutlineHomeRepairService size={20} />
            <span>สถานที่ทำงาน</span>
          </div>
          <div style={{ marginTop: "10px", color: "white" }}>
         
            <CombinedLocationSearch
              onLocationChange={handleLocationChange}
              initialLatlong={isEditing ? formData?.Latlong : user?.Latlong}
              initialWorkplace={isEditing ? formData?.Workplace : user?.Workplace}
              isEditable={isEditing}
            />
          </div>
        </div>

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
        </div>

        {/* Business Field */}
        <div style={{
          backgroundColor: selectedSecColor,
          display: "flex",
          justifyContent: "space-between",
          margin: "5px 15px",
          padding: "10px",
          borderRadius: "10px",
          alignItems: "center"
        }} >
          <div style={labelContainerStyle}>
            <FaRegQuestionCircle size={20} />
            <span>ธุรกิจส่วนตัว</span>
          </div>
          {isEditing ? (
            <input
              name="Business"
              value={formData.Business}
              onChange={handleChange}
              style={{
                backgroundColor: selectedSecColor,
                border: 'none',
                width: '50%',
                fontSize: '1rem',
                color: 'white',
                textAlign: 'right',
                outline: 'none',
                font: 'inherit'
              }}
            />
          ) : (
            <div>{user.Business || '-'}</div>
          )}
        </div>

        {/* Detail Field */}
        <div style={{
          backgroundColor: selectedSecColor,
          display: "flex",
          justifyContent: "space-between",
          margin: "5px 15px",
          padding: "10px",
          borderRadius: "10px",
          alignItems: "center"
        }}>
          <div style={labelContainerStyle}>
            <FaRegListAlt size={20} />
            <span>รายละเอียดเพิ่มเติม</span>
          </div>
          {isEditing ? (
            <input
              name="Detail"
              value={formData.Detail}
              onChange={handleChange}
              style={{
                backgroundColor: selectedSecColor,
                border: 'none',
                width: '50%',
                fontSize: '1rem',
                color: 'white',
                textAlign: 'right',
                outline: 'none',
                font: 'inherit'
              }}
            />
          ) : (
            <div>{user.Detail || '-'}</div>
          )}
        </div>
      </div>
    </div>
  );
}

/* Styles */
const labelContainerStyle = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center"
};

export default Profile;
