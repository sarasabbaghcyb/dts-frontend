import * as taskService  from '../services/task-service';
import { TaskRequest } from '../types/task';

import axios from 'axios';
import { Application, NextFunction, Request, Response } from 'express';
import joi from 'joi';

export default function (app: Application): void {
  app.get('/', async (req: Request, res: Response) => {
    try {
      const response = await axios.get('http://localhost:3000/task');
      res.render('home', { tasks: response.data.tasks, successMessage: req.flash('successMessage'), errorMessage: req.flash('errorMessage') });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.render('home', { tasks: [], errorMessage:'Failed to add new task' } );
    }
  });

  app.get('/task/new', (_req: Request, res: Response) => {
    res.render('new-task');
  });

  app.post('/task/new',validateNewTask, async (req: Request, res: Response) => {
    try {

      const task = await taskService.createNewTask(res.locals.validatedTaskBody);

      req.flash('successMessage', 'Successfully created new task');
      // Redirect to homepage after task creation
      console.info('task created',task.id);


      res.redirect('/');

    } catch (error) {
      console.error('Error creating task:', error);
      req.flash('errorMessage', 'Failed to create new task');
      res.redirect('/');
    }
  });
}

function validateNewTask (req: Request, res:Response, next: NextFunction){
  const schema = joi.object<TaskRequest>({
    title: joi.string(),
    description: joi.string(),
    status: joi.string(),
    dueDate: joi.string(),
  });
  const { value, error } = schema.validate(req.body);
  if (error){
    // req.flash(errorMessage)
    console.log(error);
    res.redirect('/task/new');

    return;
  }
  res.locals.validatedTaskBody = value;
  next();

}
