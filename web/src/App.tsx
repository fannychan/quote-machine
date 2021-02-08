import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./views/Login";
import { Landing } from "./views/Landing";
import { Form } from "./views/Form";
import { Signup } from "./views/Signup";
import { Confirm } from "./views/Confirm";
import { UserQuotes } from "./views/UserQuotes";

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
        <Route path="/quotes/:user">
          <UserQuotes />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
