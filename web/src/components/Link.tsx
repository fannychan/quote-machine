import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  background-color: #fff2e0;
  font-size: medium;
  border-radius: 6px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  margin-top: 15px;
  color: #633e0a;
  margin-left: 10px;
  text-decoration: none;
  padding: 16px;
  border:  none;
  box-sizing: border-box;
`;

export const OutlinedLink = styled(StyledLink)`
  color: #fff2e0;
  border: 2px solid #fff2e0;
  background-color: transparent;
`;
