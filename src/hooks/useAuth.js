import { useState } from "react";

export const useAuth = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

  const setToken = (token) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
  };

  const clearToken = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
  };

  return {
    authToken,
    setAuthToken: setToken,
    clearAuthToken: clearToken,
  };
};
