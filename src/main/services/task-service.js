"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createNewTask = exports.getTaskById = exports.getAllTasks = void 0;
const axios_1 = __importDefault(require("axios"));
async function getAllTasks() {
    const response = await axios_1.default.get('http://localhost:3000/task');
    return response.data.tasks;
}
exports.getAllTasks = getAllTasks;
async function getTaskById(id) {
    const response = await axios_1.default.get('http://localhost:3000/task');
    const allTasks = response.data.tasks;
    const taskById = allTasks.find(task => task.id === id);
    if (!taskById) {
        throw new Error(`Task with id ${id} not found`);
    }
    return taskById;
}
exports.getTaskById = getTaskById;
async function createNewTask(task) {
    try {
        const response = await axios_1.default.post('http://localhost:3000/task', task);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
exports.createNewTask = createNewTask;
async function updateTask(id, task) {
    try {
        const response = await axios_1.default.put(`http://localhost:3000/task/${id}`, task);
        return response.data;
    }
    catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
}
exports.updateTask = updateTask;
async function deleteTask(id) {
    try {
        await axios_1.default.delete(`http://localhost:3000/task/${id}`);
    }
    catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
}
exports.deleteTask = deleteTask;
