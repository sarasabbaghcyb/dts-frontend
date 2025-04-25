/* eslint-disable jest/expect-expect */
import { app } from '../../main/app';
import * as taskService  from '../../main/services/task-service';

import request from 'supertest';

describe('Example test to satisfy jest (to be removed from your app)', () => {
  test('to be removed from your app', async () => {
    // eslint-disable-line @typescript-eslint/no-empty-function
  });
});
describe('GET /', () => {
  test('should render the home page with status 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Welcome to your Task list');
  });
});

describe('GET /task/new', () => {
  test('should render the new task form', async () => {
    const response = await request(app).get('/task/new');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Add New Task');
  });
});
describe('GET /task/:id', () => {
  test('should render a task details page', async () => {
    const fakeTask = await taskService.createNewTask({
      title: 'Test Task',
      description: 'Test Description',
      status: 'PENDING',
      dueDate: '2025-12-31',
    });

    const response = await request(app).get(`/task/${fakeTask.id}`);
    expect(response.status).toBe(200);
    expect(response.text).toContain('Test Task');
    expect(response.text).toContain('Test Description');
  });
});
describe('GET /task/:id/edit', () => {
  test('should render the edit task page', async () => {
    const fakeTask = await taskService.createNewTask({
      title: 'Edit Me',
      description: 'To be edited',
      status: 'PENDING',
      dueDate: '2025-12-31',
    });

    const response = await request(app).get(`/task/${fakeTask.id}/edit`);
    expect(response.status).toBe(200);
    expect(response.text).toContain('Edit Task');
    expect(response.text).toContain('Edit Me');
  });
});

describe('POST /task/new', () => {
  test('should create a task and redirect', async () => {
    const response = await request(app)
      .post('/task/new')
      .send({
        title: 'New Task',
        description: 'New Description',
        status: 'PENDING',
        dueDate: '2025-12-31'
      });

    expect(response.status).toBe(302); // Redirect to /task/:id
    expect(response.headers.location).toMatch(/\/task\/\d+/);
  });
});

describe('POST /task/:id', () => {
  test('should update a task and redirect', async () => {
    const fakeTask = await taskService.createNewTask({
      title: 'Original Title',
      description: 'Original Description',
      status: 'PENDING',
      dueDate: '2025-12-31',
    });

    const response = await request(app)
      .post(`/task/${fakeTask.id}`)
      .send({
        title: 'Updated Title',
        description: 'Updated Description',
        status: 'COMPLETED',
        dueDate: '2025-12-31',
      });

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe(`/task/${fakeTask.id}`);
  });
});

describe('POST /task/:id/delete', () => {
  test('should delete the task and redirect to home', async () => {
    const fakeTask = await taskService.createNewTask({
      title: 'To be deleted',
      description: 'Delete me',
      status: 'PENDING',
      dueDate: '2025-12-31',
    });

    const response = await request(app).post(`/task/${fakeTask.id}/delete`);
    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('/');
  });
});
