import { PrismaClient } from '@prisma/client'
import type { User } from '../../login/page'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import React from 'react'

export async function GET(request: Request) {
    const cookieStore = cookies()
    const [email, signature] = cookieStore.get('email')?.value.split(';') || [null, '']
    if (email && signature){
    console.log(email)
    const valid = bcrypt.compareSync('coucou' + email, signature)
    const prisma = new PrismaClient()
    const user = await prisma.user.findUnique({ where: { email: email }})
    if (user && valid) {
        return Response.json(user)
    }
    }
    return Response.json({connected: false})
}

export async function POST(request: Request) {
    try{
    // Get the json file with the form data filed on the front-end
    const formData = await request.json() as User

    const prisma = new PrismaClient()
    const user = await prisma.user.findUnique({ where: { email: formData.email }})
    if (!user) {
        // Error
        console.error("User does not exist")
    } else {
        const correctPassword = bcrypt.compareSync(formData.password, user.password)
        const signedCookie = formData.email + ';' + bcrypt.hashSync('coucou' + formData.email)
        if (correctPassword){
            cookies().set('email', signedCookie, { // Tout le monde peut voir le nom d'utilisateur ici "ADMIN" il faut cripter un token qui sera affiché pour que qqun ne puisse pas modifier le cookie et se connecter à ma place
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // One week
                path: '/',
              })
              console.log("cookie was created") // Modifier cette variable dans la navbar
              return Response.json(user)
        }
        else{
            console.error("Wrong password")
        }
    }
    
    return Response.json({})
    }
    catch (error) {
        console.error("Error during the connection");
        return Response.json({error})
    }
}

function encrypt(sessionData: any) {
    throw new Error('Function not implemented.')
}
