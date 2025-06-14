const { default: axios } = require("axios");

const cmd = `tebakbendera`; 
const args = ``;
const category = `Game`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, editMessage} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset} = func
    

    if(!isset(sock.game[id])){
        const {data: {Barqah: {soal,jawaban,alasan}}} = await axios.get(`${baseURL}/api/minigame/tebakbendera?apikey=${config.apikey}`)
        sock.game[id] = {soal, jawaban:[jawaban], alasan, money: 10}
        console.log(sock.game[id])
        const mek = {chat: id,...await nyarios(`${soal}`)}
        setTimeout(() => {
            if(isset(sock.game[id])){
                const {soal, jawaban, alasan, money} = sock.game[id]
                editMessage(mek,`game stoped !\nSoal:\n*${soal}*\n\nJawaban:\n${jawaban.map((v,i) => `${i+1}. *${v}*`).join(`\n`)}\n\n${alasan||``}`)
                delete sock.game[id];
            }
        }, 15_000);
    }else{
        sendMessage(id, {text: `kamu masih ada game!\ngunakan *${Prefix}stop* untuk menstop game yang sedang berlangsung di ruangan ini`},{quoted:m})
    }

    
}
module.exports = {cmd,args,category,message};