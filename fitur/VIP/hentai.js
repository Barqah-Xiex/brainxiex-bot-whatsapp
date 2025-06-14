const { default: axios } = require("axios");

const cmd = `hentai`; 
const args = ``;
const category = `VIP`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, editMessage, player, jobName, jobID, rpg, random, achivment} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey} = config;
    const {isset} = func

    const p = (await player(m.sender));
    if(!isOwner && p.pVip <= 0) return nyarios("kamu bukan vip");
    if(p.pCash < 100) return nyarios("uang tidak cukup perlu 100bx");
    try{
        sendMessage(id,{image:{url:`${baseURL}/api/nsfw/hentai?apikey=${config.apikey}`},caption: achivment([`-100 bx`])},{quoted:m});
    }catch(e){
        nyarios(`${require("util").format(e)}`)
    }
    p.add("pCash",-100)
}
module.exports = {cmd,args,category,message};