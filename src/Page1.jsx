import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Select } from 'antd';
import bgImage from './assets/afaps48-bg.png';
const { TextArea } = Input;

function Page1({ inputValues, setInputValues }) {
    const navigate = useNavigate();
    const [showWelcome, setShowWelcome] = useState(true); // State to control welcome message visibility
    const [fadeOut, setFadeOut] = useState(false); // State to handle fade out effect

    useEffect(() => {
        // Set a timer to start fading out the welcome message after 8 seconds
        const fadeOutTimer = setTimeout(() => {
            setFadeOut(true);
        }, 1000);

        // Set a timer to hide the welcome message completely after 10 seconds
        const hideMessageTimer = setTimeout(() => {
            setShowWelcome(false);
        }, 1000);

        return () => {
            clearTimeout(fadeOutTimer);
            clearTimeout(hideMessageTimer);
        };
    }, []);

    const handleInputChange = (e, field) => {
        setInputValues({
            ...inputValues,
            [field]: e.target.value
        });
    };

    const handleNextClick = () => {
        navigate('/Page2', { state: { inputValues } });
    };
    // Define the options with different colors
    const options = [
        { value: 'ทบ.', label: 'ทบ.', color: 'green' },
        { value: 'ทร.', label: 'ทร.', color: 'blue' },
        { value: 'ทอ.', label: 'ทอ.', color: 'lightblue' },
        { value: 'ตร.', label: 'ตร.', color: '#510808' } // original color
    ];

    // Custom styles for react-select
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: state.data.color, // Assign color based on the option's color field
            padding: 10,
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: state.data.color, // Assign color for the selected option
        }),
    };
    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: '700px center',
            display: 'flex',
            flexDirection: 'column',
            color: 'white',
            fontFamily: "'Kanit', sans-serif",
            position: 'relative',
            justifyContent: "flex-end", // Aligns the text at the bottom
            gap: "0.5rem",
            alignItems: "center",
            overflow: "hidden",
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

            {showWelcome ? (
                // Show welcome message with fade-out effect
                <div
                    style={{
                        zIndex: 1,
                        color: '#FFFFFF',
                        fontSize: '1.5rem',
                        textAlign: 'center',
                        marginBottom: '20vh', // Space from the bottom
                        opacity: fadeOut ? 0 : 1, // Fade out effect
                        transition: 'opacity 2s ease', // Smooth transition effect
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        alignItems: 'start',
                        width: '300px',
                        padding: '20px',
                        gap: '30px',

                    }}
                >
                    <p style={{ textAlign: 'start', padding: 0, margin: 0 }}>สายสัมพันธ์...</p>
                    <p style={{ alignSelf: 'end', padding: 0, margin: 0 }}>ไม่มีวันเปลี่ยนแปลง</p>

                </div>
            ) : (
                // Show the form with fade-in effect
                <>


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
                        zIndex: 1,
                        animation: 'fadeIn 2s forwards', // Fade-in animation

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
                    <div
                        style={{
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
                            opacity: 0, // Initial state for fade-in effect
                            animation: 'fadeIn 2s forwards', // Fade-in animation
                        }}
                    >

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div>
                                <div style={{
                                    color: "#510808",
                                    fontSize: "1.2rem",
                                    marginBottom: "0.2rem",
                                }}>เหล่า</div>
                                <Select
                                    styles={customStyles}
                                    options={options}
                                    value={options.find(opt => opt.value === inputValues.Service)}
                                    onChange={(selectedOption) =>
                                        setInputValues({ ...inputValues, Service: selectedOption.value })
                                    }
                                    placeholder='เลือกเหล่า'
                                />
                            </div>

                            <div>
                                <div style={{
                                    color: "#510808",
                                    fontSize: "1.2rem",
                                    marginBottom: "0.2rem"
                                }}>คำนำหน้า ชื่อ สกุล</div>
                                <Input
                                    variant='filled'
                                    placeholder='ร.ท.รักชาติ ยิ่งชีพ'
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
                                <Input
                                    variant='filled'
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
                                <TextArea
                                    variant='filled'
                                    placeholder='บ้านเลขที่ ....'
                                    value={inputValues.Address}
                                    onChange={(e) => handleInputChange(e, 'Address')}
                                    size='large'
                                />
                            </div>
                        </div>

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
                                backgroundColor: "#510808",
                                borderRadius: "30px",
                                width: "90%",
                                alignSelf: "center",

                            }} onClick={handleNextClick}>ต่อไป</button>
                        </div>
                    </div>
                </>

            )}
        </div>
    );
}

export default Page1;
