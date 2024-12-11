import prisma from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  // Login user service

  export const loginUserService = async (email: string, password: string): Promise<string> => {
    // Check if user exists
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    // Generate JWT
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    );

    return token;
};

// get all users service

export const getAllUsersService = async () => {
  const users = await prisma.user.findMany({
      select: {
          id: true,
          name: true,
          email: true,
          createdAt: true, // Customize fields based on your user schema
      },
  });

  return users;
};