// import WebSocket from 'ws'
// import http from 'http'

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

import express from 'express'
import WebSocket from 'ws'

const app = express()

const httpServer = app.listen(8080, ()=>{
    console.log("Server is listening ...");
    
})
const wss = new WebSocket.Server({server: httpServer})

wss.on('connection', (ws:WebSocket) => {
    console.log("Connection established");

    ws.on('message', (messaage:WebSocket.RawData, isBinary: boolean) => {
        wss.clients.forEach((client:any) => {
            if (client !== ws && client.readyState === WebSocket.OPEN){
                client.send(messaage, {binary: isBinary})
            }
        })
    })
    ws.on('close', () => {
        console.log("WebSocket Connection Closed");
        
    })
    
})