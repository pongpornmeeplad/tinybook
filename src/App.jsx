

import React, { useState ,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Page1 from './Page1';
import Page2 from './Page2';
import './App.css';
import Registerpage from './RegisterPage';
import AlbumPage from './AlbumPage';
import List from './List';
import All from './All';
import Profile from './Profile';




const liff = window.liff;



function App() {
  console.log(liff)

  const [inputValues, setInputValues] = useState({
    Service: '',
    Name: '',
    Nickname: '',
    Tel: ''
  });
  useEffect(() => {
    const initializeLiff = async () => {
      try {
        await liff.init({ liffId: '2005857013-rP966d6R' });
        if (liff.isLoggedIn()) {
          const profile = await liff.getProfile();
          console.log('profile', profile)
        } else {
          liff.login();
        }
      } catch (err) {
        console.error(err);
      }
    };

    initializeLiff();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/page1" />} />
        <Route path="/page1" element={<Page1 inputValues={inputValues} setInputValues={setInputValues} />} />
        <Route path="/page2" element={<Page2 inputValues={inputValues} setInputValues={setInputValues} />} />
        <Route path="/Register" element={<Registerpage />} />
        <Route path="/Album" element={<AlbumPage />} />
        <Route path="/All" element={<All />} />
        <Route path="/List" element={<List />} />
        <Route path="/Profile" element={<Profile />} />


      </Routes>
    </Router>
  );
}

export default App;
