import * as taskService  from '../services/task-service';
import { validateNewTask, validateTask } from '../utils/validation';

import { Application, Request, Response } from 'express';
import moment from 'moment';

export default function (app: Application): void {
  app.get('/', async (req: Request, res: Response) => {
    try {
      const tasks = await taskService.getAllTasks();
      const successMessage = req.flash('successMessage')[0];
      const errorMessage = req.flash('errorMessage')[0];
      res.render('home', { tasks, successMessage, errorMessage });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.render('home', { tasks: [], errorMessage:'Failed to add new task' } );
    }
  });

  app.get('/task/new', (req: Request, res: Response) => {
    const validationErrorsRaw = req.flash('validationErrors')[0];
    const formDataRaw = req.flash('formData')[0];
    const errorMessage = req.flash('errorMessage');


    const validationErrors = validationErrorsRaw ? JSON.parse(validationErrorsRaw) : [];
    const formData = formDataRaw ? JSON.parse(formDataRaw) : {};

    res.render('new-task', {
      validationErrors,
      formData,
      errorMessage
    });
  });

  app.get('/task/:id', async (req: Request, res: Response) => {
    const taskId = Number(req.params.id);
    const successMessage = req.flash('successMessage');

    const requestedTask = await taskService.getTaskById(taskId);
    const dueDateFormatted = moment(requestedTask.dueDate).format('Do MMMM YYYY');
    res.render('task', { task: requestedTask, dueDateFormatted, successMessage });
  });

  app.get('/task/:id/edit', async (req: Request, res: Response) => {
    const taskId = Number(req.params.id);
    const successMessage = req.flash('successMessage');

    const requestedTask = await taskService.getTaskById(taskId);
    const dueDateFormatted = moment(requestedTask.dueDate).format('Do MMMM YYYY');
    res.render('edit-task', { task: requestedTask, dueDateFormatted, successMessage });
  });

  app.post('/task/new',validateNewTask, async (req: Request, res: Response) => {
    try {
      const task = await taskService.createNewTask(res.locals.validatedTaskBody);
      req.flash('successMessage', 'Successfully created new task');
      console.info('task created',task.id);

      res.redirect(`/task/${task.id}`);
    } catch (error) {
      console.error('Error creating task:', error);
      req.flash('errorMessage', 'Failed to create new task');
      res.redirect('/task/new');
    }
  });

  app.post('/task/:id', validateTask, async (req: Request, res: Response) => {
    const taskId = Number(req.params.id);
    try {
      const updatedTask = await taskService.updateTask(taskId, res.locals.validatedTaskBody);

      req.flash('successMessage', 'Task updated successfully!');
      res.redirect(`/task/${updatedTask.id}`);
    } catch (error) {
      console.error('Error updating task:', error);
      req.flash('errorMessage', 'Failed to update task');
      res.redirect(`/task/${taskId}/edit`);
    }
  });

  app.post('/task/:id/delete', async (req: Request, res: Response) => {
    const taskId = Number(req.params.id);
    try {
      await taskService.deleteTask(taskId);
      req.flash('successMessage', 'Task deleted successfully');
      res.redirect('/');
    } catch (error) {
      console.error('Error deleting task:', error);
      req.flash('errorMessage', 'Failed to delete task');
      res.redirect(`/task/${taskId}`);
    }
  });
};
