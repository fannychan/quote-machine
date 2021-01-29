import React, { useState } from "react";
import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";
import { StyledButton } from "../App";
import { InputField } from "../components/InputField";
interface Quote {
  quote: string;
  author: string;
}

const Label = styled.label`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
`;
const ADD_QOUTE = gql`
  mutation AddQoute($author: String!, $quote: String!) {
    addQuote(author: $author, quote: $quote) {
      quote
      author
    }
  }
`;

export const Form = () => {
  const [addQuote, { data, error: mutationError }] = useMutation<{
    addQuote: Quote;
  }>(ADD_QOUTE);

  const [formState, setForm] = useState({
    author: "",
    quote: "",
  });
  return (
    <div
      style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}
    >
      <form
        style={{ display: "flex", flexDirection: "column", width: "350px" }}
        onSubmit={(e) => {
          e.preventDefault();
          addQuote({
            variables: { quote: formState.quote, author: formState.author },
          });
          setForm({ author: "", quote: "" });
        }}
      >
        <InputField
          label="Author"
          value={formState.author}
          onChange={(event) =>
            setForm({ ...formState, author: event.target.value })
          }
        ></InputField>

        <Label>
          Quote
          <TextArea
            value={formState.quote}
            onChange={(event) =>
              setForm({ ...formState, quote: event.target.value })
            }
          />
        </Label>
        <StyledButton type="submit">Add</StyledButton>
        {mutationError && <p>Error :( Please try again</p>}
      </form>
    </div>
  );
};
