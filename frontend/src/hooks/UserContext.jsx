// UserContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchAllUsers } from '../../sanity/services/userServices';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const getAllUsers = async () => {
    const data = await fetchAllUsers()
    setUser(data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn, user, setUser, loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
