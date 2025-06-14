const { default: axios } = require("axios");

const cmd = `buyumpan`; 
const args = ``;
const category = `Shop`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, editMessage, player, jobName, jobID, rpg, random, achivment} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset} = func

    const Akun = await player(m.sender);

    if(!isset(arg)) return nyarios(`masukin nominalnya`);
    const nominal = `${arg.split(` `)[0]}`.replace(/[^0-9]/g, '');

    if(isNaN(nominal)||nominal == NaN) return nyarios(`masukan nominal dengan benar !!!`);
    if(nominal <= 0) return nyarios(`gak bisa kurang dari sama dengan 0`);
    if(nominal > 100_000) return nyarios(`gak bisa lebih dari 100k`);
    if(nominal > Akun.pCash) return nyarios(`uang kurang`);

    global.muteFromBot[m.sender] = true;
    
    await Akun.add("pCash", -nominal);
    await Akun.add("Bot_WA_Umpan", nominal);
    
    global.muteFromBot[m.sender] = false;


    nyarios(achivment([`+${nominal} Umpan`,`-${nominal} Uang`]));
}
module.exports = {cmd,args,category,message};