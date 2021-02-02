import { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledInput = styled.input`
  padding: 4px 8px;
  margin-top: 8px;
  margin-bottom: 14px;
  padding: 1px 13px;
  line-height: 40px;
  border-radius: 4px;
  border: 1px solid grey;
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
