import React, { createContext, useContext, useState } from "react";

const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser("");
  };
  return (
    <userContext.Provider value={{ user, login, logout }}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => useContext(userContext);
