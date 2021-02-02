import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";

import { Button } from "../components/Button";
import { Header } from "../components/Header";

const Container = styled.div`
  text-align: center;
  margin-top: 100px;
`;

interface Quote {
  author: string;
  quote: string;
  submittedBy: string;
}

export const Landing = () => {
  const GET_RANDOM_QUOTE = gql`
    query GetRandomQuote {
      random {
        author
        quote
        submittedBy
      }
    }
  `;


  const { loading, error, data, refetch } = useQuery(GET_RANDOM_QUOTE, {
    fetchPolicy: "no-cache",
  });

  return (
    <>
      <Header />

      <Container>
        {loading && <p>Loading</p>}
        {data && data.random && (
          <>
            <p style={{ fontSize: "42px" }}>&#10078;</p>
            <h2>{data.random.quote}</h2>
            <p style={{ fontSize: "42px" }}>&#10077;</p>
            <p>{data.random.author}</p>
            <p>{`Submitted by user ${data.random.submittedBy}`}</p>
          </>
        )}
        <div>
          <Button onClick={() => refetch()}>new qoute</Button>
        </div>
      </Container>
    </>
  );
};
