// UserContext.js
import React, { createContext, useState } from 'react';

const NoteContext = createContext();

const StateContext = ({ children }) => {
  const [user, setUser] = useState(null); // You can initialize it with the user object or null

  const login = (userData) => {
    // Logic to set the user data when the user logs in
    console.log('context',userData)
    setUser(userData);
  };

  const logout = () => {
    // Logic to clear the user data when the user logs out
    setUser(null);
  };

  return (
    <NoteContext.Provider value={{ user, login, logout }}>
      {children}
    </NoteContext.Provider>
  );
};

export { StateContext, NoteContext };
