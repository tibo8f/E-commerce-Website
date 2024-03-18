import { PrismaClient } from '@prisma/client'
import type { Item } from '../../sell/page'
export async function POST(request: Request) {
    // Get the json file with the form data filed on the front-end
    const formData = await request.json() as Item

    // Database interaction
    const prisma = new PrismaClient()


    const existingUser = await prisma.user.findUnique({
        where: {
          email: 'bobqsd@prisma.io',
        },
      });
      
      if (existingUser) {
        const newArticle = await prisma.article.create({
          data: {
            title: formData.title,
            authorId: existingUser.id,
            content: formData.content,
          },
        });
        
        console.log('New article created:', newArticle);
      } else {
        console.log('User not found');
      }
      
    // View what's inside the database
      const data = await prisma.user.findMany()     // Affiche les utilisateurs
      console.log(data)
      const dataArticle = await prisma.article.findMany() // Affiche les posts
      console.log(dataArticle)
    return Response.json(data)
}



export async function GET(request: Request) {
  // Database interaction
  const prisma = new PrismaClient()
  
  const allUsers = await prisma.user.findMany()
  const allArticles = await prisma.article.findMany()
  // console.log(allUsers)
  console.log("GET Method was launch")
  return Response.json(allArticles)
}







// Pour créer des articles par user
