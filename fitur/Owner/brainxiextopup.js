const { default: axios } = require("axios");

const cmd = `brainxiextopup`; 
const args = `[nomor] [nominal]`;
const category = `Owner`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, editMessage, player, jobName, jobID, rpg, random, achivment} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey} = config;
    const {isset} = func

    if(!isOwner || config.publicbot) return nyarios("kamu tidak dapat menggunakan command ini!");

    if(!isset(arg)) return nyarios(`gunakan: ${Prefix}${cmd} [1 - 4]\n1. Bronze\n2. Silver\n3. Gold\n4. Diamond`);

    const [nomor,nominal] = arg.split(" ");

    const Orang = await player(nomor);
    await Orang.add("Uang",Number(nominal));

    nyarios(`Transaksi Telah Selesai Berhasil Menambah Saldo\nSaldo Dia: ${(await player(nomor)).Uang}`);
    sendMessage(nomor+"@s.whatsapp.net", `*Transaksi Anda Di Nyatakan Sukses !!!*\n\nSaldo Anda Sekarang:\n*${(await player(nomor)).Uang}*`);




}
module.exports = {cmd,args,category,message};