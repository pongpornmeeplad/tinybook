import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

function Page1({inputValues, setInputValues}) {

   

    const navigate = useNavigate();

    const handleInputChange = (e, field) => {
        setInputValues({
            ...inputValues,
            [field]: e.target.value
        });
    };

    const handleNextClick =  () => {
        // try {
        //     // บันทึกข้อมูลลงใน Firestore
        //     await addDoc(collection(db, "users"), {
        //         Service: inputValues.Service,
        //         Name: inputValues.Name,
        //         Nickname: inputValues.Nickname,
        //         Tel: inputValues.Tel
        //     });
            // console.log("Document successfully written!");

            // ไปยังหน้า Page2 หลังจากบันทึกสำเร็จ
            navigate('/Page2', { state: { inputValues } });
        // } catch (error) {
        //     console.error("Error adding document: ", error);
        // }
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
            alignItems: "center",
        }}>
            <div style={{
                marginLeft: "1rem",
                justifyContent: "left",
                color: '#FFFFFF',
                fontSize: '30px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                maxWidth: "1000px",
                width: "100%",
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
                        fontWeight: 'bold'
                    }}>1</span>
                </div>
            </div>

            <div style={{
                width: "100vw",
                height: "70vh",
                backgroundColor: "#ffffff",
                display: 'flex',
                flexDirection: 'column',
                color: 'white',
                overflow: 'hidden',
                position: 'relative',
                boxSizing: "border-box",
                padding: "20px",
                borderRadius: "30px 30px 0px 0px",
                maxWidth: "1000px"
            }}>
                <div>
                    <div>
                        <div style={{
                            color: "#510808",
                            fontSize: "1.2rem",
                            marginBottom: "0.2rem",
                        }}>เหล่า</div>
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
                        }} type="text" placeholder='ทบ.'
                            value={inputValues.Service}
                            onChange={(e) => handleInputChange(e, 'Service')}
                        />
                    </div>

                    <div>
                        <div style={{
                            color: "#510808",
                            fontSize: "1.2rem",
                            marginBottom: "0.2rem"
                        }}>คำนำหน้า ชื่อ สกุล</div>
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
                        }} type="text" placeholder='ร.ท.รักชาติ ยิ่งชีพ'
                            value={inputValues.Name}
                            onChange={(e) => handleInputChange(e, 'Name')} />
                    </div>

                    <div>
                        <div style={{
                            color: "#510808",
                            fontSize: "1.2rem",
                            marginBottom: "0.2rem"
                        }}>ชื่อเล่น/ฉายา</div>
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
                        }} type="text" placeholder='ปาล์ม'
                            value={inputValues.Nickname}
                            onChange={(e) => handleInputChange(e, 'Nickname')} />
                    </div>

                    <div>
                        <div style={{
                            color: "#510808",
                            fontSize: "1.2rem",
                            marginBottom: "0.2rem"
                        }}>เบอร์โทร</div>
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
                        }} type="text" placeholder='0957777777'
                            value={inputValues.Tel}
                            onChange={(e) => handleInputChange(e, 'Tel')} />
                    </div>

                    <div>
                        <div style={{
                            color: "#510808",
                            fontSize: "1.2rem",
                            marginBottom: "0.2rem"
                        }}>ที่อยู่</div>
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
                        }} type="text" placeholder='0957777777'
                            value={inputValues.Add}
                            onChange={(e) => handleInputChange(e, 'Add')} />
                    </div>
                </div>

                <div style={{
                    alignSelf: "center",
                    marginTop: "20px",
                    borderRadius: "30px"
                }}>
                    <button style={{
                        color:"#ffffff",
                        backgroundColor: "#510808",
                        borderRadius: "30px",
                        width: "15rem"
                    }} onClick={handleNextClick}>ต่อไป</button>
                </div>
            </div>
        </div>
    );
}

export default Page1;
