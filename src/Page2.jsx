import React from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Input, notification } from 'antd'; // Import notification from Ant Design
import bgImage from './assets/afaps48-bg.png'; // Use the same background as Page1
import CombinedLocationSearch from './CombinedLocationSearch';
import { FaChevronLeft } from 'react-icons/fa';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC4dCrV6B5GYraqkFm16oQlqMwU8LMNh3E",
    authDomain: "ybregister.firebaseapp.com",
    projectId: "ybregister",
    storageBucket: "ybregister.appspot.com",
    messagingSenderId: "720962763966",
    appId: "1:720962763966:web:dddb0e131241ee883d32ef",
    measurementId: "G-PGV59ZJ7WM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const { TextArea } = Input;

const firstColors = {
    'ทบ.': '#8B0000',
    'ทร.': '#003aff',
    'ทอ.': '#00c5ff',
    'ตร.': '#510808'
};


function Page2({ inputValues, setInputValues }) {
    const navigate = useNavigate();

    // Handle input changes
    const handleInputChange = (e, field) => {
        setInputValues({
            ...inputValues,
            [field]: e.target.value
        });
    };

    const handleLocationChange = ({ workplace, latlong }) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            Workplace: workplace || "",
            Latlong: latlong || { lat: 0, lng: 0 },
        }));
    };

    const selectedfirstColor = firstColors[inputValues.Service] || "#510808"; // Default color

    // Function to show error notification
    const showErrorNotification = (message) => {
        notification.error({
            message: 'Error',
            description: message,
            placement: 'topRight',
        });
    };

    // Handle form submission
    const handleNextClick = async () => {
        // Define the required fields and their labels for better messages
        const requiredFields = [
            { key: 'Service', label: 'เหล่า' },
            { key: 'Name', label: 'คำนำหน้า ชื่อ สกุล' },
            { key: 'Nickname', label: 'ชื่อเล่น' },
            { key: 'Tel', label: 'เบอร์โทร' },
            { key: 'Address', label: 'ที่อยู่' },
            { key: 'field1', label: 'ตำแหน่ง สังกัด' },
            { key: 'Workplace', label: 'สถานที่ทำงาน' },
            { key: 'field3', label: 'ธุรกิจส่วนตัว' },
            { key: 'field4', label: 'อยากบอกอะไรกับเพื่อน' },
        ];

        // Check for missing required fields
        const missingFields = requiredFields
            .filter(field => !inputValues[field.key] || inputValues[field.key].toString().trim() === '')
            .map(field => field.label);

        if (missingFields.length > 0) {
            showErrorNotification(`กรุณากรอกข้อมูลให้ครบถ้วน: ${missingFields.join(', ')}`);
            return;
        }

        // Check if Latlong is selected
        if (!inputValues.Latlong || !inputValues.Latlong.lat || !inputValues.Latlong.lng) {
            showErrorNotification("กรุณาเลือกตำแหน่งบนแผนที่");
            return;
        }

        try {
            await addDoc(collection(db, "users"), {
                Service: inputValues.Service,
                Name: inputValues.Name,
                Nickname: inputValues.Nickname,
                Tel: inputValues.Tel,
                Address: inputValues.Address,
                Position: inputValues.field1,
                Workplace: inputValues.Workplace,
                Business: inputValues.field3,
                Detail: inputValues.field4,
                LineId: inputValues.LineId,
                Picpic: inputValues.picpic,
                Latlong: inputValues.Latlong,
            });
            navigate('/Register', { state: { Service: inputValues.Service } });
        } catch (error) {
            console.error("Error adding document: ", error);
            showErrorNotification("Failed to submit data. Please try again.");
        }
    };

    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'contain',
            display: 'flex',
            flexDirection: 'column',
            color: 'white',
            fontFamily: "'Kanit', sans-serif",
            overflow: 'hidden',
            position: 'relative',
            justifyContent: "end",
            gap: "0.5rem",
            alignItems: "center",
        }}>
              <div
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    cursor: 'pointer',
         
                    borderRadius: '50%',
                    padding: '5px',
                    zIndex: 9999
                }}
                onClick={() => navigate('/page1')}
            >
                <FaChevronLeft size={25} color="#FFFFFF" />
            </div>
            {/* Red Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: selectedfirstColor,
                opacity: 0.8,
                zIndex: 0
            }} />

            <div style={{
                marginLeft: "3rem",
                justifyContent: "left",
                color: '#FFFFFF',
                fontSize: '30px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                maxWidth: "1000px",
                width: "100%",
                marginBottom: "10px",
                zIndex: 1
            }}>
                กรอกข้อมูล
                <div style={{
                    width: '35px',
                    height: '35px',
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '10px',
                }}>
                    <span style={{
                        color: selectedfirstColor,
                        fontSize: '18px',
                        fontWeight: 'bold'
                    }}>2</span>
                </div>
            </div>

            {/* Form Section */}
            <div style={{
                width: "100vw",
                height: "70vh",
                backgroundColor: "#ffffff",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: 'white',
                overflow: 'scroll',
                position: 'relative',
                boxSizing: "border-box",
                padding: "20px",
                borderRadius: "30px 30px 0px 0px",
                maxWidth: "1000px",
                paddingTop: "40px",
                paddingBottom: "70px",
                zIndex: 1,
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {/* Position Field */}
                    <div>
                        <div style={{
                            color: selectedfirstColor,
                            fontSize: "1.2rem",
                            marginBottom: "0.2rem",
                        }}>ตำแหน่ง สังกัด</div>
                        <Input
                            variant='outlined'
                            type="text"
                            placeholder='ผู้บังคับกองร้อยอาวุธเบา'
                            value={inputValues.field1}
                            onChange={(e) => handleInputChange(e, 'field1')}
                            size='large'
                        />
                    </div>

                    {/* Workplace Field */}
                    <div>
                        <div style={{
                            color: selectedfirstColor,
                            fontSize: "1.2rem",
                            marginBottom: "0.2rem",
                        }}>สถานที่ทำงาน</div>
                        <CombinedLocationSearch onLocationChange={handleLocationChange} />
                    </div>

                    {/* Business Field */}
                    <div>
                        <div style={{
                            color: selectedfirstColor,
                            fontSize: "1.2rem",
                            marginBottom: "0.2rem",
                        }}>ธุรกิจส่วนตัว</div>
                        <Input
                            variant='outlined'
                            type="text"
                            placeholder='ร้านอาหาร...'
                            value={inputValues.field3}
                            onChange={(e) => handleInputChange(e, 'field3')}
                            size='large'
                        />
                    </div>

                    {/* Detail Field */}
                    <div>
                        <div style={{
                            color: selectedfirstColor,
                            fontSize: "1.2rem",
                            marginBottom: "0.2rem",
                        }}>อยากบอกอะไรกับเพื่อน</div>
                        <TextArea
                            variant='outlined'
                            type="text"
                            placeholder='คิดถึงเพื่อนๆรุ่น 48 ทุกนาย...'
                            value={inputValues.field4}
                            onChange={(e) => handleInputChange(e, 'field4')}
                            size='large'
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div style={{
                    alignSelf: "center",
                    marginTop: "20px",
                    borderRadius: "30px",
                    width: "100%",
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <button style={{
                        color: "#ffffff",
                        backgroundColor: selectedfirstColor,
                        borderRadius: "30px",
                        width: "90%",
                        alignSelf: "center",
                    }} onClick={handleNextClick}>ต่อไป</button>
                </div>
            </div>
        </div>
    );
}

export default Page2;
