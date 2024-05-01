"use client";

import { Button } from "@mui/material";
import { FormEvent } from "react";
import TextField from "@mui/material/TextField";
import { signIn } from "next-auth/react";

function Form() {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: true,
    });
    console.log({ response });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField name="email" type="email" variant="filled" />
      <TextField
        id="filled-password-input"
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        variant="filled"
      />
      {/* TODO. validation need */}
      <Button type="submit">SignIn</Button>
    </form>
  );
}

export default Form;
