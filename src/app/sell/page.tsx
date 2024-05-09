"use client";

import { identity } from "@fullcalendar/core/internal.js";
import { useState, useRef } from "react";
import axios from "axios"; // Axios is one of the most popular data fetching packages available on npm to make API calls, send HTTP requests

import { POST } from "../api/newproduct/route";

// Si la variable context utilisateur existe alors affiche de quoi créer un produit
// Sinon demande de se connecter

// import { cookies } from 'next/headers'

// export async function getSessionData(req) {
//   const encryptedSessionData = cookies().get('session')?.value
//   return encryptedSessionData ? JSON.parse(decrypt(encryptedSessionData)) : null
// }

export type Item = {
  id?: number;
  title: string;
  content: string;
  price: number;
  image: string;
};

export default function Page(this: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(Number);

  const fileInput = useRef<HTMLInputElement>(null);

  async function handleSubmit() {
    const file = fileInput.current?.files![0];
    const formData = new FormData();
    formData.append("file", file!);
    formData.append("title", title);
    formData.append("price", String(price));
    formData.append("content", description);
    const reponse = await fetch("/api/newproduct", {
      method: "POST",
      body: formData,
    });
  }

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div
        className="
        relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10
      "
      >
        <div>
          <h2 className="text-3xl font-semibold text-gray-900">
            Sell a product
          </h2>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
          method="post"
          encType="multipart/form-data"
        >
          <input
            className="p-2 mt-8 border rounded-md"
            type="text"
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Article title"
          />
          <input
            className="p-2 border rounded-md w-full"
            type="text"
            value={description}
            name="content"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <input
            className="p-2 border rounded-md w-full"
            type="number"
            value={price}
            name="price"
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            placeholder="Price"
          />
          <p className="mt-2 text-gray-500">Add an image to your product</p>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG
                </p>
              </div>
              <input
                ref={fileInput}
                id="dropzone-file"
                type="file"
                className="hidden"
                name="imageData"
              />
            </label>
          </div>

          {/* <label htmlFor="image">
            
            <input
              ref={fileInput}
              type="file"
              id="image"
              name="imageData"
              accept=".jpg, .png"
            ></input>
          </label> */}
          {/* <input type="submit" value="Send"></input> */}
          <div className="my-6">
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
            >
              Sell product
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

//
// {/* <p>Note : ajouter une page d'authentification {title}</p> */}

//
// Pour améliorer :
// Fetch ne fonctionne que pour les clients ayant javascript

// Utiliser une requete qui ne demande pas que l'utilisateur ait obligatoirement javascript
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations

// async function createInvoice(formData: FormData) {
//     "use server";

//     const rawFormData = {
//       customerId: formData.get("customerId"),
//       amount: formData.get("amount"),
//       status: formData.get("status"),
//     };

//     // mutate data
//     // revalidate cache
//   }
// <form action={createInvoice}>...</form>;
