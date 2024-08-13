import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    const token = localStorage.getItem("token");
    return token;
  });

  const setToken = (token) => {
    localStorage.setItem("token", token);
    setAuthToken(token);
  };

  const clearToken = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ authToken, setAuthToken: setToken, clearAuthToken: clearToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
