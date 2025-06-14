const { default: axios } = require("axios");

const cmd = `unblockme`; 
const args = ``;
const category = `Owner`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey} = config;
    const {isset,fs,exec} = func


    sock.updateBlockStatus(m.sender, 'unblock').then(a => nyarios(`Berhasil membuka blokir ${m.sender.split("@")[0]}`)).catch(a => nyarios(`Gagal membuka blokir ${m.sender.split("@")[0]}`))
}
module.exports = {cmd,args,category,message};