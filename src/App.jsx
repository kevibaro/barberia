import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import Supabase from './pages/Supabase';
import Home from './pages/Home'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/supabase' element={<Supabase />} />
      </Routes>
    </>
  )
}

export default App
