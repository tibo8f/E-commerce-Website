"use client";

import { authenticate } from "@/app/lib/action";
import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            Create and account
          </h1>

          <form action={dispatch} className="flex flex-col gap-4">
            <div>
              <input
                type="text"
                className="p-2 mt-8 border rounded-md w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
            <div>
              <input
                type="text"
                className="p-2 border rounded-md w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <input
                type="text"
                className="p-2 border rounded-md w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <Link href="/login">
              <button
                onClick={submit}
                className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
              >
                Create user account
              </button>
            </Link>
          </form>
          <div className="mt-3 text-xs flex justify-between">
            <p className="text-center text-sm text-gray-500">
              Already have an account? &nbsp;
              <a
                href="#!"
                onClick={() => {
                  router.push("/login");
                }}
                className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
              >
                Log in here
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
