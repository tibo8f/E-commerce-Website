import { PrismaClient } from '@prisma/client'
import type { User } from '../../login/page'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
    try{
    // Get the json file with the form data filed on the front-end
    const formData = await request.json() as User

    const password = bcrypt.hashSync(formData.password, bcrypt.genSaltSync())

    // Database interaction
    const prisma = new PrismaClient()

    const newUser = await prisma.user.create({
        data: {
          name: formData.name,
          email: formData.email,
          password: password,
        },});
    
        console.log('New user created:', newUser);

      const data = await prisma.user.findMany()     // Affiche les utilisateurs
    //   console.log(data)
    
    return Response.json(data)
    }
    catch{
        console.error("The email is already used");
    }
}
