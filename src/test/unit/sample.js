"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable jest/expect-expect */
const app_1 = require("../../main/app");
const taskService = __importStar(require("../../main/services/task-service"));
const supertest_1 = __importDefault(require("supertest"));
describe('Example test to satisfy jest (to be removed from your app)', () => {
    test('to be removed from your app', async () => {
        // eslint-disable-line @typescript-eslint/no-empty-function
    });
});
describe('GET /', () => {
    test('should render the home page with status 200', async () => {
        const response = await (0, supertest_1.default)(app_1.app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Welcome to your Task list');
    });
});
describe('GET /task/new', () => {
    test('should render the new task form', async () => {
        const response = await (0, supertest_1.default)(app_1.app).get('/task/new');
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
        const response = await (0, supertest_1.default)(app_1.app).get(`/task/${fakeTask.id}`);
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
        const response = await (0, supertest_1.default)(app_1.app).get(`/task/${fakeTask.id}/edit`);
        expect(response.status).toBe(200);
        expect(response.text).toContain('Edit Task');
        expect(response.text).toContain('Edit Me');
    });
});
describe('POST /task/new', () => {
    test('should create a task and redirect', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
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
        const response = await (0, supertest_1.default)(app_1.app)
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
        const response = await (0, supertest_1.default)(app_1.app).post(`/task/${fakeTask.id}/delete`);
        expect(response.status).toBe(302);
        expect(response.headers.location).toBe('/');
    });
});
