import React, { useEffect, useState } from "react";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { Auth } from "aws-amplify";

export const AuthContext = React.createContext({
  loggedIn: false,
  setLoggedIn: (status: boolean) => {},
});

export const Context: React.FC = ({ children }) => {
  const [userLoggedIn, isLoggedIn] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("access_token")) {
      const decoded = jwtDecode<JwtPayload>(
        sessionStorage.getItem("access_token") as string
      );
      if (decoded?.exp && Date.now() < decoded.exp * 1000) {
        isLoggedIn(true);
      } else {
        //TODO: Not sure if this is correct
        Auth.currentAuthenticatedUser()
          .then((user) => {
            if (user.signInUserSession) {
              sessionStorage.setItem(
                "access_token",
                user.signInUserSession.accessToken.jwtToken
              );
            }
            isLoggedIn(true);
          })
          .catch((err) => {
            console.log(err);
            isLoggedIn(false);
          });
      }
    } else {
      isLoggedIn(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ loggedIn: userLoggedIn, setLoggedIn: isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
