import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./contexts/AuthContext"; // Import AuthProvider
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/v1" />} />
            <Route path="/v1" element={<Home />} />
            <Route path="/v1/login" element={<Login />} />
            <Route path="/v1/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </AuthProvider>
    </DndProvider>
  );
};

export default App;
