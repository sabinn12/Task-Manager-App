import prisma from "../config/db";
import { CreateTaskInput } from "../@types/task";
import e from "express";

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


// Update task status service

export const updateTaskStatusService = async (data: { taskId: number; status: string; userId: number }) => {
    const { taskId, status, userId } = data;

    // Ensure the task belongs to the user
    const task = await prisma.task.findUnique({
        where: { id: taskId },
    });

    if (!task) {
        throw new Error('Task not found');
    }

    if (task.userId !== userId) {
        throw new Error('Unauthorized to update this task');
    }

    // Update the task status
    const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: { status },
    });

    return updatedTask;
};