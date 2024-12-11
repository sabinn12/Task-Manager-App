import prisma from "../config/db";
import bcrypt from "bcrypt";

// Register user service

export const registerUser = async (name: string, email: string, password: string) => {
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('Email already exists');
    }
  
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create user in database
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
  
    return user;
  };