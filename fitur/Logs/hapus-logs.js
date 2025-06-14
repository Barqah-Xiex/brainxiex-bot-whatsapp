const { default: axios } = require("axios");

const cmd = `hapus-logs`; 
const args = ``;
const category = `logs`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs} = func

    if(!isOwner) return nyarios(`kamu bukan owner`)
    nyarios(`${fs.save(`./temp/logs.log`,``)}`)
}
module.exports = {cmd,args,category,message};