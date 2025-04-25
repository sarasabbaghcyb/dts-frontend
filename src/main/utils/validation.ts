import { TaskRequest } from '../types/task';

import {  NextFunction, Request, Response } from 'express';
import joi from 'joi';



export function validateNewTask (req: Request, res:Response, next: NextFunction){
  const schema = joi.object<TaskRequest>({
    title: joi.string(),
    description: joi.string(),
    status: joi.string(),
    dueDate: joi.string(),
  });
  const { value, error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    req.flash('errorMessage', 'No fields can be blank on submission');
    const errorMessages = error.details.map((detail) => ({
      text: detail.message,
      href: `#${detail.path[0]}`
    }));

    req.flash('validationErrors', JSON.stringify(errorMessages));
    req.flash('formData', JSON.stringify(req.body));
    return res.redirect('/task/new');
  }
  res.locals.validatedTaskBody = value;
  next();

}

export function validateTask(req: Request, res: Response, next: NextFunction) {
  const schema = joi.object<TaskRequest>({
    title: joi.string().required(),
    description: joi.string().required(),
    status: joi.string().valid('PENDING', 'COMPLETED').required(),
    dueDate: joi.string().required(),
  });
  const { value, error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    req.flash('errorMessage', 'No fields can be blank on submission');
    const errorMessages = error.details.map((detail) => ({
      text: detail.message,
      href: `#${detail.path[0]}`
    }));

    req.flash('validationErrors', JSON.stringify(errorMessages));
    req.flash('formData', JSON.stringify(req.body));
    return res.redirect(`/task/${req.params.id}/edit`);
  }

  res.locals.validatedTaskBody = value;
  next();
}

