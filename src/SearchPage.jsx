import { useEffect, useState, useRef } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "./Firebase";
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
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchType, setSearchType] = useState("name");
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { Service } = location.state || {};
  
  const selectedfirstColor = firstColors[Service] || "#510808";
  const selectedsecColor = secColors[Service] || "#831818";
  const selectedthirdColor = thirdColors[Service] || "#bb6969";

  const dropdownRef = useRef(null);

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

  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleOptionSelect = (optionValue) => {
    setSearchType(optionValue);
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const fetchUserByLineId = async () => {
        try {
            if (!window.liff) throw new Error('LIFF SDK is not loaded');
            await window.liff.init({ liffId: '2005857013-rP966d6R' });

            if (!window?.liff?.isLoggedIn()) {
                await window.liff.login({ redirectUri: window.location.href });
            }

          
        } catch (error) {
            console.error("Error fetching user by LineId: ", error);
        }
    };

    fetchUserByLineId();
}, [navigate]);
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
        <div 
          ref={dropdownRef}
          style={{
            position: 'relative',
            width: '100%',
            borderRadius: '30px',
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '20px',
          }}
        >
          <IoMdSearch style={{
            color: selectedfirstColor,
            fontSize: "2rem"
          }} />
          <input style={{
            background: "#ffffff",
            color: "black",
            borderRadius: "30px",
            boxSizing: "border-box",
            height: "3rem",
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

          {/* Dropdown trigger */}
          <div
            style={{
              backgroundColor: '#fff',
              color: selectedfirstColor,
              borderRadius: '30px',
              padding: '0 20px',
              height: '2rem',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              fontFamily: "'Kanit', sans-serif",
              fontSize: '1rem',
              border: 'none',
              position: 'absolute',
              right: '0',
              borderTopRightRadius: '30px',
              borderBottomRightRadius: '30px',
              height: '100%',
              justifyContent: 'center'
            }}
            onClick={handleDropdownToggle}
          >
            <div style={{
              height: '60%',
              backgroundColor : selectedfirstColor,
              width: '1px',
              marginRight: '15px',
            }}/>
            {searchType === 'name' ? 'ค้นหาชื่อ' : 'ค้นหาที่ทำงาน'}
            <FaChevronDown style={{ marginLeft: '10px' }} color={selectedfirstColor} />
          </div>
          
          {showDropdown && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: '0',
              backgroundColor: '#fff',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              fontFamily: "'Kanit', sans-serif",
              color: 'black',
              minWidth: '150px',
              zIndex: 9999
            }}>
              <div
                style={{
                  padding: '10px 20px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  whiteSpace: 'nowrap'
                }}
                onClick={() => handleOptionSelect('name')}
              >
                ค้นหาชื่อ
              </div>
              <div
                style={{
                  padding: '10px 20px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  whiteSpace: 'nowrap'
                }}
                onClick={() => handleOptionSelect('workplace')}
              >
                ค้นหาที่ทำงาน
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{
        width: "100%",
        height: "100vh",
        backgroundColor: selectedsecColor,
        borderRadius: "30px 30px 0px 0px ",
        boxSizing: "border-box",
        paddingTop: "20px",
        paddingLeft: "10px",
        paddingRight: "10px",
        gap: '4px',
        overflow: "scroll",
        display: "flex",
        flexDirection: "column",
        maxWidth: "1000px",
        scrollbarWidth: 'none', // for Firefox
        msOverflowStyle: 'none' // for IE and Edge
      }}>
        {search(users).map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
              cursor: "pointer",
             
              borderRadius: '40px',
             padding : '10px'
            }}
            onClick={() => handleProfile(item.id)}
          >
            <div
            style={{
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
