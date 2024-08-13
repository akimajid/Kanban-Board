import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/v1");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login(email, password);
      localStorage.setItem("token", token);
      setMessage("Login successful!");
      window.location.reload();
      navigate("/v1");
    } catch (error) {
      setMessage("Login failed: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              placeholder="Email..."
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#02939e]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              placeholder="Password..."
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 mb-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#02939e]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#02939e] text-white font-semibold rounded-md shadow-sm hover:bg-white hover:text-[#02939e] hover:border hover:border-[#02939e] focus:outline-none focus:ring-2 focus:ring-[#02939e]"
          >
            Login
          </button>
        </form>
        {message && (
          <p className="mt-4 text-green-500 text-center">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
