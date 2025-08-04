import { io } from './http.js';

const users = [];
const mensagens = [];

io.on('connection', (socket) => {
    console.log('nova conexão', socket.id);

    socket.on('novoUsuario', data => {
        console.log(data);
        socket.join(data.nomeUsuario);

        const noChat = users.find((user) => user.nomeUsuario === data.nomeUsuario)
        if(noChat){
            noChat.idUser = socket.id;
        }else{
            users.push({nomeUsuario: data.nomeUsuario, idUser: socket.id});
        }

        console.log(users);
    });

    socket.on('mensagem', data => {
        const mensagem  = {
            nomeUsuario: data.nomeUsuario,
            mensagem: data.mensagem,
            dataAt: new Date()
        }
        mensagens.push(mensagem);

        socket.broadcast.emit('mensagem', mensagem);
        io.to(data.nomeUsuario).emit('mensagem', mensagem);
    });

    socket.on('disconnect', function(){
        users.slice(users.indexOf(socket), 1);
        console.log('desconectou');
    });
});
