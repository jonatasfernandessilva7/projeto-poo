import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";

var socket = io("https://projeto-poo-egea.onrender.com");

const buscaURL = new URLSearchParams(window.location.search);
const nomeUsuario = buscaURL.get('nomeUsuario');

console.log(nomeUsuario);

socket.emit('novoUsuario', {
    nomeUsuario
});

const nomeDeUsuario = document.getElementById('nomeUsuario');
nomeDeUsuario.innerHTML = `Bem vindo ${nomeUsuario}`
const inputMsg = document.getElementById('inputMsg');

function enviarMensagem() {
    console.log('inputMsg:', inputMsg);
    event.preventDefault();
    const mensagem = inputMsg.value.trim();
    const dataFormatada = new Date(data.dataAt).toLocaleString();
    if (mensagem.length === 0) return;
    
    const data = {
        nomeUsuario,
        mensagem,
        dataAt
    };
    
    socket.emit('mensagem', data);
    event.target.value = '';
}

const buttonEnviarMensagemEscrita = document.getElementById('enviarMsg');
console.log(buttonEnviarMensagemEscrita);

socket.on('mensagem', data => {
    console.log("Mensagem recebida:", data); 

    const msgDiv = document.getElementById('mensagem');
    
    msgDiv.innerHTML += `
    <div class="novaMensagem">
        <label class="form-label">
            <strong>${data.nomeUsuario} (${dataFormatada}) :</strong> 
            <span class="novaMensagem">${data.mensagem}</span>
        </label>
    </div>`;
});  

//////////////////////////////////////////////////////////////////////////


const sintetizador = window.speechSynthesis;

function ouvir() {
    let valor = document.querySelectorAll('#novaMensagem');
    let conta = valor.length;
    let texto = valor[conta-1].textContent;
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

/////////////////////////////////////////////////////////////////////////////////


function falar() {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const minhaFala = new SpeechRecognition();
        minhaFala.lang = 'pt-BR';
        minhaFala.interimResults = false;

        minhaFala.start();

        minhaFala.onresult = (event) => {
            const result = event.results[0][0].transcript;
            console.log(`Texto reconhecido: ${result}`);
            if (inputMsg) {
                inputMsg.value = result;
                inputMsg.focus(); 
            }
        };

        minhaFala.onerror = (e) => {
            console.error('Erro de reconhecimento de voz:', e.error);
        };
    } else {
        console.error('Reconhecimento de voz não suportado neste navegador.');
    }
}

const botaoFalar = document.getElementById('falarMsg');

///////////////////////////////////////////////////////////////

buttonEnviarMensagemEscrita.addEventListener('click', enviarMensagem);
botaoOuvir.addEventListener('click', ouvir);
botaoFalar.addEventListener('click', falar);
