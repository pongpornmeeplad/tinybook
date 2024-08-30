
import { IoMdSearch } from "react-icons/io";
// import { Users } from './friend';
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase"; // นำเข้า db จากไฟล์ firebase.js

import { useNavigate } from 'react-router-dom';
import { RiArrowDropDownLine } from "react-icons/ri";
import React, { useEffect, useState } from 'react';

function AlbumPage() {
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);
  const [users, setUsers] = useState([]); // ใช้สำหรับเก็บข้อมูลผู้ใช้จาก Firebase
  

  const search = (data) => {
    return data.filter((item) => 
      (item.Name && item.Name.toLowerCase().includes(query.toLowerCase())) ||
      (item.Nickname && item.Nickname.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users")); // "users" คือชื่อ collection ใน Firestore
        const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        console.log('usersList', usersList)
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  const handleCancleClick = () => {
    setShowList(false); // Hide list on cancel
  };

  const handleProfile = () => {
    navigate('/Profile');
  };

  const handleSeeAll = () => {
    navigate('/All');
  };

  const images = [
    { src: 'https://profile.line-scdn.net/0h6D1zjRrLaWscA3nNZ8MXFGxTagE_cjB5YGEuCC1UP1hxY34_NDYgDX0AZV4kY3s6MWR1XXoHYw8QEB4NAlWVXxszN18iMyY5OWchjA/preview', alt: '0', size: 'large' },
    // { src: 'https://th.bing.com/th/id/OIP.7z7oxe0tnRB1lwgH13v9VAHaKe?rs=1&pid=ImgDetMain', alt: '1', size: 'small' },
    // { src: 'https://th.bing.com/th/id/OIP.ltvSxtZ52yBWmVbcfdPuaQHaHa?rs=1&pid=ImgDetMain', alt: '2', size: 'small' },
    // { src: 'https://th.bing.com/th/id/R.7ec6a10285031b717724f98389762c42?rik=N7UCz6XP0RhBQw&riu=http%3a%2f%2fclipart-library.com%2fimages%2f8cGbedjKi.jpg&ehk=%2f14p3%2fq3mtE4k5llcfevyo2LLpaNbTXfkTST3DjRoDQ%3d&risl=&pid=ImgRaw&r=0', alt: '3', size: 'large' },
    // { src: 'https://th.bing.com/th/id/OIP.zrJIcPn3gqa0Wx3kVgdYvQHaJl?rs=1&pid=ImgDetMain', alt: '4', size: 'small' },
    // { src: 'https://th.bing.com/th/id/R.5c7361816b04c58e016b8160bfa48c8e?rik=YI4lyYIDIdzyfQ&pid=ImgRaw&r=0', alt: '5', size: 'small' },
    // { src: 'https://www.activityshelter.com/wp-content/uploads/2016/06/picture-of-the-number-6-black-color.jpg', alt: '6', size: 'large' },
    { src: 'https://previews.123rf.com/images/rawpixel/rawpixel1705/rawpixel170502548/77394524-beauty-nature-outdoors-outside-sunlight.jpg', alt: 'Architecture Small', size: 'small' },
    { src: 'https://previews.123rf.com/images/rawpixel/rawpixel1705/rawpixel170502548/77394524-beauty-nature-outdoors-outside-sunlight.jpg', alt: 'Art Small', size: 'small' },
    { src: 'https://previews.123rf.com/images/rawpixel/rawpixel1705/rawpixel170502548/77394524-beauty-nature-outdoors-outside-sunlight.jpg', alt: 'City Small', size: 'small' },
    { src: 'https://previews.123rf.com/images/rawpixel/rawpixel1705/rawpixel170502548/77394524-beauty-nature-outdoors-outside-sunlight.jpg', alt: 'City Small', size: 'small' },
    { src: 'https://previews.123rf.com/images/rawpixel/rawpixel1705/rawpixel170502548/77394524-beauty-nature-outdoors-outside-sunlight.jpg', alt: 'City Small', size: 'small' },
    { src: 'https://previews.123rf.com/images/rawpixel/rawpixel1705/rawpixel170502548/77394524-beauty-nature-outdoors-outside-sunlight.jpg', alt: 'City Small', size: 'small' },
    { src: 'https://previews.123rf.com/images/rawpixel/rawpixel1705/rawpixel170502548/77394524-beauty-nature-outdoors-outside-sunlight.jpg', alt: 'City Small', size: 'small' },
    { src: 'https://previews.123rf.com/images/rawpixel/rawpixel1705/rawpixel170502548/77394524-beauty-nature-outdoors-outside-sunlight.jpg', alt: 'City Small', size: 'small' },
  ];

  

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      backgroundColor: "#510808",
      display: 'flex',
      flexDirection: 'column',
      color: 'white',
      fontFamily: "'Kanit', sans-serif",
      position: 'relative',
      alignItems: "center"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        marginInline: "15px 15px",
        marginBottom: "20px",
        gap: "20px",
        marginTop: "1.5rem",
        maxWidth: '1000px',
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
            border: "none",
            padding: "20px",
            width: "100%",
            outline: 'none',
            fontSize: '1rem',
            backgroundColor: 'transparent',
            fontFamily: "'Kanit', sans-serif",
          }} type="text" placeholder="ค้นหารายชื่อ" onFocus={() => setShowList(true)} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div style={{
          color: "#BB6969",
          marginLeft: "auto",
          cursor: "pointer"
        }} onClick={handleCancleClick}>
          ยกเลิก
        </div>
      </div>

      {showList ? (
        
        <div style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "#831818",
          borderRadius: "30px 30px 0px 0px ",
          boxSizing: "border-box",
          padding: "20px",
          overflow: "scroll",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "1000px"
        }}>
          {search(users).map((item) => (
            <div key={item.id} style={{
              display: "flex",
              gap: "2rem",
              alignItems: "center"
            }} onClick={handleProfile}>
              <div style={{
                width: '4rem',
                height: '4rem',
                borderRadius: '50%',
                border: '5px solid white',
                overflow: 'hidden',
              }}>
                <img src={item.Picpic} alt="Profile" style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }} />
              </div>
              <div>
                <div>{item.Name}</div>
                <div style={{
                  color: "#bb6969"
                }}>{item?.Nickname}</div>
              </div>
            </div>
          ))}

          <div style={{
            display: "flex",
            justifyContent: "center",
            cursor: "pointer"
          }} onClick={handleSeeAll}>
            <RiArrowDropDownLine style={{ fontSize: "30px" }} />
            ดูทั้งหมด
          </div>
          
        </div>
        
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          backgroundColor: '#4b0d0d',
          width: '100%',
          maxWidth: '1000px',
          boxSizing: "border-box",
          padding: "1rem",
          marginInline: "auto ",
          height: "100%",
          overflow: "scroll"
        }}>
          {images.map((image, index) => (
            <div key={index} style={{
              gridRow: (index === 7 || index % 10 === 0) ? "span 2" : "auto"
            }}>
              <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default AlbumPage;
