'use server'

import signIn from '@/app/lib/authenticate'
import { cookies } from 'next/headers'

export async function authenticate(_currentState: unknown, formData: FormData) {
    const signedIn = await signIn(formData.get('login') as string, formData.get('password') as string)
    // si signedIn, créer un cookie avec un token
    if (signedIn == true){
      cookies().set('session', 'ADMIN', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/',
      })
    }

    
}