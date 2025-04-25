"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTask = exports.validateNewTask = void 0;
const joi_1 = __importDefault(require("joi"));
function validateNewTask(req, res, next) {
    const schema = joi_1.default.object({
        title: joi_1.default.string(),
        description: joi_1.default.string(),
        status: joi_1.default.string(),
        dueDate: joi_1.default.string(),
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
exports.validateNewTask = validateNewTask;
function validateTask(req, res, next) {
    const schema = joi_1.default.object({
        title: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        status: joi_1.default.string().valid('PENDING', 'COMPLETED').required(),
        dueDate: joi_1.default.string().required(),
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
exports.validateTask = validateTask;
