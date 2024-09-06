import { IoMdSearch } from "react-icons/io";
// Removed the commented import of Users
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase"; // Import db from firebase.js

import { useNavigate } from 'react-router-dom';
import { RiArrowDropDownLine } from "react-icons/ri";
import React, { useEffect, useState } from 'react';

function AlbumPage() {
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);
  const [users, setUsers] = useState([]); // To store users from Firebase

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
        const querySnapshot = await getDocs(collection(db, "users")); // "users" is the Firestore collection name
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

  // Updated handleProfile to accept userId
  const handleProfile = (userId) => {
    navigate(`/Profile/${userId}`);
  };

  const handleSeeAll = () => {
    navigate('/All');
  };

  const images = [
    // Your images array remains unchanged
    { src: 'https://profile.line-scdn.net/0h6D1zjRrLaWscA3nNZ8MXFGxTagE_cjB5YGEuCC1UP1hxY34_NDYgDX0AZV4kY3s6MWR1XXoHYw8QEB4NAlWVXxszN18iMyY5OWchjA/preview', alt: '0', size: 'large' },
    { src: 'https://profile.line-scdn.net/0h6D1zjRrLaWscA3nNZ8MXFGxTagE_cjB5YGEuCC1UP1hxY34_NDYgDX0AZV4kY3s6MWR1XXoHYw8QEB4NAlWVXxszN18iMyY5OWchjA/preview', alt: '0', size: 'large' },
    { src: 'https://profile.line-scdn.net/0h6D1zjRrLaWscA3nNZ8MXFGxTagE_cjB5YGEuCC1UP1hxY34_NDYgDX0AZV4kY3s6MWR1XXoHYw8QEB4NAlWVXxszN18iMyY5OWchjA/preview', alt: '0', size: 'large' },
    { src: 'https://profile.line-scdn.net/0h6D1zjRrLaWscA3nNZ8MXFGxTagE_cjB5YGEuCC1UP1hxY34_NDYgDX0AZV4kY3s6MWR1XXoHYw8QEB4NAlWVXxszN18iMyY5OWchjA/preview', alt: '0', size: 'large' },
    { src: 'https://profile.line-scdn.net/0h6D1zjRrLaWscA3nNZ8MXFGxTagE_cjB5YGEuCC1UP1hxY34_NDYgDX0AZV4kY3s6MWR1XXoHYw8QEB4NAlWVXxszN18iMyY5OWchjA/preview', alt: '0', size: 'large' },
    { src: 'https://profile.line-scdn.net/0h6D1zjRrLaWscA3nNZ8MXFGxTagE_cjB5YGEuCC1UP1hxY34_NDYgDX0AZV4kY3s6MWR1XXoHYw8QEB4NAlWVXxszN18iMyY5OWchjA/preview', alt: '0', size: 'large' },
    { src: 'https://profile.line-scdn.net/0h6D1zjRrLaWscA3nNZ8MXFGxTagE_cjB5YGEuCC1UP1hxY34_NDYgDX0AZV4kY3s6MWR1XXoHYw8QEB4NAlWVXxszN18iMyY5OWchjA/preview', alt: '0', size: 'large' },
    { src: 'https://profile.line-scdn.net/0h6D1zjRrLaWscA3nNZ8MXFGxTagE_cjB5YGEuCC1UP1hxY34_NDYgDX0AZV4kY3s6MWR1XXoHYw8QEB4NAlWVXxszN18iMyY5OWchjA/preview', alt: '0', size: 'large' },
    { src: 'https://profile.line-scdn.net/0h6D1zjRrLaWscA3nNZ8MXFGxTagE_cjB5YGEuCC1UP1hxY34_NDYgDX0AZV4kY3s6MWR1XXoHYw8QEB4NAlWVXxszN18iMyY5OWchjA/preview', alt: '0', size: 'large' },
    { src: 'https://profile.line-scdn.net/0h6D1zjRrLaWscA3nNZ8MXFGxTagE_cjB5YGEuCC1UP1hxY34_NDYgDX0AZV4kY3s6MWR1XXoHYw8QEB4NAlWVXxszN18iMyY5OWchjA/preview', alt: '0', size: 'large' },
    { src: 'https://profile.line-scdn.net/0h6D1zjRrLaWscA3nNZ8MXFGxTagE_cjB5YGEuCC1UP1hxY34_NDYgDX0AZV4kY3s6MWR1XXoHYw8QEB4NAlWVXxszN18iMyY5OWchjA/preview', alt: '0', size: 'large' },
    { src: 'https://profile.line-scdn.net/0h6D1zjRrLaWscA3nNZ8MXFGxTagE_cjB5YGEuCC1UP1hxY34_NDYgDX0AZV4kY3s6MWR1XXoHYw8QEB4NAlWVXxszN18iMyY5OWchjA/preview', alt: '0', size: 'large' },
    { src: 'https://profile.line-scdn.net/0h6D1zjRrLaWscA3nNZ8MXFGxTagE_cjB5YGEuCC1UP1hxY34_NDYgDX0AZV4kY3s6MWR1XXoHYw8QEB4NAlWVXxszN18iMyY5OWchjA/preview', alt: '0', size: 'large' },
    { src: 'https://profile.line-scdn.net/0h6D1zjRrLaWscA3nNZ8MXFGxTagE_cjB5YGEuCC1UP1hxY34_NDYgDX0AZV4kY3s6MWR1XXoHYw8QEB4NAlWVXxszN18iMyY5OWchjA/preview', alt: '0', size: 'large' },
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
            <div 
              key={item.id} 
              style={{
                display: "flex",
                gap: "2rem",
                alignItems: "center",
                cursor: "pointer" // Added cursor pointer for better UX
              }} 
              onClick={() => handleProfile(item.id)} // Pass the specific user's id
            >
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

      {/* Optional Close Button */}
      {/* <div style={{
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
      </div> */}
    </div>
  );
}

export default AlbumPage;
