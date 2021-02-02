import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const StyledLink = styled(Link)<{ outlined?: boolean }>`
  background-color: ${props => props.outlined ? "": '#fff2e0' };
  font-size: medium;
  border-radius: 6px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  margin-top: 15px;
  line-height: 40px;
  color: ${props => props.outlined ? '#fff2e0': '#633e0a'};
  margin-left: 10px;
  text-decoration: none;
  padding: 2px 8px;
  border: ${(props) => (props.outlined ? "2px solid #fff2e0" : "none")};
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
          <StyledLink outlined to="/signup">
            Sign up
          </StyledLink>
          <StyledLink to="/login">Login</StyledLink>
        </>
      )}
    </div>
  );
};
