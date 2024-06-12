import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    // Get the JSON data with the form data filed on the front-end
    const formData = await request.json();

    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({ where: { email: formData.email } });
    console.log(user);
    if (!user) {
      // User does not exist
      return new Response(JSON.stringify({ error: 'User does not exist' }), { status: 404 });
    }

    const correctPassword = bcrypt.compareSync(formData.password, user.password);
    
    if (!correctPassword) {
      // Incorrect password
      return new Response(JSON.stringify({ error: 'Incorrect password' }), { status: 401 });
    }

    // Generate a token
    const token = jwt.sign({ userId: user.id }, 'secret-key', { expiresIn: '7d' });
    console.log("token was created")
    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    console.error('Error during the connection:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}

export async function GET(request: Request) {
    try {
      // Extract token from headers or query parameters
      const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  
      if (!token) {
        return new Response(JSON.stringify({ error: 'Token not provided' }), { status: 400 });
      }
  
      // Verify and decode token
      const decodedToken = jwt.verify(token, 'secret-key');
  
      // Fetch user information based on the decoded token
      const prisma = new PrismaClient();
      const user = await prisma.user.findUnique({ where: { id: (decodedToken as { userId: number }).userId } });
  
      if (!user) {
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
      }
  
      // Return user information extracted from the token
      return new Response(JSON.stringify({ user }), { status: 200 });
    } catch (error) {
      console.error('Error while retrieving token information:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
  }
