"use client";

import { authenticate } from "@/app/lib/action";
import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";

export type User = {
  name: string;
  email: string;
  password: string;
};

export default function Page() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit() {
    const data: User = {
      name: name,
      email: email,
      password: password,
    };
    const reponse = await fetch("/api/newuser", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const user = await reponse.json();
    // console.log(user);
  }
  return (
    <div>
      <form action={dispatch}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button onClick={submit}>Create user account</button>
      </form>
    </div>
  );
}
