import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/Auth/AuthLayout";
import { supabase } from "../components/Article/supabaseClient";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/");
  }

  return (
    <AuthLayout
      mode="login"
      title="Welcome back"
      subtitle="Log in to continue browsing events, tracking favorites, and managing your account."
      submitLabel="Log In"
      altLabel="Don't have an account?"
      altLink="/register"
      altLinkText="Create one"
      onSubmit={login}
      fields={[
        {
          name: "email",
          label: "Email address",
          type: "email",
          placeholder: "you@example.com",
          icon: "email",
          value: email,
          onChange: (e) => setEmail(e.target.value),
          required: true,
          autoComplete: "email",
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
          icon: "password",
          value: password,
          onChange: (e) => setPassword(e.target.value),
          required: true,
          autoComplete: "current-password",
        },
      ]}
    />
  );
}
