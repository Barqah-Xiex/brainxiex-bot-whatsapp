const { default: axios } = require("axios");

const cmd = `join`; 
const args = `linkgrup`;
const category = `VIP`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, editMessage, player, jobName, jobID, rpg, random, achivment} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey} = config;
    const {isset} = func

    if(!isset(arg)) return nyarios("mana link grupnya");
    if(!arg.includes("chat.whatsapp.com/")) return nyarios("kasih linkgrup yang jelas lah");
    if(!isOwner && (await player(m.sender)).pVip <= 0) return nyarios("kamu bukan vip");
    const link = arg.split("chat.whatsapp.com/")[1].split("/")[0].split(" ")[0].split("\n")[0].split("]")[0]
    await sock.groupAcceptInvite(link).then(r => {
        nyarios(`Udah\n\nStatus:\n${JSON.stringify(r, null, 2)}`)
    }).catch(r => {
        // Barqah.groupAcceptInviteV4(link)
        nyarios(`Gagal\n\nStatus:\n${JSON.stringify(r, null, 2)}`)
    })
}
module.exports = {cmd,args,category,message};