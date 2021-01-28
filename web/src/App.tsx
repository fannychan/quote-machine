import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import styled from "styled-components";
import { Form } from "./views/Form";
import { Login } from "./views/Login";
import { Signup } from "./views/Signup";
import Amplify, { Auth } from "aws-amplify";
import { Confirm } from "./views/Confirm";

const awsConfig = {
  aws_app_analytics: "enable",

  aws_user_pools: "enable",
  aws_user_pools_id: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  aws_user_pools_mfa_type: "OFF",
  aws_user_pools_web_client_id: process.env.REACT_APP_COGNITO_CLIENT_ID,
  aws_user_settings: "enable",
};

Amplify.configure(awsConfig);

export const StyledButton = styled.button`
  border: none;
  font-size: 16px;
  padding: 8px 25px;
  color: #635555;
  margin-right: 10px;
}
`;

const Container = styled.div`
  text-align: center;
  margin-top: 100px;
`;

const App = () => {
  const GET_RANDOM_QUOTE = gql`
    query GetRandomQuote {
      random {
        author
        quote
        submittedBy
      }
    }
  `;

  // const GET_QUOTE = gql`

  // `

  interface Quote {
    author: string;
    quote: string;
    submittedBy: string;
  }

  interface RandomQuote {
    random: Quote;
  }

  const [getRandomQoute, { loading, data }] = useLazyQuery<RandomQuote>(
    GET_RANDOM_QUOTE,
    {
      fetchPolicy: "no-cache",
    }
  );

  const handleOnClick = () => {
    setViewState("landing");
    getRandomQoute();
  };

  const [viewState, setViewState] = useState("landing");
  const [showLogin, setShowLogin] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [confirm, setConfirm] = useState(false);
  return (
    <>
      {showLogin && <Login />}
      {signIn && <Signup />}
      {confirm && <Confirm />}
      <StyledButton
        style={{ marginTop: "10px" }}
        onClick={() => setShowLogin(!showLogin)}
      >
        Login
      </StyledButton>
      <StyledButton
        style={{ marginTop: "10px" }}
        onClick={() => setSignIn(!signIn)}
      >
        Sign up
      </StyledButton>
      <StyledButton
        style={{ marginTop: "10px" }}
        onClick={() => setConfirm(!confirm)}
      >
        Confirm
      </StyledButton>
      <Container>
        <div>
          <StyledButton onClick={() => handleOnClick()}>
            Get my qoute
          </StyledButton>
        </div>
        {viewState === "landing" && (
          <>
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
          </>
        )}
        <Form />
      </Container>
    </>
  );
};

export default App;
