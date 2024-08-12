import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between">
      <h1 className="text-2xl">Kanban Board</h1>
      <nav>
        <Link to="/v1" className="mr-4">
          Home
        </Link>
        <Link to="/v1/login" className="mr-4">
          Login
        </Link>
        <Link to="/v1/signup">Sign Up</Link>
      </nav>
    </header>
  );
};

export default Navbar;
