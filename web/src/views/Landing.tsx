import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";

import { StyledButton } from "../App";
import { Link } from "react-router-dom";
const Container = styled.div`
  text-align: center;
  margin-top: 100px;
`;

interface Quote {
  author: string;
  quote: string;
  submittedBy: string;
}

const StyledLink = styled(Link)`
  text-decoration: none;
  background-color: white;
  padding: 10px 25px;
  border-radius: 4px;
`;
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "10px 10px",
        }}
      >
        <StyledLink to="login">Login</StyledLink>
      </div>
      <Container>
        {loading && <p>Loading</p>}
        {data && data.random && (
          <>
            <p style={{ fontSize: "42px" }}>&#10078;</p>
            <h2>{data.random.quote}</h2>
            <p>&#10077;</p>
            <p>{data.random.author}</p>
            <p>{`Submitted by user ${data.random.submittedBy}`}</p>
          </>
        )}
        <div>
          <StyledButton onClick={() => refetch()}>Get a new qoute</StyledButton>
        </div>
      </Container>
    </>
  );
};
