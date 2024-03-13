import { PrismaClient } from '@prisma/client'
import type { Item } from '../../sell/page'
export async function POST(request: Request) {
    // Get the json file with the form data filed on the front-end
    const formData = await request.json() as Item

    // Database interaction
    const prisma = new PrismaClient()
    //     const user = await prisma.user.create({
    //     data: {
    //       name: 'Bob',
    //       email: 'bobqsd@prisma.io',
    //       posts: {
    //         create: {
    //           title: formData.title,
    //         },
    //       },
    //     },
    //   })

    const existingUser = await prisma.user.findUnique({
        where: {
          email: 'bobqsd@prisma.io',
        },
      });
      
      if (existingUser) {
        const newPost = await prisma.post.create({
          data: {
            title: formData.title,
            authorId: existingUser.id,
            content: formData.content,
          },
        });
        
        console.log('New post created:', newPost);
      } else {
        console.log('User not found');
      }
      
    // View what's inside the database
      const data = await prisma.user.findMany()     // Affiche les utilisateurs
      console.log(data)
      const dataPost = await prisma.post.findMany() // Affiche les posts
      console.log(dataPost)
    return Response.json(data)
}