const { default: axios } = require("axios");

const cmd = `infoip`; 
const args = `[ip]`;
const category = `Tools`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs} = func

    if(!isset(arg)) return nyarios(`mana ipnya ?`);
    
    const target = arg.toLocaleLowerCase().includes("localhost") ? "" : arg.startsWith("http") ? new URL(arg).hostname : arg
    const ip = await sock.sendRequest(m).get(`http://ip-api.com/json/${target}?fields=66846719`).then(v => v.data).catch(e => { error: "kesalahan input" });
    const text = Object.keys(ip).map(v => `*${v}* = ${ip[v]}`).join("\n")

    nyarios(text);

}
module.exports = {cmd,args,category,message};