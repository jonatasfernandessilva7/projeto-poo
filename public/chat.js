var socket = io();

const buscaURL = new URLSearchParams(window.location.search);
const nomeUsuario = buscaURL.get('nomeUsuario');

console.log(nomeUsuario);

socket.emit('novoUsuario', {
    nomeUsuario
});

const nomeDeUsuario = document.getElementById('nomeUsuario');
nomeDeUsuario.innerHTML = `Bem vindo ${nomeUsuario}`

let inputMsg = document.getElementById('inputMsg');

inputMsg.addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
        const mensagem = event.target.value;
        console.log(mensagem);
        data = {
            nomeUsuario,
            mensagem
        }
        socket.emit('mensagem', data);
        event.target.value = '';
    }
});

socket.on('mensagem', data => {
    console.log(data);

    const msgDiv = document.getElementById('mensagem');

    msgDiv.innerHTML += `
    <div class="novaMensagem">
    <label class="form-label">
        <strong> ${data.nome} </strong> <span> ${data.msg}</span>
    </label>
    </div>`
});