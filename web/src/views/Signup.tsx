import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Container } from "./Login";
import { InputField } from "../components/InputField";

export const Signup = () => {
  let history = useHistory();

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { user } = await Auth.signUp({
        username: formState.username,
        password: formState.password,
        attributes: {
          email: formState.email, // optional
        },
      });
      if (user) {
        history.replace({
          pathname: "/confirm",
          search: `?user=${user.getUsername()}`,
        });
      }
    } catch (error) {
      console.log("error signing up:", error);
    }
  };

  const [formState, setFormState] = useState({
    username: "",
    password: "",
    email: "",
  });

  return (
    <>
      <Header fullHeader={false} />

      <Container>
        <h1 style={{ textAlign: "center", fontWeight: 300 }}>Sign up</h1>
        <form onSubmit={handleSignUp}>
          <InputField
            label="username"
            value={formState.username}
            onChange={(event) =>
              setFormState({ ...formState, username: event.target.value })
            }
          />
          <InputField
            label="Email"
            value={formState.email}
            onChange={(event) => {
              setFormState({ ...formState, email: event.target.value });
            }}
          />
          <InputField
            label="Password"
            type="password"
            value={formState.password}
            onChange={(event) =>
              setFormState({ ...formState, password: event.target.value })
            }
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button type="submit">Sign up</Button>
          </div>
        </form>
      </Container>
    </>
  );
};
