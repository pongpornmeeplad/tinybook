import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC4dCrV6B5GYraqkFm16oQlqMwU8LMNh3E",
    authDomain: "ybregister.firebaseapp.com",
    projectId: "ybregister",
    storageBucket: "ybregister.appspot.com",
    messagingSenderId: "720962763966",
    appId: "1:720962763966:web:dddb0e131241ee883d32ef",
    measurementId: "G-PGV59ZJ7WM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Page2() {
    const location = useLocation();
    const navigate = useNavigate();

    const initialValues = location.state?.inputValues || {};

    const [inputValues, setInputValues] = useState({
        Service: initialValues.Service || '',
        Name: initialValues.Name || '',
        Nickname: initialValues.Nickname || '',
        Tel: initialValues.Tel || '',
        field1: '',
        field2: '',
        field3: '',
        lineId: '',
        picpic: ''
    });

    const handleInputChange = (e, field) => {
        setInputValues({
            ...inputValues,
            [field]: e.target.value
        });
    };

    const handleNextClick = async () => {
        try {
            // Save data to Firestore
            await addDoc(collection(db, "users"), {
                Service: inputValues.Service,
                Name: inputValues.Name,
                Nickname: inputValues.Nickname,
                Tel: inputValues.Tel,
                Position: inputValues.field1,
                Workplace: inputValues.field2,
                Business: inputValues.field3,
                LineId: inputValues.lineId,
                Picpic: inputValues.picpic
            });
            console.log("Document successfully written!");

            // Navigate to Register page after saving
            navigate('/Register');
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

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
            justifyContent: "end",
            gap: "0.5rem",
            alignItems:"center"
        }}>
            
            <div style={{
                marginLeft:"1rem",
                justifyContent:"left",
                color: '#FFFFFF',
                fontSize: '30px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                maxWidth:"1000px",
                width:"100%"
            }}>
                กรอกข้อมูล
                <div style={{
                    width: '35px',
                    height: '35px',
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '5px',
                }}>
                    <span style={{
                        color: '#510808',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        fontFamily: "'Kanit', sans-serif",
                    }}>2</span>
                </div>
            </div>
            
            <div style={{
                width: "100vw",
                height: "70vh",
                backgroundColor: "#ffffff",
                display: 'flex',
                flexDirection: 'column',
                color: 'white',
                fontFamily: "'Kanit', sans-serif",
                overflow: 'hidden',
                position: 'relative',
                boxSizing: "border-box",
                padding: "20px",
                borderRadius:"30px 30px 0px 0px",
                maxWidth:"1000px"
            }}>
                <div>
                    <div>
                        <div style={{
                            color: "#510808",
                            fontSize: "1.2rem",
                            marginBottom: "0.2rem",
                            fontFamily: "'Kanit', sans-serif",
                        }}>ตำแหน่ง สังกัด</div>
                        <input style={{
                            background: "#EAEAEA",
                            width: "100%",
                            color: "black",
                            borderRadius: "10px",
                            boxSizing: "border-box",
                            height: "2rem",
                            fontSize: "1rem",
                            border: "1px solid #ccc",
                            padding: "10px",
                            marginBottom: "0.2rem",
                            fontFamily: "'Kanit', sans-serif",
                        }} type="text" placeholder='ผบ......'
                        value={inputValues.field1}
                        onChange={(e) => handleInputChange(e, 'field1')}
                        />
                    </div>

                    <div>
                        <div style={{
                            color: "#510808",
                            fontSize: "1.2rem",
                            marginBottom: "0.2rem"
                        }}>สถานที่ทำงาน</div>
                        <input style={{
                            background: "#EAEAEA",
                            width: "100%",
                            color: "black",
                            borderRadius: "10px",
                            boxSizing: "border-box",
                            height: "2rem",
                            fontSize: "1rem",
                            border: "1px solid #ccc",
                            padding: "10px",
                            marginBottom: "0.2rem",
                            fontFamily: "'Kanit', sans-serif",
                        }} type="text" placeholder='โรงเรียน....' 
                        value={inputValues.field2}
                        onChange={(e) => handleInputChange(e, 'field2')}/>
                    </div>

                    <div>
                        <div style={{
                            color: "#510808",
                            fontSize: "1.2rem",
                            marginBottom: "0.2rem"
                        }}>ธุรกิจส่วนตัว</div>
                        <input style={{
                            background: "#EAEAEA",
                            width: "100%",
                            color: "black",
                            borderRadius: "10px",
                            boxSizing: "border-box",
                            height: "5rem",
                            fontSize: "1rem",
                            border: "1px solid #ccc",
                            padding: "10px",
                            marginBottom: "0.2rem",
                            fontFamily: "'Kanit', sans-serif",
                        }} type="text" placeholder='ร้านอาหาร...' 
                        value={inputValues.field3}
                        onChange={(e) => handleInputChange(e, 'field3')}/>
                    </div>

                    <div>
                        <div style={{
                            color: "#510808",
                            fontSize: "1.2rem",
                            marginBottom: "0.2rem"
                        }}>Line ID</div>
                        <input style={{
                            background: "#EAEAEA",
                            width: "100%",
                            color: "black",
                            borderRadius: "10px",
                            boxSizing: "border-box",
                            height: "2rem",
                            fontSize: "1rem",
                            border: "1px solid #ccc",
                            padding: "10px",
                            marginBottom: "0.2rem",
                            fontFamily: "'Kanit', sans-serif",
                        }} type="text" placeholder='ไอดีไลน์....' 
                        value={inputValues.lineId}
                        onChange={(e) => handleInputChange(e, 'lineId')}/>
                    </div>

                    <div>
                        <div style={{
                            color: "#510808",
                            fontSize: "1.2rem",
                            marginBottom: "0.2rem"
                        }}>Picture URL</div>
                        <input style={{
                            background: "#EAEAEA",
                            width: "100%",
                            color: "black",
                            borderRadius: "10px",
                            boxSizing: "border-box",
                            height: "2rem",
                            fontSize: "1rem",
                            border: "1px solid #ccc",
                            padding: "10px",
                            marginBottom: "0.2rem",
                            fontFamily: "'Kanit', sans-serif",
                        }} type="text" placeholder='ลิงค์รูป....' 
                        value={inputValues.picpic}
                        onChange={(e) => handleInputChange(e, 'picpic')}/>
                    </div>
                </div>

                <div style={{
                    alignSelf: "center",
                    marginTop: "20px",
                    borderRadius: "30px"

                }}>
                    <button style={{
                        backgroundColor: "#510808",
                        borderRadius: "30px",
                        width: "15rem"
                    }} onClick={handleNextClick}>ต่อไป</button>
                </div>
            </div>

        </div>
    );
}

export default Page2;
