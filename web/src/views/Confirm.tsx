import { Auth } from "aws-amplify";
import { Button } from "../components/Button";
import { InputField } from "../components/InputField";
import { useState } from "react";
import { Container } from "./Login";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

export const Confirm = () => {
  const handeLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await Auth.confirmSignUp(formState.username, formState.code);
      setDisplaySuccuess(true);
    } catch (error) {
      setError(true);
      console.log("error confirming sign up", error);
    }
  };

  const resendCode = async () => {
    try {
      await Auth.resendSignUp(formState.username);
      console.log("code resent successfully");
    } catch (err) {
      console.log("error resending code: ", err);
    }
  };

  const { search } = useLocation();
  const searchQuery = queryString.parse(search);

  const [formState, setFormState] = useState({
    username: searchQuery?.user ? (searchQuery.user as string) : "",
    code: "",
  });

  const isDisabled = formState.code === "" || formState.username === "";

  const [displaySuccess, setDisplaySuccuess] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Container>
      {displaySuccess ? (
        <div>
          <p>You have successfully confirmed your account. Login to use our premium quote service!</p>
        </div>
      ) : (
        <>
          <p>
            <strong>This is the last step!</strong>
          </p>
          <p style={{ marginBottom: "30px" }}>
            Confirm your account with the code that has been sent to your email!
          </p>
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
              label="Code"
              value={formState.code}
              onChange={(event) =>
                setFormState({ ...formState, code: event.target.value })
              }
            />

            <Button disabled={isDisabled} type="submit">
              Confirm
            </Button>
          </form>
          {error && (
            <>
              <p>AAAAHHH nooooo, code not workinggggg.</p>
              <Button onClick={() => resendCode()}>Resend me code</Button>
            </>
          )}
        </>
      )}
    </Container>
  );
};
