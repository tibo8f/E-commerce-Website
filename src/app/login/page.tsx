"use client";

import { authenticate } from "@/app/lib/action";
import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import Link from "next/link";

export type User = {
  name: string;
  email: string;
  password: string;
};

export default function Page() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div>
      <form action={dispatch}>
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <LoginButton />
      </form>
      <br></br>

      <Link href="/login/createAccount">Create an account</Link>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button aria-disabled={pending} type="submit">
      Login
    </button>
  );
}
