import prisma from "../config/db";
import { CreateTaskInput } from "../@types/task";

// Create task service

export const createTaskService = async (taskData: CreateTaskInput) => {
     // Check if the board exists
     if (taskData.boardId) {
        const board = await prisma.board.findUnique({
            where: { id: taskData.boardId },
        });

        if (!board) {
            throw new Error("Board with the specified ID does not exist.");
        }
    }
    // default board
    const defaultBoard = await prisma.board.findFirst({
        where: { name: "General" },
    });
    
    const task = await prisma.task.create({
        data: {
            title: taskData.title,
            description: taskData.description,
            deadline: taskData.deadline,
            priority: taskData.priority,
            userId: taskData.userId,
            boardId: taskData.boardId || defaultBoard?.id,//This approach ensures all tasks are linked to a board, even if none is provided.
        },
    });

    return task;
};


// get all tasks for a user service

export const getAllTasksForAUserService = async (userId: string) => {
    const tasks = await prisma.task.findMany({
        where: {
            userId: Number(userId),
        },
    });

    return tasks;
};


// update task by id service

export const updateTaskByIdService = async (id: string, title: string, description: string, deadline: Date, priority: string) => {
    const updatedTask = await prisma.task.update({
        where: {
            id: Number(id),
        },
        data: {
            title,
            description,
            deadline,
            priority,
        },
    });

    return updatedTask;
};


// delete task by id service

export const deleteTaskByIdService = async (id: string) => {
    const deletedTask = await prisma.task.delete({
        where: {
            id: Number(id),
        },
    });

    return deletedTask;
};