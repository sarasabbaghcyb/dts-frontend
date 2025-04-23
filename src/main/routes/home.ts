import axios from 'axios';
import { Application, Request, Response } from 'express';

export default function (app: Application): void {
  app.get('/', async (req: Request, res: Response) => {
    try {
      const response = await axios.get('http://localhost:3000/task');
      res.render('home', { tasks: response.data.tasks });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.render('home', { tasks: [] });
    }
  });

  app.get('/task/new', (_req: Request, res: Response) => {
    res.render('new-task');
  });

  app.post('/task/new', async (req: Request, res: Response) => {
    try {
      const { title, description, status, dueDate } = req.body as {
        title: string;
        description: string;
        status: string;
        dueDate: string;
      };

      // Send the task data to the backend (running on port 3000)
      await axios.post('http://localhost:3000/task/new', {
        title,
        description,
        status,
        dueDate,
      });

      // Redirect to homepage after task creation
      window.location.href = '/'; // Manually trigger the redirect on the frontend

    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).render('new-task', {
        error: 'Failed to create task. Please try again.',
      });
    }
  });
}
