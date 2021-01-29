import React, { useState } from "react";

export const AuthContext = React.createContext({
  loggedIn: false,
  setLoggedIn: (status: boolean) => {},
});

export const Context: React.FC = ({ children }) => {
  const [userLoggedIn, isLoggedIn] = useState(false);
  return (
    <AuthContext.Provider
      value={{ loggedIn: userLoggedIn, setLoggedIn: isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
