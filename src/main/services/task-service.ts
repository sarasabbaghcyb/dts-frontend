import { Task, TaskRequest } from '../types/task';

import axios from 'axios';

export async function getAllTasks(): Promise<Task[]> {
  const response = await axios.get('http://localhost:3000/task');
  return response.data.tasks;
}

export async function getTaskById(id: number): Promise<Task> {

    const response = await axios.get<{ tasks: Task[] }>('http://localhost:3000/task');
    const allTasks = response.data.tasks;

    const taskById = allTasks.find(task => task.id === id);

    if (!taskById) {
      throw new Error(`Task with id ${id} not found`);
    }
    return taskById;

}

export async function createNewTask(task: TaskRequest): Promise<Task> {
  try {
    const response = await axios.post('http://localhost:3000/task', task);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateTask(id: number, task: TaskRequest): Promise<Task> {
  try {
    const response = await axios.put(`http://localhost:3000/task/${id}`, task);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

export async function deleteTask(id: number): Promise<void> {
  try {
    await axios.delete(`http://localhost:3000/task/${id}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}
