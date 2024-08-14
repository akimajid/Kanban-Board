import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Adjust the path as necessary
import TodoModal from "./modals/TodoModal"; // Import TodoModal

const Navbar = () => {
  const { authToken, clearAuthToken } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    clearAuthToken();
    navigate("/v1/login");
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <header className="bg-white border border-gray-400 text-white p-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-black">Product Roadmap</h1>
          {authToken && (
            <button
              onClick={openModal}
              className="bg-[#02939e] hover:bg-white hover:text-[#02939e] hover:border hover:border-[#02939e] font-semibold text-xs py-2 px-4 rounded-md transition-colors duration-300"
            >
              + Add New Group
            </button>
          )}
        </div>
        <nav className="space-x-4 flex items-center">
          {!authToken ? (
            <>
              <Link
                to="/v1/login"
                className="bg-[#02939e] hover:bg-white hover:text-[#02939e] hover:border hover:border-[#02939e] font-semibold text-xs py-2 px-4 rounded-md transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                to="/v1/signup"
                className="bg-[#02939e] hover:bg-white hover:text-[#02939e] hover:border hover:border-[#02939e] font-semibold text-xs py-2 px-4 rounded-md transition-colors duration-300"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-[#02939e] hover:bg-white hover:text-[#02939e] hover:border hover:border-[#02939e] font-semibold text-xs py-2 px-4 rounded-md transition-colors duration-300"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
      <TodoModal isOpen={isModalOpen} onClose={closeModal} />
    </header>
  );
};

export default Navbar;
