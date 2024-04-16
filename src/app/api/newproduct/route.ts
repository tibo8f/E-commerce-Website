import { PrismaClient } from '@prisma/client'
import type { Item } from '../../sell/page'
import { cookies } from 'next/headers'

function extractEmailFromCookie(cookie: string): string | undefined {
  const parts = cookie.split(';')
  if (parts.length > 0) {
      return parts[0].trim()
  }
  return undefined
}

export async function POST(request: Request) {
    console.log('POST request');
    // Get the json file with the form data filed on the front-end
    const formData = await request.json() as Item

    // Database interaction
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
            title: formData.title,
            authorId: existingUser.id,
            content: formData.content,
            price: formData.price,
          },
        });
        
        console.log('New article created:', newArticle);
      } else {
        console.log('User not found');
      }
      
    // View what's inside the database
      //const data = await prisma.user.findMany()     // Affiche les utilisateurs
      //console.log(data)
      const dataArticle = await prisma.article.findMany() // Affiche les posts
      console.log(dataArticle)
    return Response.json(dataArticle)
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
  return Response.json(allArticles)
}
