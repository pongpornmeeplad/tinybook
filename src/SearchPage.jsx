import { useEffect, useState } from 'react';
import axios from 'axios';
import { IoMdSearch } from 'react-icons/io';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "./Firebase";
import { Select } from 'antd';
import { FaChevronDown } from 'react-icons/fa';

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
  const [searchType, setSearchType] = useState("name");

  const navigate = useNavigate();

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
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  const handleProfile = (userId) => {
    navigate(`/Profile/${userId}`, { state: { Service } });
  };

  const handleSeeAll = () => {
    navigate('/All', { state: { Service } });
  };

  const location = useLocation();
  const { Service } = location.state || {};
  const selectedfirstColor = firstColors[Service] || "#510808";
  const selectedsecColor = secColors[Service] || "#831818";
  const selectedthirdColor = thirdColors[Service] || "#bb6969";

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
          }} 
          type="text" 
          placeholder={searchType === "name" ? "ค้นหารายชื่อ" : "ค้นหาสถานที่ทำงาน"} 
          onFocus={() => setShowList(true)} 
          onChange={(e) => setQuery(e.target.value)} />
        </div>

        <Select
          value={searchType}
          onChange={(value) => setSearchType(value)}
          dropdownMatchSelectWidth={false}
          style={{
            borderRadius: '30px',
            overflow: 'hidden',
            fontFamily: "'Kanit', sans-serif",
            backgroundColor: '#fff',
            color: selectedfirstColor,
            width: '150px',
            border: 'none',
            fontSize: '1rem',
            padding: '0 20px',
          }}
          suffixIcon={<FaChevronDown color={selectedfirstColor} />}
          dropdownStyle={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            fontFamily: "'Kanit', sans-serif",
            color: 'black'
          }}
        >
          <Select.Option value="name" style={{ fontFamily: "'Kanit', sans-serif", fontSize: '1rem' }}>ค้นหาชื่อ</Select.Option>
          <Select.Option value="workplace" style={{ fontFamily: "'Kanit', sans-serif", fontSize: '1rem' }}>ค้นหาที่ทำงาน</Select.Option>
        </Select>

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
        {search(users).map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
              cursor: "pointer",
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
                objectFit: 'cover',
              }} />
            </div>
            <div style={{ flex: 1, minWidth: '0' }}>
              <div style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>{item.Name}</div>
              {searchType === "name" && (
                <>
                  <div style={{
                    color: selectedthirdColor,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>{item?.Nickname}</div>
                  <div style={{
                    color: selectedthirdColor,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>{item?.Tel}</div>
                </>
              )}
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
