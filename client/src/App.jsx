import { useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import Detail from './components/Detail/Detail.jsx';
import Create from './components/Create/Create.jsx';
import About from './components/About/About.jsx';
import './App.css'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/detail/:idPokemon' element={<Detail/>}/>
        <Route path='/create' element={<Create/>}/>
      </Routes>
    </div>
  );
}

export default App;
