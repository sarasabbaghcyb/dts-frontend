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
const taskService = __importStar(require("../services/task-service"));
const validation_1 = require("../utils/validation");
const moment_1 = __importDefault(require("moment"));
function default_1(app) {
    app.get('/', async (req, res) => {
        try {
            const tasks = await taskService.getAllTasks();
            const successMessage = req.flash('successMessage')[0];
            const errorMessage = req.flash('errorMessage')[0];
            res.render('home', { tasks, successMessage, errorMessage });
        }
        catch (error) {
            console.error('Error fetching tasks:', error);
            res.render('home', { tasks: [], errorMessage: 'Failed to add new task' });
        }
    });
    app.get('/task/new', (req, res) => {
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
    app.get('/task/:id', async (req, res) => {
        const taskId = Number(req.params.id);
        const successMessage = req.flash('successMessage');
        const requestedTask = await taskService.getTaskById(taskId);
        const dueDateFormatted = (0, moment_1.default)(requestedTask.dueDate).format('Do MMMM YYYY');
        res.render('task', { task: requestedTask, dueDateFormatted, successMessage });
    });
    app.get('/task/:id/edit', async (req, res) => {
        const taskId = Number(req.params.id);
        const successMessage = req.flash('successMessage');
        const requestedTask = await taskService.getTaskById(taskId);
        const dueDateFormatted = (0, moment_1.default)(requestedTask.dueDate).format('Do MMMM YYYY');
        res.render('edit-task', { task: requestedTask, dueDateFormatted, successMessage });
    });
    app.post('/task/new', validation_1.validateNewTask, async (req, res) => {
        try {
            const task = await taskService.createNewTask(res.locals.validatedTaskBody);
            req.flash('successMessage', 'Successfully created new task');
            console.info('task created', task.id);
            res.redirect(`/task/${task.id}`);
        }
        catch (error) {
            console.error('Error creating task:', error);
            req.flash('errorMessage', 'Failed to create new task');
            res.redirect('/task/new');
        }
    });
    app.post('/task/:id', validation_1.validateTask, async (req, res) => {
        const taskId = Number(req.params.id);
        try {
            const updatedTask = await taskService.updateTask(taskId, res.locals.validatedTaskBody);
            req.flash('successMessage', 'Task updated successfully!');
            res.redirect(`/task/${updatedTask.id}`);
        }
        catch (error) {
            console.error('Error updating task:', error);
            req.flash('errorMessage', 'Failed to update task');
            res.redirect(`/task/${taskId}/edit`);
        }
    });
    app.post('/task/:id/delete', async (req, res) => {
        const taskId = Number(req.params.id);
        try {
            await taskService.deleteTask(taskId);
            req.flash('successMessage', 'Task deleted successfully');
            res.redirect('/');
        }
        catch (error) {
            console.error('Error deleting task:', error);
            req.flash('errorMessage', 'Failed to delete task');
            res.redirect(`/task/${taskId}`);
        }
    });
}
exports.default = default_1;
;
