import React, { useState } from "react";
import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";
import { Button } from "../components/Button";
import { InputField, StyledLabel } from "../components/InputField";
import { Header } from "../components/Header";
interface Quote {
  quote: string;
  author: string;
}

const TextArea = styled.textarea`
  min-height: 200px;
  margin-top: 6px;
`;

export const ADD_QUOTE = gql`
  mutation AddQuote($author: String!, $quote: String!) {
    addQuote(author: $author, quote: $quote) {
      quote
      author
    }
  }
`;

export const Form = () => {
  const [addQuote, { error: mutationError }] = useMutation<{
    addQuote: Quote;
  }>(ADD_QUOTE, {
    onCompleted: (data) => {
      if (data.addQuote) {
        setForm({ author: "", quote: "" });
        setFeedback({ display: true, text: "Your quote has been added!" });
      }
    },
    errorPolicy: "all",
  });

  const [feedback, setFeedback] = useState({
    display: false,
    text: "",
  });

  
  const [formState, setForm] = useState({
    author: "",
    quote: "",
  });

  const isDiabled = formState.author === '' || formState.quote === '';

  return (
    <>
      <Header />
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
          }}
        >
          <InputField
            aria-label="author"
            label="Author"
            value={formState.author}
            onChange={(event) =>
              setForm({ ...formState, author: event.target.value })
            }
          ></InputField>

          <StyledLabel>
            Quote
            <TextArea
              aria-label="quote"
              value={formState.quote}
              onChange={(event) =>
                setForm({ ...formState, quote: event.target.value })
              }
            />
          </StyledLabel>
          <Button disabled={isDiabled} style={{ marginTop: "15px" }} type="submit">
            Add quote
          </Button>
          {mutationError && <p>Error :( Please try again</p>}
          {feedback.display && <p>{feedback.text}</p>}
        </form>
      </div>
    </>
  );
};
