import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Input, Select } from 'antd';
import bgImage from './assets/afaps48-bg.png';
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
function Page1({ inputValues, setInputValues }) {
    const navigate = useNavigate();

    const handleInputChange = (e, field) => {
        setInputValues({
            ...inputValues,
            [field]: e.target.value
        });
    };

    const handleNextClick = () => {
        navigate('/Page2', { state: { inputValues } });
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
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: "#510808",
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
                justifyContent: 'space-between',

                color: 'white',
                overflow: 'hidden',
                position: 'relative',
                boxSizing: "border-box",
                padding: "20px",
                borderRadius: "30px 30px 0px 0px",
                maxWidth: "1000px",
                paddingTop: "40px",
                paddingBottom: "70px",
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div>
                        <div style={{
                            color: "#510808",
                            fontSize: "1.2rem",
                            marginBottom: "0.2rem",
                        }}>เหล่า</div>
                        <Select
                            style={{ width: "100%" }}
                            variant='filled'
                            size='large'
                            placeholder='เลือกเหล่า'
                            value={inputValues.Service}
                            onChange={(value) => handleInputChange({ target: { value } }, 'Service')}

                            options={[
                                {
                                    value: 'ทบ.',
                                    label: 'ทบ.'
                                },
                                {
                                    value: 'ทร.',
                                    label: 'ทร.'
                                },
                                {
                                    value: 'ทอ.',
                                    label: 'ทอ.'
                                },
                                {
                                    value: 'ตร.',
                                    label: 'ตร.'
                                },
                            ]}
                        >

                        </Select>
                    </div>

                    <div>
                        <div style={{
                            color: "#510808",
                            fontSize: "1.2rem",
                            marginBottom: "0.2rem"
                        }}>คำนำหน้า ชื่อ สกุล</div>

                        <Input variant='filled' placeholder='ร.ท.รักชาติ ยิ่งชีพ'
                            value={inputValues.Name}
                            onChange={(e) => handleInputChange(e, 'Name')}
                            size='large'

                        />
                    </div>

                    <div>
                        <div style={{
                            color: "#510808",
                            fontSize: "1.2rem",
                            marginBottom: "0.2rem"
                        }}>ชื่อเล่น/ฉายา</div>

                        <Input
                            variant='filled'
                            placeholder='ปาล์ม'
                            value={inputValues.Nickname}
                            onChange={(e) => handleInputChange(e, 'Nickname')}
                            size='large'
                        />
                    </div>

                    <div>
                        <div style={{
                            color: "#510808",
                            fontSize: "1.2rem",
                            marginBottom: "0.2rem"
                        }}>เบอร์โทร</div>

                        <Input variant='filled'
                            type='number'
                            placeholder='0957777777'
                            value={inputValues.Tel}
                            onChange={(e) => handleInputChange(e, 'Tel')}
                            size='large'

                        />
                    </div>

                    <div>
                        <div style={{
                            color: "#510808",
                            fontSize: "1.2rem",
                            marginBottom: "0.2rem"
                        }}>ที่อยู่</div>

                        <TextArea variant='filled' placeholder='บ้านเลขที่ ....'
                            value={inputValues.Address}
                            onChange={(e) => handleInputChange(e, 'Address')}
                            size='large'
                        />
                    </div>
                </div>

                <div style={{
                    alignSelf: "center",
                    marginTop: "20px",
                    borderRadius: "30px"
                }}>
                    <button style={{
                        color: "#ffffff",
                        backgroundColor: "#510808",
                        borderRadius: "30px",
                        width: "80vw",
                    }} onClick={handleNextClick}>ต่อไป</button>
                </div>
            </div>
        </div>

    );
}

export default Page1;
