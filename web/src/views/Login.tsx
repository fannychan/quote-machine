import { Auth } from "aws-amplify";
import styled from "styled-components";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { useContext, useState } from "react";
import { InputField } from "../components/InputField";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

export const Container = styled.div`
  margin: 100px auto;
  background: white;
  color: #372c30;
  width: 100%;
  background: white;
  color: #372c30;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 16px 33px;
  padding: 20px 10px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    border-radius: 7px;
    padding: 50px 40px 77px;
    width: 476px;
  }
`;

export const Login = () => {
  let history = useHistory();
  const { setLoggedIn } = useContext(AuthContext);
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
      setLoggedIn(true);
      history.replace("/");
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
      <Header fullHeader={false} />
      <Container>
        <h1 style={{ fontWeight: 300, textAlign: "center" }}>Quote Machine</h1>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
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
          />

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
          <Button type="submit">Login</Button>
        </form>
      </Container>
    </>
  );
};
