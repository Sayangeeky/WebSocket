"use strict";
// import WebSocket from 'ws'
// import http from 'http'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const server = http.createServer((req: any, res: any) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' })
//     res.end("Hello")
// })
// const wss = new WebSocket.Server({ server })
// wss.on('connection', function connection(ws: WebSocket) {
//     ws.on('message', function incoming(data:WebSocket.RawData, isBinary) {
//         wss.clients.forEach(function each(client) {
//             if (client !== ws && client.readyState === WebSocket.OPEN) {
//                 client.send(data, { binary: isBinary });
//             }
//         })
//         ws.on('close', () => {
//             console.log("WebSocket Connection Closed");
//         })
//     })
// })
// server.listen(8080, () => {
//     console.log("Server is listening on port 8080...");
// })
const express_1 = __importDefault(require("express"));
const ws_1 = __importDefault(require("ws"));
const app = (0, express_1.default)();
const httpServer = app.listen(8080, () => {
    console.log("Server is listening ...");
});
const wss = new ws_1.default.Server({ server: httpServer });
wss.on('connection', (ws) => {
    console.log("Connection established");
    ws.on('message', (messaage, isBinary) => {
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === ws_1.default.OPEN) {
                client.send(messaage, { binary: isBinary });
            }
        });
    });
    ws.on('close', () => {
        console.log("WebSocket Connection Closed");
    });
});
