import { Auth } from "aws-amplify";
import { StyledButton } from "../components/Button";
import { useState } from "react";

export const Confirm = () => {
  const handeLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await Auth.confirmSignUp(formState.username, formState.code);
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

  const [formState, setFormState] = useState({
    username: "",
    code: "",
  });

  const [error, setError] = useState(false);

  return (
    <div>
      <form onSubmit={handeLogin}>
        <label>
          Username
          <input
            value={formState.username}
            onChange={(event) =>
              setFormState({ ...formState, username: event.target.value })
            }
          />
        </label>
        <label>
          Password
          <input
            value={formState.code}
            onChange={(event) =>
              setFormState({ ...formState, code: event.target.value })
            }
          />
        </label>
        <StyledButton type="submit">Add</StyledButton>
      </form>
      {error && (
        <>
          <p>AAAAHHH nooooo, code not workinggggg.</p>
          <StyledButton onClick={() => resendCode()}>
            Resend me code
          </StyledButton>
        </>
      )}
    </div>
  );
};
