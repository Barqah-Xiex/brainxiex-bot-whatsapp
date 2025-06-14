const { default: axios } = require("axios");

const cmd = `hack`; 
const args = `[namamu]`;
const category = `Fun`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey} = config;
    const {isset,fs} = func

    const nama = isset(arg) ? arg : m.pushName;

    if(!isset(nama)) return nyarios(`masukan namamu !`);
    const mek = await nyarios(`Proses 0%😈\n`);
    await sock.editMessage(mek, `Proses 10%😈\nMembruteforce sistem keamanan.`);
    await sock.editMessage(mek, `Proses 23%😈\nMembruteforce sistem keamanan..`);
    await sock.editMessage(mek, `Proses 34%😈\nMembruteforce sistem keamanan...`);
    await sock.editMessage(mek, `Proses 49%😈\nMendapatkan akses !`);
    await sock.editMessage(mek, `Proses 78%😈\nMembuat Shell Backdoor !`);
    await sock.editMessage(mek, `Proses 86%😈\nBackdoor Sudah Antidelete !`);
    await sock.editMessage(mek, `Proses 100%😈\nSudah Menjadi Milik Anda !`);
    await sock.editMessage(mek, `Hacked By ${nama} 😈\nhttps://hacked.xiex.my.id/${encodeURIComponent(nama)}.html`);
}
module.exports = {cmd,args,category,message};