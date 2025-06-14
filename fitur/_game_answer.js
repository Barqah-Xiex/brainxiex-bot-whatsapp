const { default: axios } = require("axios");
const id = `Game-Answer`;
async function action(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, player} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs} = func

    sock.game = sock.game||{};

    
    
    if(!isset(sock.game[id])) return;
    if(!(isset(sock.game[id].jawaban) || isset(sock.game[id].money) ) ) return;
    if(!(sock.game[id].jawaban.map(v => `${v}`.toLocaleLowerCase()).includes(body.toLocaleLowerCase()))) return;

    nyarios(`*Benar !*\n${sock.game[id].alasan||``}\n\n*+${sock.game[id].money}bx*`);
    const p = await player(m.sender);
    p.add("pCash",Number(`${sock.game[id].money}`));
    
    delete sock.game[id];
    
}
module.exports = {id,action};