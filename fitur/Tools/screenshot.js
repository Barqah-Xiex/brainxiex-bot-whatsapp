const { default: axios } = require("axios");

const cmd = `screenshot`; 
const args = `[url]`;
const category = `Tools`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs} = func

    if(!isset(arg)) return nyarios(`mana linknya ?`);
    
    sendMessage(id,{image: await sock.getBuffer(`${baseURL}/api/image/screenshot`,{apikey,url:arg}), caption: `api by xiex.my.id`});

}
module.exports = {cmd,args,category,message};