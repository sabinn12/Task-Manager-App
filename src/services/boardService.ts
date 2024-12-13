import prisma from "../config/db";

// Create board service
export const createBoard = async (data: { name: string; userId: number }) => {
  const { name } = data;

  // Check if the board name already exists for the user (optional)
  const existingBoard = await prisma.board.findFirst({
    where: { name },
  });

  if (existingBoard) {
    throw new Error("A board with this name already exists.");
  }

  // Create the board
  const board = await prisma.board.create({
    data: {
      name,
    },
  });

  return board;
};


// Get boards with tasks service
export const getBoardsWithTasksForUser = async (userId: number) => {
  const boards = await prisma.board.findMany({
      where: { tasks: { some: { userId } } },
      include: { tasks: true }, 
  });
  return boards;
};