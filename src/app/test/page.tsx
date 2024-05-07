"use client";

import { identity } from "@fullcalendar/core/internal.js";
import { useState } from "react";
import axios from "axios"; // Axios is one of the most popular data fetching packages available on npm to make API calls, send HTTP requests

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
  const [price, setPrice] = useState(0);
  const [imageSrc, setImageSrc] = useState("");
  const [image, setImage] = useState({
    preview: "",
    raw: "",
  });

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div
        className="
        relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10
      "
      >
        <div>
          <h2 className="text-3xl font-semibold text-gray-900">
            Sell your products
          </h2>
          <p className="mt-2 text-gray-500">blabla</p>
        </div>

        <form
          action="/api/newproduct"
          method="post"
          encType="multipart/form-data"
        >
          <input
            type="text"
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Article title"
          />
          <input
            type="text"
            value={description}
            name="content"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <input
            type="number"
            value={price}
            name="price"
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            placeholder="Price"
          />

          <label htmlFor="image">
            Sélectionner une image (JPG uniquement) :{" "}
            <input
              type="file"
              id="image"
              name="imageData"
              accept=".jpg"
            ></input>
          </label>
          <input type="submit" value="Envoyer"></input>
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
