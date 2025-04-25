#!/usr/bin/env node
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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const https = __importStar(require("https"));
const path = __importStar(require("path"));
const app_1 = require("./app");
let httpsServer = null;
// used by shutdownCheck in readinessChecks
app_1.app.locals.shutdown = false;
// TODO: set the right port for your application
const port = parseInt(process.env.PORT || '3100', 10);
if (app_1.app.locals.ENV === 'development') {
    const sslDirectory = path.join(__dirname, 'resources', 'localhost-ssl');
    const sslOptions = {
        cert: fs.readFileSync(path.join(sslDirectory, 'localhost.crt')),
        key: fs.readFileSync(path.join(sslDirectory, 'localhost.key')),
    };
    httpsServer = https.createServer(sslOptions, app_1.app);
    httpsServer.listen(port, () => {
        console.log(`Application started: https://localhost:${port}`);
    });
}
else {
    app_1.app.listen(port, () => {
        console.log(`Application started: http://localhost:${port}`);
    });
}
function gracefulShutdownHandler(signal) {
    console.log(`⚠️ Caught ${signal}, gracefully shutting down. Setting readiness to DOWN`);
    // stop the server from accepting new connections
    app_1.app.locals.shutdown = true;
    setTimeout(() => {
        console.log('Shutting down application');
        // Close server if it's running
        httpsServer?.close(() => {
            console.log("HTTPS server closed");
        });
    }, 4000);
}
process.on('SIGINT', gracefulShutdownHandler);
process.on('SIGTERM', gracefulShutdownHandler);
