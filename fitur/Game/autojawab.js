const { default: axios } = require("axios");

const cmd = `autojawab`; 
const args = ``;
const category = `Game`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func,player} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey} = config;
    const {isset, fs} = func

    const p = await player(m.sender);
    const isVIP = p.pVip > 0;

    if(!isVIP) return nyarios(`kamu bukan vip !`)
    sock.game = sock.game||{};

    
    
    if(!isset(sock.game[id])) return nyarios(`tidak ada game`);
    if(!(isset(sock.game[id].jawaban) || isset(sock.game[id].money) ) ) return nyarios(`game telah berakhir`);

    nyarios({text: `*Benar !*\n${sock.game[id].jawaban}\n${sock.game[id].alasan||``}\n\n*+${sock.game[id].money}bx*`});
    
    p.add("pCash",Number(`${sock.game[id].money}`));
    
    delete sock.game[id];
}
module.exports = {cmd,args,category,message};