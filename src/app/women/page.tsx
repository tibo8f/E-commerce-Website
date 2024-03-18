"use client";

import { title } from "process";
import { useEffect, useState } from "react";
import CardArticle from "../components/cards";

// Ligne ci dessous permet d'avoir de la cohérence entre les pages
export type Item = {
  id?: number;
  title: string;
  content: string;
  user: string;
};

export default function Page() {
  const [jsonData, setJsonData] = useState<Item[]>([]); // Use an array to store multiple items

  async function submit() {
    const reponse = await fetch("/api/newproduct", {
      method: "GET",
    });
    const data = await reponse.json();
    console.log(data);
    setJsonData(data);
  }

  useEffect(function () {
    submit();
  }, []);

  return (
    <div>
      <h1>cloth most selled</h1>

      {jsonData.map((item) => (
        <div key={item.id}>
          <CardArticle
            title={item.title}
            content={item.content}
            price={20} // a faire
            user={item.user} // a faire
          ></CardArticle>
        </div>
      ))}
    </div>
  );
}
