import { Server } from 'socket.io';
import { createServer } from 'http';
const WebSocket = require("ws");

//client websocket
const clientFR = new WebSocket("ws://192.168.101.47:4004/event_channel/0/a5883093ecaf36c5/NFV4-FR");
clientFR.on("open", () => {
    console.log("Client connected");
});

clientFR.on("close", () => {
    console.log("Client disconnected");
})

// density
// counting
// dwelling
const client = new WebSocket("ws://192.168.101.47:4004/event_channel/0/a5883093ecaf36c5/NFV4-MPA?logic=counting");
console.log("Starting.....\n");

client.on("open", () => {
    console.log("Client connected");
});

// client.on("message", (msg: any) => {
    // console.log("pesan: " + msg);
// })

client.on("close", () => {
    console.log("Client disconnected");
})

//server websocket
const server = createServer()
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        // origin: "https://00ad-116-206-242-110.ngrok-free.app",
        credentials: true,
        methods: ["GET", "POST"],
    }
});

io.on('connection', (socket) => {
    console.log('Socket connection connected');

    client.on("message", (msg: any) => {
        console.log('PEOPLE =>\n' + msg + "\n\n");
        io.emit("message", JSON.parse(msg));
    })

    clientFR.on("message", (msg: any) => {
        console.log('FR =>\n' + msg + "\n\n");
        io.emit("message", JSON.parse(msg));
    })
});

io.on('disconnect', (socket) => {
    console.log('Socket disconnected');
});

server.listen(8900, () => {
    console.log(`Server listening on Port: 8900`);
});
