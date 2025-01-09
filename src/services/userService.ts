import prisma from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register user service

export const registerUser = async (name: string, email: string, password: string, role: 'USER' | 'ADMIN' = 'USER') => {
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('Email already exists');
    }
  
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create user in database
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
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
        { id: user.id, email: user.email , role: user.role },
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
          role: true,
          createdAt: true, // Customize fields based on your user schema
      },
  });

  return users;
};


// get user by id service

export const getUserByIdService = async (id: string ) => {
  const user = await prisma.user.findUnique({
      where: {
          id: Number(id), 
      },
  });

  return user;
};



// Update user details service
export const updateUserByIdService = async (userId: string,updates: Partial<{ name: string; email: string }>) => {
  // Update user details 
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(userId, 10) },
    data: {
      name: updates.name,
      email: updates.email,
    },
  });

  return updatedUser;
};



// Delete user by ID service
export const deleteUserByIdService = async (userId: string) => {
  // Find and delete the user
  const deletedUser = await prisma.user.delete({
      where: { id: parseInt(userId, 10) }, // Convert userId to number since Prisma expects an Int
  });

  return deletedUser;
};

// change password service

export const changeUserPasswordService = async (userId: string, oldPassword: string, newPassword: string) => {
  
  const user = await prisma.user.findUnique({ where: { id: parseInt(userId, 10) } });

  if (!user) {
      throw new Error('User not found');
  }

  // Verify the old password
  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
      throw new Error('Old password is incorrect');
  }

  // Hash the new password
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  // Update the password in the database
  const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId, 10) },
      data: { password: hashedNewPassword },
  });

  return updatedUser;
};
