import React from "react";
import Amplify from "aws-amplify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./views/Login";
import { Landing } from "./views/Landing";
import { Form } from "./views/Form";
import { Signup } from "./views/Signup";
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

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/form">
          <Form />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/confirm">
          <Confirm />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
