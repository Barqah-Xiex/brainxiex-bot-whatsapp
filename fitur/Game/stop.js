const { default: axios } = require("axios");

const cmd = `stop`; 
const args = ``;
const category = `Game`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey} = config;
    const {isset} = func
    

    if(isset(sock.game[id])){
        const {soal, jawaban, alasan, money} = sock.game[id]
        sendMessage(id, {text: `game stoped !\nSoal:\n*${soal}*\n\nJawaban:\n${jawaban.map((v,i) => `${i+1}. *${v}*`).join(`\n`)}\n\n${alasan||``}`},{quoted: m})
        delete sock.game[id];
    }else{
        sendMessage(id, {text: `Tidak Ada Game Di Ruangan Ini !`},{quoted: m})

    }

    
}
module.exports = {cmd,args,category,message};