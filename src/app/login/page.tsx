"use client";

import { authenticate } from "@/app/lib/action";
import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../layout";
import { useRouter } from "next/navigation";

export type User = {
  name: string;
  email: string;
  password: string;
};

export default function Page() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const { username, setUsername } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function submit() {
    const data: User = {
      name: name,
      email: email,
      password: password,
    };
    const reponse = await fetch("/api/connection", {
      method: "POST",
      body: JSON.stringify(data), // data is the data i wrote during the connection data ={name: '', email: 'd@gmail.com', password: 'd'}
    });
    const user: User = await reponse.json(); // user = {id: 9, email: 'd@gmail.com', password: '$2a$10$ef8NqhrjtlF8RyPwjP1rluD9v.MIfbn8CZFFUQxF1/6CMJDWpZff6', name: 'd'}
    // debugger;
    if (user) {
      setUsername(user.name);
      router.push("/");
    }
    // console.log(data);
  }

  return (
    <div>
      <form action={dispatch}>
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
        <button onClick={submit}>Login</button>
      </form>
      <br></br>

      <Link href="/login/createAccount">Create an account</Link>
    </div>
  );
}
function setUsername(arg0: string) {
  throw new Error("Function not implemented.");
}
