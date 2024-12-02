// AlbumPage.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { IoMdSearch } from 'react-icons/io';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "./Firebase"; // Import db from firebase.js

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

function AlbumPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [workplaceQuery, setWorkplaceQuery] = useState(""); // New state for workplace query
  const [showList, setShowList] = useState(true); // Default to true to show the list
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  const location = useLocation(); // Get the location object
  const { Service } = location.state || {}; // Retrieve Service from location state

  const selectedfirstColor = firstColors[Service] || "#510808"; // Default color
  const selectedsecColor = secColors[Service] || "#831818"; // Default color
  const selectedthirdColor = thirdColors[Service] || "#bb6969"; // Default color

  useEffect(() => {
    // Function to fetch Instagram images
    const fetchInstagramImages = async () => {
      try {
        // Making request to Instagram API
        const targetUrl = 'http://localhost:7221/instagram-images';
        const response = await axios.get(targetUrl);

        // Extract images from the response
        console.log('response', response);
        const fetchedImages = response?.data?.data.top?.sections.flatMap(section =>
          section.layout_content.medias?.map(mediaItem => ({
            src: mediaItem?.media?.image_versions2?.candidates?.[0]?.url || '', // Ensure a valid URL
            alt: mediaItem?.media?.accessibility_caption || 'Instagram Image', // Provide a default alt text
          })) || [] // Return an empty array if `medias` is undefined
        );

        console.log('fetchedImages', fetchedImages);
        setImages(fetchedImages || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Instagram images:', error);
        setLoading(false);
      }
    };

    fetchInstagramImages();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users")); // "users" is the Firestore collection name
        const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  const search = (data) => {
    return data.filter((item) => {
      const matchesName =
        query === '' ||
        (item.Name && item.Name.toLowerCase().includes(query.toLowerCase())) ||
        (item.Nickname && item.Nickname.toLowerCase().includes(query.toLowerCase()));

      const matchesWorkplace =
        workplaceQuery === '' ||
        (item.Workplace && item.Workplace.toLowerCase().includes(workplaceQuery.toLowerCase()));

      return matchesName && matchesWorkplace;
    });
  };

  const handleCancleClick = () => {
    setShowList(false); // Hide list on cancel
  };

  const handleProfile = (userId) => {
    console.log("Service value before navigating to Profile:", Service);
    navigate(`/Profile/${userId}`, { state: { Service } });
  };

  const handleSeeAll = () => {
    navigate('/All', { state: { Service } });
  };

  if (loading) {
    return <div>Loading images...</div>;
  }

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      backgroundColor: selectedfirstColor,
      display: 'flex',
      flexDirection: 'column',
      color: 'white',
      fontFamily: "'Kanit', sans-serif",
      position: 'relative',
      alignItems: "center"
    }}>
      {/* Search Input Fields */}
      <div style={{
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "space-around",
        marginInline: "15px 15px",
        marginBottom: "20px",
        gap: "10px",
        marginTop: "1.5rem",
        maxWidth: '1000px',
        width: "95%"
      }}>
        {/* Name/Nickname Search */}
        <div style={{
          width: '100%',
          borderRadius: '30px',
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '20px',
        }}>
          <IoMdSearch style={{
            color: selectedfirstColor,
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
          }} type="text" placeholder="ค้นหารายชื่อ" onChange={(e) => setQuery(e.target.value)} />
        </div>
        {/* Workplace Search */}
        <div style={{
          width: '100%',
          borderRadius: '30px',
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '20px',
        }}>
          <IoMdSearch style={{
            color: selectedfirstColor,
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
          }} type="text" placeholder="ค้นหาจากสถานที่ทำงาน" onChange={(e) => setWorkplaceQuery(e.target.value)} />
        </div>
        {/* Cancel Button */}
        <div style={{
          color: selectedthirdColor,
          alignSelf: "flex-end",
          cursor: "pointer",
          marginTop: '10px'
        }} onClick={handleCancleClick}>
          ยกเลิก
        </div>
      </div>

      {/* User List */}
      {showList ? (
        <div style={{
          width: "100%",
          height: "100vh",
          backgroundColor: selectedsecColor,
          borderRadius: "30px 30px 0px 0px ",
          boxSizing: "border-box",
          padding: "20px",
          overflow: "auto",
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
                cursor: "pointer"
              }}
              onClick={() => handleProfile(item.id)}
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
                  color: selectedthirdColor
                }}>{item?.Nickname}</div>
                <div style={{
                  color: selectedthirdColor
                }}>{item?.Workplace}</div> {/* Display Workplace */}
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
        // You can display something else here when the list is hidden
        // For example, the Instagram images
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          backgroundColor: '#4b0d0d',
          width: '100%',
          maxWidth: '1000px',
          boxSizing: "border-box",
          padding: "1rem",
          marginInline: "auto",
          height: "100%",
          overflowY: "scroll"
        }}>
          {images.map((image, index) => (
            <div key={index} style={{
              gridRow: (index === 7 || index % 10 === 0) ? "span 2" : "auto"
            }}>
              <img crossOrigin='anonymous' style={{ width: "100%", height: "100%", objectFit: "cover" }} src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AlbumPage;
