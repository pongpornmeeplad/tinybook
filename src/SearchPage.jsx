import  { useEffect, useState } from 'react';
import axios from 'axios';
import { IoMdSearch } from 'react-icons/io';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useNavigate ,useLocation} from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "./Firebase"; // Import db from firebase.js


const firstColors = {
  'ทบ.': '#008000',
  'ทร.': '#003aff',
  'ทอ.': '#00c5ff',
  'ตร.': '#510808'
};

const secColors = {
  'ทบ.': '#1ed11e',
  'ทร.': '#0093ff',
  'ทอ.': '#00ecff',
  'ตร.': '#831818'
};

function AlbumPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);
  const [users, setUsers] = useState([]);
 

  useEffect(() => {
    // Function to fetch Instagram images
    const fetchInstagramImages = async () => {
      try {
       

        // Making request to Instagram API
        const targetUrl = 'http://localhost:7221/instagram-images';
        
        const response = await axios.get(targetUrl)
        
        
        // Handle compressed responses


        // Parse the response

        // Extract images from the response
        console.log('response', response)
        const fetchedImages = response?.data?.data.top?.sections.flatMap(section => 
          section.layout_content.medias?.map(mediaItem => ({
            src: mediaItem?.media?.image_versions2?.candidates?.[0]?.url || '',  // Ensure a valid URL
            alt: mediaItem?.media?.accessibility_caption || 'Instagram Image',  // Provide a default alt text
          })) || []  // Return an empty array if `medias` is undefined
        );
        
        console.log('fetchedImages', fetchedImages)
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
  
  const search = (data) => {
    return data.filter((item) => 
      (item.Name && item.Name.toLowerCase().includes(query.toLowerCase())) ||
      (item.Nickname && item.Nickname.toLowerCase().includes(query.toLowerCase()))
    );
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
    navigate(`/Profile/${userId}`);
  };

  const handleSeeAll = () => {
    navigate('/All');
  };

  const location = useLocation(); // Get the location object
    const { Service } = location.state || {}; // Retrieve Service from location state
    const selectedfirstColor = firstColors[Service] || "#510808"; // Default color
    const selectedsecColor = secColors[Service] || "#831818"; // Default color
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
                  color: selectedsecColor
                }}>{item?.Nickname}</div>
                <div style={{
                  color: selectedsecColor
                }}>{item?.Tel}</div>
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
