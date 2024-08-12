import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Navbar />
        <Routes>
        <Route path="/v1" element={<Home />} />
        <Route path="/v1/signup" element={<SignUp />} />
        <Route path="/v1/login" element={<Login />} />
        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;
