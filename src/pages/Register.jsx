import React from "react";
import AuthLayout from "../components/Auth/AuthLayout";

export default function Register() {
  return (
    <AuthLayout
      mode="register"
      title="Create account"
      subtitle="Build your profile and prepare the frontend flow for your registration backend."
      submitLabel="Create Account"
      altLabel="Already have an account?"
      altLink="/login"
      altLinkText="Log in"
      fields={[
        {
          name: "fullName",
          label: "Full name",
          type: "text",
          placeholder: "Your full name",
          icon: "user",
        },
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
          placeholder: "Create a password",
          icon: "password",
        },
      ]}
    />
  );
}
