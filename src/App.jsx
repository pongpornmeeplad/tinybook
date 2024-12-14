import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Page1 from './Page1';
import Page2 from './Page2';
import './App.css';
import Registerpage from './RegisterPage';
import AlbumPage from './AlbumPage';
import List from './List';
import All from './All';
import Profile from './Profile';
import SearchPage from './SearchPage'
import MyProfile from "./MyProfile"

function App() {
  const [inputValues, setInputValues] = useState({
    Service: null,
    Name: '',
    Nickname: '',
    Tel: '',
    LineId: '',
    picpic: '',
  });
  const [isLiffReady, setIsLiffReady] = useState(false);

  // useEffect(() => {
  //   const initializeLiff = async () => {
  //     try {
  //       if (!window.liff) throw new Error('LIFF SDK is not loaded');
  //       await window.liff.init({ liffId: '2005857013-rP966d6R' });
  //       console.log('window?.liff?.isLoggedIn() :>> ', window?.liff?.isLoggedIn());
  //       if (window?.liff?.isLoggedIn()) {
  //         const profile = await window.liff.getProfile();

  //         setInputValues((prevValues) => ({
  //           // ...prevValues,
  //           LineId: profile.userId,  // Ensure consistent casing
  //           picpic: profile.pictureUrl,
  //         }));
  //       } else {
  //         window.liff.login({ redirectUri: window.location.href });
  //       }
  //       setIsLiffReady(true);
  //     } catch (err) {
  //       console.error('Error initializing LIFF:', err);
  //     }
  //   };

  //   initializeLiff();
  // }, []);
  // if (!isLiffReady) {
  //   return <div style={{
    
  //     backgroundColor: "#510808",
  //     width: "100vw",
  //     height: "100vh",
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     color: "white",
  //     fontFamily: "'Kanit', sans-serif",
  //     fontSize: "1.5rem"
  //   }}>Loading ...</div>;
  // }




  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/page1" />} />
        <Route
          path="/page1"
          element={<Page1 inputValues={inputValues} setInputValues={setInputValues} />}
        />
        <Route
          path="/page2"
          element={<Page2 inputValues={inputValues} setInputValues={setInputValues} />}
        />
        <Route path="/Register" element={<Registerpage />} />
        <Route path="/Album" element={<SearchPage />} />
        <Route path="/All" element={<All />} />
        {/* Dynamic route for Profile based on LineId */}
        <Route path="/Profile/:id" element={<Profile />} />
        <Route path="/myProfile" element={<MyProfile />} />

      </Routes>
    </Router>
  );
}

export default App;
