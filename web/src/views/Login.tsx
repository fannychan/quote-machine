import { Auth } from "aws-amplify";
import styled from "styled-components";
import { StyledButton } from "../App";
import { useState } from "react";
import { InputField } from "../components/InputField";
const Container = styled.div`
  margin: 100px auto;
  background: white;
  color: #372c30;
  width: 476px;
  padding: 50px 20px 77px;
  border-radius: 7px;
  background: white;
  color: #372c30;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 16px 33px;
`;

export const Login = () => {
  const handeLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await Auth.signIn(formState.username, formState.password);
      console.log(user);
      sessionStorage.setItem(
        "access_token",
        user.signInUserSession.accessToken.jwtToken
      );
      localStorage.setItem(
        "refresh_token",
        user.signInUserSession.refreshToken.token
      );
    } catch (error) {
      setError(true);
      console.log("error signing in", error);
    }
  };

  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(false);

  return (
    <>
      <Container>
      <h1 style={{fontWeight: 200}}>Login to add your own quotes!</h1>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "400px",
            margin: "0 auto",
            justifyContent: "center",
          }}
          onSubmit={handeLogin}
        >
          <InputField
            label="Username"
            value={formState.username}
            onChange={(event) =>
              setFormState({ ...formState, username: event.target.value })
            }
          ></InputField>

          <InputField
            label="Password"
            type="Password"
            value={formState.password}
            onChange={(event) =>
              setFormState({ ...formState, password: event.target.value })
            }
          ></InputField>

          {error && (
            <p>
              Username or password was incorrect. Not letting you in, sorry.
            </p>
          )}
          <StyledButton type="submit">Login</StyledButton>
        </form>
      </Container>
    </>
  );
};