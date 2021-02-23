import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Quote } from "../models/Model";
import { TextLink } from "../components/Link";
const Container = styled.div`
  margin: auto;

  @media (min-width: 768px) {
    width: 800px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Hero = styled.div<{ backgroundUrl: string }>`
  background: no-repeat;
  background-size: cover;
  background-image: ${(props) =>
    props.backgroundUrl ? `url(${props.backgroundUrl})` : ""};
  padding: 15px;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.4);
  position: absolute;
  bottom: 0;
  top: 88px;
  left: 0;
  right: 0;
  height: fit-content;

  @media (min-width: 768px) {
    padding: 150px;
    height: auto;
  }
`;
//?fit=clamp&dpr=1&q=50

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

const GET_BACKGROUND = gql`
  query GetBackground {
    background {
      id
      urls {
        full
        regular
        raw
      }
      user {
        name
        username
      }
      links {
        download
      }
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

  const { data: backgroundData } = useQuery(GET_BACKGROUND);

  return (
    <>
      <Header />
      <Hero
        backgroundUrl={
          backgroundData ? backgroundData.background.urls.regular : ""
        }
      >
        <Container>
          {loading && <p>Loading</p>}
          {data && data.random && (
            <Wrapper style={{ display: "flex" }}>
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

              <div
                style={{
                  padding: "20px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <h3>{data.random.author}</h3>

                <h1 style={{ fontWeight: 300, lineHeight: 1.5 }}>
                  {data.random.quote}
                </h1>
              </div>
            </Wrapper>
          )}
          {error && (
            <h2>We couldn't get you a quote this time! Try again later</h2>
          )}
          <div style={{ textAlign: "center" }}>
            <Button onClick={() => refetch()}>new quote</Button>
          </div>

          {/* Photo by <a href="https://unsplash.com/@anniespratt?utm_source=your_app_name&utm_medium=referral">Annie Spratt</a> on <a href="https://unsplash.com/?utm_source=your_app_name&utm_medium=referral">Unsplash</a> */}

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
              <TextLink to={`/quotes/${data.random.submittedBy}`}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  See all quotes submitted by {data.random.submittedBy}
                </span>
              </TextLink>
            </div>
          )}
        </Container>
      </Hero>
    </>
  );
};
