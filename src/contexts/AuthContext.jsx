import axiosInstance from '../axiosConfig';
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const location = window.location.href.split("/");
  console.log(location);
  console.log(location.includes("admin"));
  const storedUser = localStorage.getItem('user');
  const initialUserData = storedUser != "undefined" ? JSON.parse(storedUser) : null;
  const [user, setUser] = useState(initialUserData);

  useEffect(() => {
    if (location.includes("admin")) {
      getAdminDetails();
    } else if (location.includes("host")) {
      getHostDetails();
    } else {
      getUserDetails();
    }
  }, []);

  const getUserDetails = async () => {
    try {
      const res = await axiosInstance.get("/profile");
      setUser(res?.data?.user);
      console.log("auth :", res?.data?.user);
    } catch (error) {
      setUser(null);
      console.log(error);
    }
  }
  const getAdminDetails = async () => {
    try {
      console.log("called..");
      const res = await axiosInstance.get("/admin/auth");
      console.log("auth :", res?.data?.admin);
      setUser(res?.data?.admin);
    } catch (error) {
      setUser(null);
      console.log(error);
    }
  }

  const getHostDetails = async () => {
    try {
      const res = await axiosInstance.get("/host/auth");
      setUser(res?.data?.host);
      console.log("auth :", res?.data?.host);
    } catch (error) {
      setUser(null);
      console.log(error);
    }
  }


  const login = (userData, accessToken, refreshToken) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    delete axiosInstance.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
