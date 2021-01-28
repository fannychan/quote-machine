import react, { useState } from "react";
import { Auth } from "aws-amplify";
import { StyledButton } from "../App";

export const Signup = () => {
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
      console.log(user);
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
    <div>
      <form onSubmit={handleSignUp}>
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
        <label>
          Email
          <input
            value={formState.email}
            onChange={(event) =>
              setFormState({ ...formState, email: event.target.value })
            }
          />
        </label>
        <StyledButton type="submit">Add</StyledButton>
      </form>
    </div>
  );
};
