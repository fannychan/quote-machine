import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import styled from "styled-components";
import Amplify from "aws-amplify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./views/Login";
import { Landing } from "./views/Landing";
import { Form } from "./views/Form";
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

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/profile">
          <Form />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
