import prisma from "../config/db";
import { CreateTaskInput } from "../@types/task";

// Create task service

export const createTaskService = async (taskData: CreateTaskInput) => {
    const task = await prisma.task.create({
        data: {
            title: taskData.title,
            description: taskData.description,
            deadline: taskData.deadline,
            priority: taskData.priority,
            userId: taskData.userId,
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