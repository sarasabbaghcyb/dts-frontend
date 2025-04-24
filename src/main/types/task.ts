
export type Task = {
  title: string;
  description: string;
  status: string;
  dueDate: string;
  id: number;
};

export type TaskRequest = Omit<Task,'id'>
