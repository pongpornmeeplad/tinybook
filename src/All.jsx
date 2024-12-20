import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';
import { PiBookBookmarkFill } from "react-icons/pi";
import { getDocs, collection } from 'firebase/firestore';
import { db } from './Firebase';

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
const serviceTextColors = {
    'ทบ.': '#FFA07A', // Light Salmon
    'ทร.': '#00c5ff', // Light Blue
    'ทอ.': '#48fff6', // Light Cyan
    'ตร.': '#bb6969'  // Light Brown
};
function All() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    const handleBack = () => {
        navigate('/Album');
    };

    const location = useLocation(); // Get the location object
    const { Service } = location.state || {}; // Retrieve Service from location state
    const selectedfirstColor = firstColors[Service] || "#510808"; // Default color
    const selectedsecColor = secColors[Service] || "#831818"; // Default color
    const selectedthirdColor = thirdColors[Service] || "#bb6969"; // Default colo

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUsers(usersList);
                console.log('usersList :>> ', usersList);
            } catch (error) {
                console.error("Error fetching users: ", error);
            }
        };

        fetchUsers();
    }, []);
    const handleProfile = (userId) => {
        navigate(`/Profile/${userId}`, { state: { Service } });
    };
    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            overflowY: 'hidden',
            backgroundColor: selectedfirstColor,
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
                <FaArrowLeft style={{
                    fontSize: "1.5rem",
                    marginTop: "0.5rem"
                }} onClick={handleBack} />
                <div style={{ fontSize: "1.5rem", marginLeft: "10px" }}>ทำเนียบรุ่น</div>
                <PiBookBookmarkFill style={{
                    fontSize: "1.5rem",
                    marginTop: "0.5rem"
                }} />
            </div>

            <div style={{
                height: "100vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                padding: "2rem",
                backgroundColor: selectedsecColor,
                borderRadius: "30px 30px 0px 0px ",
                maxWidth: "1000px",
                gap: "1rem",
                overflowY: "scroll",
                overflowX: "hidden"
            }}>
                {users?.map((item) => {
                    const Service = item.Service || ''
                    const serviceColor = serviceTextColors[Service] || '#FFFFFF'; // Fallback to white

                    return (<div key={item.id}>
                        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }} onClick={() => handleProfile(item.id)}>
                            <div style={{
                                width: '2rem',
                                height: 'auto',
                                borderRadius: '50%',
                                border: '3px solid white',
                                overflow: 'hidden',
                                boxSizing: 'border-box', // Ensures border is included in dimensions
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <img src={item?.Picpic} alt="Profile" style={{
                                    width: '100%',
                                    height: 'auto',
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

                                    <div>
                                        <div>{item.Name}</div>
                                        <div style={{ color: selectedthirdColor }}>{item.Tel}</div>


                                    </div>
                                    <div style={{ display: 'flex', gap: 10 }}>

                                        <div style={{ color: selectedthirdColor, alignSelf: "center" }}>{item.Nickname}</div>
                                        <div style={{ fontSize: 12, color: 'white', alignSelf: "center", backgroundColor: serviceColor, paddingLeft: 8, paddingRight: 8, borderRadius: 10, paddingTop: 4, paddingBottom: 4 }}>{Service}</div>
                                    </div>

                                </div>
                                <div style={{
                                    border: `1px ${selectedfirstColor}`,
                                    width: "100%"
                                }} />
                            </div>
                        </div>
                    </div>)
                }

                )}
            </div>
        </div>
    );
}

export default All;
