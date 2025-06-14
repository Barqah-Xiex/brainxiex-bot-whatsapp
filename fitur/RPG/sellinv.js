const { default: axios } = require("axios");

const cmd = `sellinv`; 
const args = ``;
const category = `RPG`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, editMessage, player, jobName, jobID, rpg, random, achivment} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset} = func

    global.muteFromBot[m.sender] = true;

    const Akun = await player(m.sender);
    
    const inv = JSON.parse(Akun.Bot_WA_Inventory)||[];

    const hargaitem = await rpg.item.All();
    
    let totalpendapatan = 0;
    for (v of inv){
        const hargajual = hargaitem[v];
        totalpendapatan = totalpendapatan+hargajual;
    }
    await Akun.put("Bot_WA_Inventory","[]");

    await Akun.add("pCash",totalpendapatan);

    global.muteFromBot[m.sender] = false;


    nyarios(`Kamu menjual:\n${inv.map((v,i) => `${i}. *${v}* ${hargaitem[v]}bx`).join(`\n`)}\n\nkamu mendapatkan: ${totalpendapatan}bx`)



}
module.exports = {cmd,args,category,message};