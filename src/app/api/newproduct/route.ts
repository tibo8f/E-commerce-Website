


import path from "path";
import fs from "fs/promises";
// import { storeImageDetails } from "./script.ts";
import { useSearchParams } from "next/navigation.js";
import { PrismaClient } from "@prisma/client";
import { cookies } from 'next/headers'

function extractEmailFromCookie(cookie: string): string | undefined {
  const parts = cookie.split(';')
  if (parts.length > 0) {
      return parts[0].trim()
  }
  return undefined
}

export const dynamic = "force-dynamic"; // defaults to auto
export async function POST(request: Request) {
  const formData = await request.formData();
  console.log('Hello')
  console.log(formData);

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const price = formData.get("price") as string;
  const file = formData.get("file") as File;
  const fileContent = Buffer.from(await file.arrayBuffer());
  const hash = title // hasher le titre utiliser uui ou  un hashage pour que le titre soit sur d'etre correct et differents pour chaque fichier

  const dir = "public/images/" + hash + ".jpg"; 
  let filename = path.join(dir, file.name);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(filename, fileContent);
  console.log(filename);
  const [extension, ...name] = filename.split(".").reverse();


  // Mettre en DB
  const prisma = new PrismaClient()
  const cookieStore = cookies()
  const userEmailCookie = cookieStore.get('email')?.value
  const userEmail = userEmailCookie ? extractEmailFromCookie(userEmailCookie) : undefined
  console.log(userEmail);

  const existingUser = await prisma.user.findUnique({
      where: {
        email: userEmail, 
      },
    });
    
    if (existingUser) {
      const newArticle = await prisma.article.create({
        data: {
          title: title,
          authorId: existingUser.id,
          content: content,
          price: parseInt(price),
          image: filename.replace("public/", ""),
        },
      });
      
      console.log('New article created:', newArticle);
    } else {
      console.log('User not found');
    }
    
  // View what's inside the database
    const dataArticle = await prisma.article.findMany() // Affiche les posts
    console.log(dataArticle)

  return Response.json({ title, file });
}

export async function getArticles() {
  // Database interaction
  const prisma = new PrismaClient()
  
  const allUsers = await prisma.user.findMany()
  const allArticles = await prisma.article.findMany({
    include: {
        author: {
            select: {
                name: true // Include only the name field of the author
            }
        }
    }
})

return allArticles

}

export type Article = Awaited<ReturnType<typeof getArticles>>[number]

export async function GET(request: Request) {
  const allArticles = await getArticles()
  console.log("API was reached (API speaking)")
  return Response.json(allArticles)
}