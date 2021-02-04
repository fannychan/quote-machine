import { render, waitFor, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GraphQLError } from "graphql";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { GET_RANDOM_QUOTE, Landing } from "./Landing";

const mocks = [
  {
    request: {
      query: GET_RANDOM_QUOTE,
    },
    result: {
      data: {
        random: {
          author: "Mona Lisa",
          quote: "I have never seen such a strong man",
        },
      },
    },
  },
];

it("will show a quote on landing", async () => {
  const history = createMemoryHistory();

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Router history={history}>
        <Landing />
      </Router>
    </MockedProvider>
  );

  await waitFor(() => {
    expect(
      screen.getByText("I have never seen such a strong man")
    ).toBeInTheDocument();
  });
});

it("will show error message if quote cannot be fetched", async () => {
  const history = createMemoryHistory();

  const mock = {
    request: {
      query: GET_RANDOM_QUOTE,
    },
    result: {
      data: null,
      errors: [new GraphQLError("No")],
    },
  };

  render(
    <MockedProvider mocks={[mock]} addTypename={false}>
      <Router history={history}>
        <Landing />
      </Router>
    </MockedProvider>
  );

  await waitFor(() => {
    expect(
      screen.getByText("We couldn't get you a quote this time! Try again later")
    ).toBeInTheDocument();
  });
});
