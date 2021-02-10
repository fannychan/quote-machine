import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { OutlinedLink, StyledLink } from "../components/Link";

const HomeLink = styled(Link)`
  text-decoration: none;
  color: #fff2e0;
  font-family: 'Dosis', sans-serif;
  font-size: 42px;
`;

export const Header = () => {
  const { loggedIn } = useContext(AuthContext);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "15px 30px 30px",
        alignItems: 'center',
      }}
    >
      <HomeLink to="/">QM</HomeLink>

      <div>
        {loggedIn ? (
          <>
            <StyledLink to="/form">Add new quote</StyledLink>
            <OutlinedLink to="/login">Logout</OutlinedLink>
          </>
        ) : (
          <>
            <OutlinedLink to="/signup">Sign up</OutlinedLink>
            <StyledLink to="/login">Login</StyledLink>
          </>
        )}
      </div>
    </div>
  );
};
