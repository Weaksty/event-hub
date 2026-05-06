import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/Auth/AuthLayout";
import { supabase } from "../components/Article/supabaseClient";

async function createProfile(userId, fullName) {
  return supabase.from("profiles").upsert(
    {
      id: userId,
      full_name: fullName,
    },
    { onConflict: "id" }
  );
}

export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function register() {
    if (isSubmitting) return;

    if (password.length < 6) {
      alert("Password is too short");
      return;
    }

    setIsSubmitting(true);

    const normalizedFullName = fullName.trim();
    const normalizedEmail = email.trim();

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          data: {
            full_name: normalizedFullName,
          },
        },
      });

      if (signUpError) {
        if (signUpError.status === 429) {
          alert("Too many registration requests. Wait about 1 minute and try again.");
        } else {
          alert(signUpError.message);
        }
        return;
      }

      const userId = data.user?.id;

      if (!userId) {
        alert("something went wrong.");
        return;
      }

      const { error: profileError } = await createProfile(userId, normalizedFullName);


      if (profileError) {
        alert(`Error creating profile: ${profileError.message}`);
        return;
      }

      alert("Account created.");
      navigate("/login");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout
      mode="register"
      title="Create account"
      subtitle="Build your profile and prepare the frontend flow for your registration backend."
      submitLabel={isSubmitting ? "Creating Account..." : "Create Account"}
      altLabel="Already have an account?"
      altLink="/login"
      altLinkText="Log in"
      onSubmit={register}
      isSubmitting={isSubmitting}
      fields={[
        {
          name: "fullName",
          label: "Full name",
          type: "text",
          placeholder: "Your full name",
          icon: "user",
          value: fullName,
          onChange: (e) => setFullName(e.target.value),
          required: true,
          autoComplete: "name",
        },
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
          placeholder: "Create a password",
          icon: "password",
          value: password,
          onChange: (e) => setPassword(e.target.value),
          minLength: 6,
          required: true,
          autoComplete: "new-password",
        },
      ]}
    />
  );
}
