// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("adminUser");
    return user ? JSON.parse(user) : null;
  });


  // Add this: isAuthenticated is true if currentUser exists
  const isAuthenticated = !!currentUser;

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", { email, password });

      console.log("Login response data:", res.data);

      const { token, user } = res.data;

      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminUser", JSON.stringify(user));
      setCurrentUser(user);

      return true;
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
