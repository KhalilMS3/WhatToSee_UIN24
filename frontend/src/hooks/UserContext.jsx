// UserContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchAllUsers } from '../../sanity/services/userServices';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("")
  
  const getAllUsers = async () => {
    const data = await fetchAllUsers()
    setUser(data);
  };


  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn, user, setUser, loggedInUser, setLoggedInUser, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
