import React from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { PiBookBookmarkFill } from "react-icons/pi";
import { Users } from './friend';

function All() {

    const navigate = useNavigate();
    const handleBack = () => {
    navigate('/Album');
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
            alignItems: "center",
            overflow: "hidden"

        }}>
            <div style={{
                display: "flex",
                alignItems: "center",
                boxSizing: "border-box",
                padding: "10px",
                color: "white",
                gap: "5px",
                marginTop: "20px",
                marginBottom: "20px",
                justifyContent: "left",
                width: "100%",
                maxWidth: "1000px"
            }}>
                <div style={{

                }}>
                    <FaArrowLeft style={{
                        fontSize: "1.5rem",
                        marginTop: "0.5rem"
                    }} onClick={handleBack}/>
                </div>

                <div style={{
                    fontSize: "1.5rem",
                    marginLeft: "10px",

                }}>ทำเนียบรุ่น</div>
                <div>
                    <PiBookBookmarkFill style={{
                        fontSize: "1.5rem",
                        marginTop: "0.5rem"
                    }} />

                </div>

            </div>

            <div style={{
                height: "100vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                padding: "2rem",
                backgroundColor: "#831818",
                borderRadius: "30px 30px 0px 0px ",
                maxWidth: "1000px",
                gap: "1rem",
                overflow: "scroll"
            }}>

                {Users.map((item, index) => (
                    <div key={item.id}>
                        <div style={{                       //บล็อกรายชื่อ
                            display: "flex",
                            gap: "1rem",
                            alignItems: "center",
                        }}>
                            <div style={{
                                width: '2rem',
                                height: '2rem',
                                borderRadius: '50%',
                                border: '3px solid white',
                                overflow: 'hidden',
                            }}>
                                <img src={item.picpic} alt="Profile" style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }} />
                            </div>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                gap: "5px"
                            }}>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}>
                                    <div>{item.name}</div>
                                    
                                    <div style={{
                                        color: "#bb6969"
                                    }}>{item.nickname}</div>
                                </div>

                                <div style={{
                                    border: "1px solid #bb6969",
                                    width: "100%"
                                }}>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default All;
