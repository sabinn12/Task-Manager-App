import prisma from "../config/db";
import { getSocketInstance } from "../config/socket";

// Create board service

export const createBoard = async (data: { name: string; userId: number }) => {
  const { name, userId } = data;

  
  const existingBoard = await prisma.board.findFirst({
    where: {
      name,
      userId, 
    },
  });

  if (existingBoard) {
    throw new Error("A board with this name already exists for the user.");
  }

  // Create the board with the associated user
  const board = await prisma.board.create({
    data: {
      name,
      userId, 
    },
  });

  // Emit real-time update for the created board
  const io = getSocketInstance();
  // console.log('Emitting boardCreated event with data:', board);
  io.emit('boardCreated', { board });
  // console.log('boardCreated event emitted');

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


// get all  boards
export const getBoards = async () => {
    const boards = await prisma.board.findMany();
    return boards;
};


// delete board service
export const deleteBoardByIdService = async (boardId: number) => {
  const board = await prisma.board.findUnique({
      where: { id: boardId },
  });

  if (!board) {
      throw new Error('Board not found');
  }

  // Cascade delete: ensure tasks linked to the board are also deleted
  await prisma.task.deleteMany({
      where: { boardId: boardId },
  });

  // Delete the board
  await prisma.board.delete({
      where: { id: boardId },
  });

  // Emit real-time update for the deleted board
  const io = getSocketInstance();
  console.log('Emitting deleted board event with data:', board);
  io.emit('boardDeleted', { boardId });
  console.log('boarddeleted event emitted');
};