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
exports.app = void 0;
const path = __importStar(require("path"));
const nunjucks_1 = require("./modules/nunjucks");
const bodyParser = __importStar(require("body-parser"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const glob_1 = require("glob");
const method_override_1 = __importDefault(require("method-override"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const { setupDev } = require('./development');
const env = process.env.NODE_ENV || 'development';
const developmentMode = env === 'development';
exports.app = (0, express_1.default)();
exports.app.locals.ENV = env;
new nunjucks_1.Nunjucks(developmentMode).enableFor(exports.app);
exports.app.use((0, serve_favicon_1.default)(path.join(__dirname, '/public/assets/images/favicon.ico')));
exports.app.use(bodyParser.json());
exports.app.use(bodyParser.urlencoded({ extended: false }));
exports.app.use((0, method_override_1.default)('_method'));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET ?? 'secret',
    resave: false,
    saveUninitialized: true
}));
exports.app.use((0, connect_flash_1.default)());
exports.app.use(express_1.default.static(path.join(__dirname, 'public')));
exports.app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
    next();
});
glob_1.glob
    .sync(__dirname + '/routes/**/*.+(ts|js)')
    .map(filename => require(filename))
    .forEach(route => route.default(exports.app));
setupDev(exports.app, developmentMode);
// error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.app.use((err, req, res, _next) => {
    console.log(err);
    res.locals.message = err.message;
    res.locals.error = env === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
