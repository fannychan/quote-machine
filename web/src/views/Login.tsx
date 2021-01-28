import { Auth } from "aws-amplify";
import { StyledButton } from "../App";
import { useState } from "react";

export const Login = () => {
  const handeLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await Auth.signIn(formState.username, formState.password);
      console.log(user)
    } catch (error) {
      console.log("error signing in", error);
    }
  };

  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });
  

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
            value={formState.password}
            onChange={(event) =>
              setFormState({ ...formState, password: event.target.value })
            }
          />
        </label>
        <StyledButton type="submit">Add</StyledButton>
      </form>
    </div>
  );
};
