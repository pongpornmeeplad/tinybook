import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaRegCircleCheck } from "react-icons/fa6";

const firstColors = {
    'ทบ.': '#008000',
    'ทร.': '#003aff',
    'ทอ.': '#00c5ff',
    'ตร.': '#510808'
};

function Registerpage() {
    const navigate = useNavigate();
    const location = useLocation(); // Get the location object
    const { Service } = location.state || {}; // Retrieve Service from location state

    // Set the background color dynamically based on the selected Service
    const selectedfirstColor = firstColors[Service] || "#510808"; // Default color

    const handleNextClick = () => {
        navigate('/album', { state: { Service } }); // Pass Service to the /album route
    };

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                backgroundColor: selectedfirstColor,
                display: 'flex',
                flexDirection: 'column',
                color: 'white',
                overflow: 'hidden',
                position: 'relative',
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: "'Kanit', sans-serif",
            }}
        >
            <div
                style={{
                    fontSize: "2rem",
                    marginTop: "3rem",
                    fontFamily: "'Kanit', sans-serif",
                }}
            >
                ลงทะเบียนเรียบร้อย
            </div>
            <div>
                <FaRegCircleCheck
                    style={{
                        fontSize: "200px",
                    }}
                />
            </div>
            <div>
                <button
                    style={{
                        marginBottom: "3rem",
                        backgroundColor: "#ffffff",
                        borderRadius: "30px",
                        width: "15rem",
                        color: selectedfirstColor,
                    }}
                    onClick={handleNextClick}
                >
                    ปิด
                </button>
            </div>
        </div>
    );
}

export default Registerpage;
