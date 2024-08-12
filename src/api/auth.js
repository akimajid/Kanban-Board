import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

// Sign Up function
export const signUp = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.error("Sign up failed:", error.response.data);
      throw new Error(error.response.data.message || "Sign up failed");
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
      throw new Error("No response from server. Please try again.");
    } else {
      // Other errors
      console.error("Error:", error.message);
      throw new Error("An error occurred. Please try again.");
    }
  }
};

// Login function
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });

    const authToken = response.data.auth_token || response.data.token;

    if (authToken) {
      localStorage.setItem("token", authToken);
      return authToken;
    } else {
      throw new Error("No token received");
    }
  } catch (error) {
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.error("Login failed:", error.response.data);
      throw new Error(
        error.response.data.message || "Login failed. Please check your credentials."
      );
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
      throw new Error("No response from server. Please try again.");
    } else {
      // Other errors
      console.error("Error:", error.message);
      throw new Error("An error occurred. Please try again.");
    }
  }
};
