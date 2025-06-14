const { default: axios } = require("axios");

const cmd = `bank`; 
const args = ``;
const category = `Bank`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, editMessage, player} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset} = func
    
    const Akun = await player(m.sender);
    sock.banner(id,{image:`${baseURL}/api/image/banner?font_size=150&apikey=${apikey}&text=${encodeURIComponent(`+${Akun.pBank} bx`)}`,caption:`Saldo: *${Akun.pBank}*bx`});
}
module.exports = {cmd,args,category,message};