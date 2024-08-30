import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegCircleCheck } from "react-icons/fa6";

function Registerpage() {
    const navigate = useNavigate();
    const handleNextClick = () => {
        navigate('/album');
    };


    return (
       
        <div
            style={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "#510808",
                display: 'flex',
                flexDirection: 'column',
                color: 'white',
                overflow: 'hidden',
                position: 'relative',
                justifyContent: "space-between",
                alignItems:"center",
                fontFamily: "'Kanit', sans-serif",
            }}>
            <div
             style={{
                fontSize:"2rem",
                marginTop:"3rem",
                fontFamily: "'Kanit', sans-serif",
             }}>ลงทะเบียนเรียบร้อย</div>
            <div>
                <FaRegCircleCheck style={{
                    fontSize: "200px",
                }} />
            </div>
            <div>
                <button style={{
                    marginBottom:"3rem",
                    backgroundColor: "#ffffff",
                    borderRadius: "30px",
                    width: "15rem",
                    color:"#510808"
                }} onClick={handleNextClick}>ปิด</button>
            </div>
        </div>
    );
}

export default Registerpage;
