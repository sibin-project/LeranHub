import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import BACKEND_URL from "../backendURL";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const base_url = BACKEND_URL
  //  Fetch user profile if token exists
  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        try {
          const res = await axios.get(`${base_url}/api/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (err) {
          console.error("Profile fetch failed:", err);
          logout();
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, [token]);

  // LOGIN
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${base_url}/api/auth/login`, {
        email,
        password,
      });
      const token = res.data.token;
      setToken(token);
      localStorage.setItem("token", token);
      setUser(res.data.user);
    } catch (err) {
      throw err;
    }
  };

  //  REGISTER
  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${base_url}/api/auth/register`, {
        name,
        email,
        password,
      });
      const token = res.data.token;
      setToken(token);
      localStorage.setItem("token", token);
      setUser(res.data.user);
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err);
      alert(err.response?.data?.message || "Registration failed");
      throw err;
    }
  };

  //  LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  // course details
  const [courseDetails, setCourseDetails] = useState(null);
  const courseDetailsFetch = async (_id) => {
    try {
      const res = await axios.get(`${base_url}/api/courses/${_id}`);
      setCourseDetails(res.data);
    } catch (e) {
      console.error("Failed to fetch course details:", e);
    }
  }
  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, courseDetails, courseDetailsFetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
