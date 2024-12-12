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