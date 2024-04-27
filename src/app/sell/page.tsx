"use client";

import { identity } from "@fullcalendar/core/internal.js";
import { useState } from "react";
import style from "styled-jsx/style";

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
  const [image, setImage] = useState({
    preview: "",
    raw: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  async function submit(event: { preventDefault: () => void }) {
    event.preventDefault();
    const data: Item = {
      title: title,
      content: description,
      price: price,
      image: image,
    };
    const reponse = await fetch("/api/newproduct", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const product = await reponse.json();
    console.log(product);

    // Upload the image selected

    if (selectedFile) {
      console.log("Uploading file...");

      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        // You can write the URL of your server or any other endpoint used for file upload
        const result = await fetch("http://localhost:3000/images", {
          method: "POST",
          body: formData,
        });

        const data = await result.json();

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  }

  const handlePhotoChange = (e: any) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

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

        <form className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Article title"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            placeholder="Price"
          />
          {/* <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="/images/image_name.png"
          /> */}

          <input
            name="image"
            type="file"
            id="upload-button"
            style={{ display: "none" }}
            onChange={handlePhotoChange}
          />
          <label htmlFor="upload-button">
            {image.preview ? (
              <img
                src={image.preview}
                alt="dummy"
                width="300"
                height="300"
                className="my-10 mx-5"
              />
            ) : (
              <>
                <p className="text-white text-1xl text-left w-full text-left">
                  Upload Image
                </p>
                <div className={style.wrapper} />
              </>
            )}
          </label>

          <button
            type="button"
            onClick={submit}
            className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
          >
            Submit
          </button>
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
