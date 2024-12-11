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




  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/page1" />} />
        <Route
          path="/page1"
          element={<Page1 inputValues={inputValues} setInputValues={setInputValues} setIsLiffReady/>}
        />
        <Route
          path="/page2"
          element={<Page2 inputValues={inputValues} setInputValues={setInputValues} />}
        />
        <Route path="/Register" element={<Registerpage />} />
        <Route path="/Album" element={<SearchPage />} />
        <Route path="/All" element={<All />} />
        <Route path="/List" element={<List />} />
        {/* Dynamic route for Profile based on LineId */}
        <Route path="/Profile/:id" element={<Profile />} />
        <Route path="/myProfile" element={<MyProfile />} />

      </Routes>
    </Router>
  );
}

export default App;
