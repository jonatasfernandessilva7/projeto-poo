import express from 'express';
import path from 'path';
import http from 'http';
import { Server } from "socket.io";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const porta = 8000;
const app = express();
const serverHttp = http.createServer(app);
const io = new Server(serverHttp,     
    cors: {
        origin: "https://jonatasfernandessilva7.github.io", // Permita requisições apenas do seu frontend
        methods: ["GET", "POST"] // Métodos HTTP permitidos
    }});

const corsOptions = {
    origin: 'https://jonatasfernandessilva7.github.io',
    optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, '..', '/')));

export  {
    serverHttp, io, porta
}
