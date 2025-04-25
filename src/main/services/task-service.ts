import { Task, TaskRequest } from '../types/task';

import axios from 'axios';


export async function createNewTask(task: TaskRequest): Promise<Task> {
  try {
    const response = await axios.post('http://localhost:3000/task', task);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
