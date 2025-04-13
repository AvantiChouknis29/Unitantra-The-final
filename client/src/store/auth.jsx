// auth.jsx

import { createContext, useContext } from "react";
import React, { useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  //Before code const [user, setUser] = useState("");
  const [user, setUser] = useState(null); // Change to null

const authorizationToken=`Bearer ${token}`
  // Function to store the token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  // Function to retrieve the token
  const getToken = () => {
    return token;
  };

  const isLoggedIn = !!token;

  // Function to logout user
  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };

//Admin-logout
const LogoutAdmin=()=>{
  setToken("")
  return localStorage.removeItem("token")

}



  // JWT Authentication - to get the currently logged-in user data
  const userAuthentication = async () => {
    try {
      const response = await fetch("https://unitantra-backend.onrender.com/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("user data", data.userData);
        setUser(data.userData);
      }

      //changed
      else {
        console.error("Failed to fetch user data:", response.status);
        setUser(null); // Ensure user is set to null on error
      
    }} catch (error) {
      console.log("Error fetching user data");
      //changed
      setUser(null);
    }
  };

  useEffect(() => {
    userAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, getToken,authorizationToken,LogoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
