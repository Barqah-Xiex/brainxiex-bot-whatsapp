const { default: axios } = require("axios");

const cmd = `dompet`; 
const args = ``;
const category = `RPG`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, editMessage, player} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset} = func
    
    const Akun = await player(m.sender);
    nyarios(`${Akun.pCash}`);

    
}
module.exports = {cmd,args,category,message};