import React from 'react'
import './App.css'
import Home from './pages/Home.jsx'
import Events from './pages/Events.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import { Routes, Route } from 'react-router-dom'
import Profile from './pages/Profile.jsx'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/events' element={<Events />} />
      <Route path='/' element={<Home />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
  )
}

export default App
