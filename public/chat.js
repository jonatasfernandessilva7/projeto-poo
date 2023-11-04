var socket = io();

const buscaURL = new URLSearchParams(window.location.search);
const nomeUsuario = buscaURL.get('nomeUsuario');

console.log(nomeUsuario);

socket.emit('novoUsuario', {
    nomeUsuario
});

const nomeDeUsuario = document.getElementById('nomeUsuario');
nomeDeUsuario.innerHTML = `Bem vindo ${nomeUsuario}`

const inputMsg = document.getElementById('inputMsg');

inputMsg.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
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
            <strong> ${data.nome} </strong> <output id="novaMensagem">${data.msg}</output>
        </label>
    </div>`
});

//////////////////////////////////////////////////////////////////////////


const sintetizador = window.speechSynthesis;

function ouvir() {
    let texto = document.getElementById('novaMensagem').value;
    let voz = sintetizador.getVoices();

    if (voz.length !== 0) {
        console.log('falando');
        let msg = new SpeechSynthesisUtterance();
        msg.voz = voz[0]; //primeira voz
        msg.rate = 1; //velocidade
        msg.pitch = 1; //tom
        msg.text = texto;
        msg.lang = 'pt-BR'
        sintetizador.speak(msg)
    }
}

const botaoOuvir = document.getElementById('ouvirMsg');

botaoOuvir.onclick = ouvir;

/////////////////////////////////////////////////////////////////////////////////


function falar() {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

        let minhaFala = new SpeechRecognition();
        minhaFala.lang = 'pt-BR';

        minhaFala.start();

        minhaFala.addEventListener('result', (event) => {
            var result = event.results[0][0].transcript;
            console.log(result);
            inputMsg.value = result;
        });
    }
}

const botaoFalar = document.getElementById('falarMsg');

botaoFalar.onclick = falar;