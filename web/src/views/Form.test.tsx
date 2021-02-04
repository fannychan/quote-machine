import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GraphQLError } from "graphql";
import { ADD_QUOTE, Form } from "./Form";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

const mocks = [
  {
    request: {
      query: ADD_QUOTE,
      variables: {
        author: "Mona Lisa",
        quote: "I have never seen such a strong man",
      },
    },
    result: {
      data: {
        addQuote: {
          author: "Mona Lisa",
          quote: "I have never seen such a strong man",
        },
      },
    },
  },
  {
    request: {
      query: ADD_QUOTE,
      variables: {
        author: "Herman",
        quote: "Herman's song",
      },
    },
    result: {
      data: { addQuote: null },
      errors: [new GraphQLError("Error")],
    },
  },
];

it("runs the mocked query", async () => {
  const history = createMemoryHistory();

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Router history={history}>
        <Form />
      </Router>
    </MockedProvider>
  );

  const inputAuthor = screen.getByLabelText("author") as HTMLInputElement;
  const inputQuote = screen.getByLabelText("quote");
  fireEvent.change(inputAuthor, { target: { value: "Mona Lisa" } });
  fireEvent.change(inputQuote, {
    target: { value: "I have never seen such a strong man" },
  });

  fireEvent.submit(screen.getByText("Add quote"));
  await waitFor(() => {
    expect(screen.getByText("Your quote has been added!")).toBeInTheDocument();
  });
  expect(inputAuthor.value).toBe("");
});

it("displays error message when server is not responding", async () => {
  const history = createMemoryHistory();

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Router history={history}>
        <Form />
      </Router>
    </MockedProvider>
  );

  const inputAuthor = screen.getByLabelText("author") as HTMLInputElement;
  const inputQuote = screen.getByLabelText("quote");
  fireEvent.change(inputAuthor, { target: { value: "Herman" } });
  fireEvent.change(inputQuote, {
    target: { value: "Herman's song" },
  });

  fireEvent.submit(screen.getByText("Add quote"));
  await waitFor(() => {
    expect(screen.getByText("Error :( Please try again")).toBeInTheDocument();
  });
  expect(inputAuthor.value).toBe("Herman");
});
