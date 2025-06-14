const { default: axios } = require("axios");

const cmd = `report`; 
const args = `[text]`;
const category = `Report`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, mysql:{getAll}} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs,exec, sleep} = func

    if(!isset(arg)) return nyarios(`masukan perintah !\n\ncontoh: ${Prefix}report [text]`);
    sendMessage(`${config.Nomor_Owner}@s.whatsapp.net`,{text: `*Report*\nName: ${m.pushName}\nNomor: ${m.nomor}\nURL: https://wa.me/${m.nomor}\n\n${arg}`},{quoted: m})
    .then(v => nyarios(`Pesan Berhasil dikirim ke Owner Bot`));
}
module.exports = {cmd,args,category,message};