import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function signIn(email: string, password: string) {
  // Chercher user par email
  if (!email) {
    return false;
  }
  const user = await prisma.user.findUnique({ where: { email: email } });

  if (user && bcrypt.compareSync(password, user.password)) {
    return true;
  }
  return false;
}
