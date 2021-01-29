import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const StyledLink = styled(Link)`
  text-decoration: none;
  background-color: white;
  padding: 10px 25px;
  border-radius: 4px;
`;

export const Header = () => {
  const { loggedIn } = useContext(AuthContext);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        margin: "10px 10px",
      }}
    >
      {loggedIn ? (
        <>
          <StyledLink to="/form">Add new quote</StyledLink>
          <StyledLink to="/login">Logout</StyledLink>
        </>
      ) : (
        <>
          <StyledLink to="/signup">Sign up</StyledLink>
          <StyledLink to="/login">Login</StyledLink>
        </>
      )}
    </div>
  );
};
