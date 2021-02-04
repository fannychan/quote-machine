import styled from "styled-components";

export const StyledButton = styled.button<{ secondary?: boolean }>`
  border: none;
  font-size: 16px;
  padding: 8px 25px;
  color: #635555;
}
`;

export const Button = styled.button<{ outlined?: boolean, disabled?: boolean }>`
  background-color: ${(props) => props.disabled ? '' : '#fff2e0'} ;
  font-size: medium;
  border-radius: 6px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  margin-top: 15px;
  border: none;
  color: #633e0a;
  cursor: pointer;
  padding: 16px;

  border: ${(props) => (props.outlined ? "1 px solid #fff2e0" : "")};
  
  
`;
