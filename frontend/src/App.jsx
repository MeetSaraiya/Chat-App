// import * from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import './App.css'
import HomePage from '../pages/HomePage.jsx'
import SignupPage from '../pages/SignupPage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import SettingsPage from '../pages/SettingsPage.jsx'
import ProfilePage from '../pages/ProfilePage.jsx'

function App() {

  return (
    <>

      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  )
}

export default App
