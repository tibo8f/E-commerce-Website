"use client";

import { useEffect, useState } from "react";
import CardArticle from "./components/cards";
import { cookies } from "next/headers";
import type { Article } from "./api/newproduct/route";
import { CardArticle2 } from "./components/productCard";

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
      <h1>Clothes most sold</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {jsonData.map((item) => (
          <div key={item.id} style={{ flex: "0 0 33.33%", padding: "10px" }}>
            <CardArticle2
              title={item.title}
              content={item.content || ""}
              price={item.price}
              user={item.author.name || ""}
              image={item.image || ""}
            ></CardArticle2>
          </div>
        ))}
      </div>
    </div>
  );
}
