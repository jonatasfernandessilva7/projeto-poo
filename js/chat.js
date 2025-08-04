window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    const socket = io("https://projeto-poo-egea.onrender.com");

    const buscaURL = new URLSearchParams(window.location.search);
    const nomeUsuario = buscaURL.get('nomeUsuario');
    console.log(nomeUsuario);

    socket.emit('novoUsuario', { nomeUsuario });

    const nomeDeUsuario = document.getElementById('nomeUsuario');
    nomeDeUsuario.innerHTML = `Bem vindo ${nomeUsuario}`;

    const inputMsg = document.getElementById('inputMsg');
    inputMsg.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            console.log('inputMsg:', inputMsg);
            const mensagem = event.target.value.trim();
            if (mensagem.length === 0) return;

            const data = {
                nomeUsuario,
                mensagem
            };

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
                    <strong> ${data.nome} </strong> <span id="novaMensagem">${data.msg}</span>
                </label>
            </div>`;
    });

    // Fala
    const sintetizador = window.speechSynthesis;
    const botaoOuvir = document.getElementById('ouvirMsg');
    botaoOuvir.onclick = () => {
        let valor = document.querySelectorAll('#novaMensagem');
        let conta = valor.length;
        if (conta === 0) return;

        let texto = valor[conta - 1].textContent;
        let voz = sintetizador.getVoices();

        if (voz.length !== 0) {
            console.log('falando');
            let msg = new SpeechSynthesisUtterance();
            msg.voice = voz[0];
            msg.rate = 1;
            msg.pitch = 1;
            msg.text = texto;
            msg.lang = 'pt-BR';
            sintetizador.speak(msg);
        }
    };

    // Reconhecimento de voz
    const botaoFalar = document.getElementById('falarMsg');
    console.log('botaoFalar:', botaoFalar);
    botaoFalar.onclick = () => {
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
    };
});
