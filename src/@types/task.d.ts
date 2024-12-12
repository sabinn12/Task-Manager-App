// src/@types/task.d.ts
export interface CreateTaskInput {
    title: string;
    description: string;
    deadline: Date;
    priority: 'Low' | 'Medium' | 'High';
    userId: number; 
}