import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    // Get the JSON data with the form data from the front-end
    const formData = await request.json();

    const password = bcrypt.hashSync(formData.password, bcrypt.genSaltSync());

    // Database interaction
    const prisma = new PrismaClient();

    // Check if the email is already used
    const existingUser = await prisma.user.findUnique({ where: { email: formData.email } });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'Email is already used' }), { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: {
        name: formData.name,
        email: formData.email,
        password: password,
      },
    });

    console.log('New user created:', newUser);

    // Generate a token
    const token = jwt.sign({ userId: newUser.id }, 'secret-key', { expiresIn: '7d' });

    return new Response(JSON.stringify({ token }), { status: 201 });
  } catch (error) {
    console.error('Error during user registration:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
