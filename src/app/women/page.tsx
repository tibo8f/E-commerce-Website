"use client";

import { title } from "process";
import { useEffect, useState } from "react";
import CardArticle from "../components/cards";
import type { Article } from "../api/newproduct/route";

export default function Page() {
  const [jsonData, setJsonData] = useState<Article[]>([]); // Use an array to store multiple items

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
            content={item.content || ""}
            price={item.price}
            user={item.author.name || ""}
          ></CardArticle>
        </div>
      ))}
    </div>
  );
}
