import React, { useState } from 'react';
// import { Users } from './friend';
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { RiArrowDropDownLine } from "react-icons/ri";

function List() {
  const [query, setQuery] = useState("");
  
  const search = (data) => {
    return data.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.nickname.toLowerCase().includes(query.toLowerCase()));
  };

  const navigate = useNavigate();
  const handleCancleClick = () => {
    navigate('/Album');
  };

  const handleCloseClick = () => {
    navigate('/Profile');
  };

  const handleSeeall = () => {
    navigate('/All');
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
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        marginInline: "15px 15px",
        marginBottom: "20px",
        gap: "20px",
        marginTop: "15px",
        maxWidth: "1000px",
        width: "95%"
      }}>
        <div style={{
          width: '100%',
          borderRadius: '30px',
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '20px',
        }}>
          <IoMdSearch style={{
            color: "#510808",
            fontSize: "2rem"
          }} />
          <input style={{
            background: "#ffffff",
            color: "black",
            borderRadius: "30px",
            boxSizing: "border-box",
            height: "2rem",
            border: "1px solid #ccc",
            padding: "20px",
            width: "100%",
            outline: 'none',
            fontSize: '1rem',
            backgroundColor: 'transparent',
            fontFamily: "'Kanit', sans-serif",
          }} type="text" placeholder="ค้นหารายชื่อ" onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div style={{
          color: "#BB6969",
          marginLeft: "auto"
        }} onClick={handleCancleClick}>
          ยกเลิก
        </div>
      </div>

      <div style={{
        width: "100%",
        height: "70vh",
        backgroundColor: "#831818",
        borderRadius: "30px",
        boxSizing: "border-box",
        padding: "20px",
        overflow: "scroll",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "1000px"
      }}>
        {search(Users).map((item) => (
          <div key={item.id} style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center"
          }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              borderRadius: '50%',
              border: '5px solid white',
              overflow: 'hidden',
            }}>
              <img src={item.picpic} alt="Profile" style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }} />
            </div>
            <div>
              <div>{item.name}</div>
              <div style={{
                color: "#bb6969"
              }}>{item.nickname}</div>
            </div>
          </div>
        ))}

        <div style={{
          display: "flex",
          justifyContent: "center"
        }} onClick={handleSeeall}>
          <RiArrowDropDownLine style={{ fontSize: "30px" }} />
          ดูทั้งหมด
        </div>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "center"
      }}>
        <button style={{
          marginBottom: "3rem",
          backgroundColor: "#ffffff",
          borderRadius: "30px",
          width: "15rem",
          color: "#510808",
          marginTop: "20px"
        }} onClick={handleCloseClick}>ปิด</button>
      </div>
    </div>
  );
}

export default List;
