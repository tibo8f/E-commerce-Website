
// Import necessary modules
import { PrismaClient } from '@prisma/client';


// Define the DELETE endpoint
export async function DELETE(request: Request) {
    console.log("API DELETE")
  try {
    const prisma = new PrismaClient();
    console.log("prisma client")
    const formData = await request.json();
    // Extract item ID from the request body
    // const { id } = request.body;
    console.log("Delete article ", formData.id)
    // Check if the item exists
    const existingArticle = await prisma.article.findUnique({
      where: {
        id: parseInt(formData.id),
      },
    });

    if (!existingArticle) {
      return new Response(JSON.stringify({ error: 'Article not found' }), { status: 404 });
    }

    // Delete the item
    await prisma.article.delete({
      where: {
        id: parseInt(formData.id),
      },
    });

    // Return success response
    return new Response(JSON.stringify({ error: 'Article deleted successfully' }), { status: 200 });

  } catch (error) {
    console.error('Error while deleting article:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });

  }
}
