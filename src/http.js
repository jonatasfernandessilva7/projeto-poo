import express from 'express';
import path from 'path';
import http from 'http';
import { Server } from "socket.io";

const porta = 8000;
const app = express();
const serverHttp = http.createServer(app);
const io = new Server(serverHttp);

app.use(express.static(path.join(__dirname, '..', '/')));

export  {
    serverHttp, io, porta
}
