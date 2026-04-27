import React from "react";
import AuthLayout from "../components/Auth/AuthLayout";

export default function Login() {
  return (
    <AuthLayout
      mode="login"
      title="Welcome back"
      subtitle="Log in to continue browsing events, tracking favorites, and managing your account."
      submitLabel="Log In"
      altLabel="Don't have an account?"
      altLink="/register"
      altLinkText="Create one"
      fields={[
        {
          name: "email",
          label: "Email address",
          type: "email",
          placeholder: "you@example.com",
          icon: "email",
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
          icon: "password",
        },
      ]}
    />
  );
}
