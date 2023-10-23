import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/LogIn/Login";
import Home from "./components/Home/Home";
import styles from "./app.module.css";
import Signup from "./components/SignUp/Signup";
import Header from "./components/Header/Header";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
export default function App() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>
  );
}
