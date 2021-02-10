import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { UserCircle } from "@styled-icons/boxicons-solid/UserCircle";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Quote } from "../models/Model";
const Container = styled.div`
  margin: 100px auto;
  width: 600px;
`;

interface RandomQuote {
  random: Quote;
}

export const GET_RANDOM_QUOTE = gql`
  query GetRandomQuote {
    random {
      author
      quote
      submittedBy
    }
  }
`;

export const Landing = () => {
  const { loading, error, data, refetch } = useQuery<RandomQuote>(
    GET_RANDOM_QUOTE,
    {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    }
  );

  return (
    <>
      <Header />

      <Container>
        {loading && <p>Loading</p>}
        {data && data.random && (
          <div style={{ display: "flex" }}>
            <div
              style={{
                width: "30%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p style={{ fontSize: "94px", margin: 0, color: "#ffffff73" }}>
                &#10078;
              </p>
            </div>

            <div style={{ padding: "20px", width: "100%" }}>
              <h3>{data.random.author}</h3>

              <h2 style={{ fontWeight: 300 }}>{data.random.quote}</h2>

              <span
                style={{
                  width: "30%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <UserCircle
                  height="25px"
                  style={{ color: "#ffffff73", marginRight: "7px" }}
                />
                <p
                  style={{ margin: 0 }}
                >{`Submitted by ${data.random.submittedBy}`}</p>
              </span>
            </div>
          </div>
        )}
        {error && (
          <h2>We couldn't get you a quote this time! Try again later</h2>
        )}
        <div style={{ textAlign: "center" }}>
          <Button onClick={() => refetch()}>new quote</Button>
        </div>

        {data && data.random && (
          <div
            style={{
              backgroundColor: "#d2d2d263",
              padding: "20px",
              borderRadius: "4px",
              marginTop: "45px",
            }}
          >
            <h3>Did you like this quote?</h3>
            <Link to={`/quotes/${data.random.submittedBy}`}>
              See all quotes submitted by {data.random.submittedBy}
            </Link>
          </div>
        )}
      </Container>
    </>
  );
};
