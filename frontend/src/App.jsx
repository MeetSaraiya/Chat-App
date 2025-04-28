// import * from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import "./App.css";
import HomePage from "../pages/HomePage.jsx";
import SignupPage from "../pages/SignupPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import SettingsPage from "../pages/SettingsPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import { useAuthStore } from "../store/authStore";
import { LoaderCircle } from "lucide-react";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser, isCheckingAuth } = useAuthStore();
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex flex-column justify-center items-center h-screen">
        <LoaderCircle className="size-[100px] animate-spin" />
      </div>
    );

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/settings"
          element={ <SettingsPage /> }
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster/>
    </>
  );
}

export default App;
