const { default: axios } = require("axios");

const cmd = `tebakgambar`; 
const args = ``;
const category = `Game`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset} = func
    

    if(!isset(sock.game[id])){
        const {data: {Barqah: {gambar: soal,jawaban}}} = await sock.sendRequest(m).get(`${baseURL}/api/minigame/tebakgambar?apikey=${apikey}`)
        sock.game[id] = {soal:`<soalnya stiker njir>`, jawaban:[jawaban], alasan: `${jawaban}`, money: 10}
        console.log(sock.game[id])
        sendMessage(id, {sticker: {url:`${soal}`}},{quoted:m})
        setTimeout(() => {
            if(isset(sock.game[id]) && jawaban == sock.game[id] ){
                const {soal, jawaban, alasan, money} = sock.game[id]
                nyarios(`game stoped !\nSoal:\n*${soal}*\n\nJawaban:\n${jawaban.map((v,i) => `${i+1}. *${v}*`).join(`\n`)}\n\n${alasan||``}`)
                delete sock.game[id];
            }
        }, 15_000);
    }else{
        sendMessage(id, {text: `kamu masih ada game!\ngunakan *${Prefix}stop* untuk menstop game yang sedang berlangsung di ruangan ini`},{quoted:m})
    }
}
module.exports = {cmd,args,category,message};