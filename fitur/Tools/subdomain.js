const axios = require("axios");


const cmd = `subdomain`; 
const args = `[domain]`;
const category = `Tools`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, isOwner,nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset, fs,sleep} = func
    
    if(!isset(arg)) return nyarios(`Contoh Masukan: ${Prefix}${cmd} xiex.my.id`);
    const {data:{Barqah}} = await sock.sendRequest(m).post(`https://xiex.my.id/api/tools/subdomain`,{apikey,domain:arg});
    nyarios(Barqah.join("\n"))
}
module.exports = {cmd,args,category,message};