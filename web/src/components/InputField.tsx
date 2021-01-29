import { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledInput = styled.input`
  padding: 8px 12px;
  margin-top: 8px;
  margin-bottom: 14px;
`;

export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  letter-spacing: 1.3px;
`;

export const InputField = ({ value, label, onChange, ...rest }: Props) => {
  return (
    <StyledLabel>
      {label}
      <StyledInput {...rest} value={value} onChange={onChange} />
    </StyledLabel>
  );
};
