import { serverHttp, porta } from './http.js';
import './websocket.js';

serverHttp.listen(porta, () => {
    console.log('server rodando em ' + porta);
});
