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
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchType, setSearchType] = useState("name"); // New state for search type

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
            src: mediaItem?.media?.image_versions2?.candidates?.[0]?.url || '',  // Ensure a valid URL
            alt: mediaItem?.media?.accessibility_caption || 'Instagram Image',  // Provide a default alt text
          })) || []  // Return an empty array if `medias` is undefined
        );

        console.log('fetchedImages', fetchedImages);
        setImages(fetchedImages || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Instagram images:', error);
        setError('Error fetching images.');
        setLoading(false);
      }
    };

    fetchInstagramImages();
  }, []);

  const navigate = useNavigate();

  // Updated search function to consider searchType
  const search = (data) => {
    return data.filter((item) => {
      if (searchType === "name") {
        return (
          (item.Name && item.Name.toLowerCase().includes(query.toLowerCase())) ||
          (item.Nickname && item.Nickname.toLowerCase().includes(query.toLowerCase()))
        );
      } else if (searchType === "workplace") {
        return (
          item.Workplace && item.Workplace.toLowerCase().includes(query.toLowerCase())
        );
      }
      return false;
    });
  };

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

  const handleCancleClick = () => {
    setShowList(false); // Hide list on cancel
  };

  // Updated handleProfile to accept userId
  const handleProfile = (userId) => {
    console.log("Service value before navigating to Profile:", Service); // ตรวจสอบค่า
    navigate(`/Profile/${userId}`, { state: { Service } });
  };

  const handleSeeAll = () => {
    navigate('/All', { state: { Service } });
  };

  const location = useLocation(); // Get the location object
  const { Service } = location.state || {}; // Retrieve Service from location state
  const selectedfirstColor = firstColors[Service] || "#510808"; // Default color
  const selectedsecColor = secColors[Service] || "#831818"; // Default color
  const selectedthirdColor = thirdColors[Service] || "#bb6969"; // Default color
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
          }} type="text" placeholder={searchType === "name" ? "ค้นหารายชื่อ" : "ค้นหาสถานที่ทำงาน"} onFocus={() => setShowList(true)} onChange={(e) => setQuery(e.target.value)} />
        </div>

        {/* Dropdown Menu for Search Type */}
        {/* <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          style={{
            borderRadius: '30px',
            padding: '10px',
            paddingRight: '35px',
            outline: 'none',
            border: 'none',
            fontFamily: "'Kanit', sans-serif",
            cursor: 'pointer',
            backgroundColor: '#fff',
            color: selectedfirstColor,
            width: '45%',
          }}
        >
          <option value="name">ค้นหาชื่อ</option>
          <option value="workplace">ค้นหาที่ทำงาน</option>
        </select> */}
        <select
  value={searchType}
  onChange={(e) => setSearchType(e.target.value)}
  style={{
    // ทำให้ไม่มีลูกศรเดิม
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',

    // ปรับให้ไม่มีขอบ
    border: 'none',
    outline: 'none',
    boxShadow: 'none',

    // รูปร่างและขนาด
    borderRadius: '30px',
    padding: '10px 35px 10px 10px', // padding ขวาเพื่อเว้นที่สำหรับไอคอน
    fontFamily: "'Kanit', sans-serif",
    cursor: 'pointer',
    backgroundColor: '#fff',
    color: selectedfirstColor,
    width: '45%',
    height: '50px', // ปรับความสูงตามต้องการ
    lineHeight: '30px', // ปรับความสูงของบรรทัดให้สอดคล้อง

    // ลูกศรที่กำหนดเอง
    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path fill="black" d="M4 5l3 3 3-3"/></svg>')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 15px center', // ปรับตำแหน่งลูกศรให้สวยงาม
    backgroundSize: '14px 14px',

    // เพิ่มการเปลี่ยนแปลงเมื่อโฟกัส (ถ้าต้องการ)
    transition: 'background-color 0.3s ease',
  }}
>
  <option value="name">ค้นหาชื่อ</option>
  <option value="workplace">ค้นหาที่ทำงาน</option>
</select>



        <div style={{
          color: selectedthirdColor,
          marginLeft: "auto",
          cursor: "pointer"
        }} onClick={handleCancleClick}>
          ยกเลิก
        </div>
      </div>

      <div style={{
        width: "100%",
        height: "100vh",
        backgroundColor: selectedsecColor,
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
          <div style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            cursor: "pointer", // Added cursor pointer for better UX
            // overflow: "hidden", // Prevent container from expanding
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
                objectFit: 'cover',
              }} />
            </div>
            <div style={{ flex: 1, minWidth: '0' }}> {/* Ensure text container doesn't force layout change */}
              <div style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>{item.Name}</div>
              {/* Show Nickname only when searchType is "name" */}
              {searchType === "name" && (
                <div style={{
                  color: selectedthirdColor,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>{item?.Nickname}</div>
              )}
              {/* Show Tel only when searchType is "name" */}
              {searchType === "name" && (
                <div style={{
                  color: selectedthirdColor,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>{item?.Tel}</div>
              )}
              {/* Show Workplace only when searchType is "workplace" */}
              {searchType === "workplace" && (
                <div style={{
                  color: selectedthirdColor,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>{item?.Workplace}</div>
              )}
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
    </div>
  );
}

export default AlbumPage;
