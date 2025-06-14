const { default: axios } = require("axios");

const cmd = `id`; 
const args = ``;
const category = `Tools`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs} = func

    nyarios(id);

}
module.exports = {cmd,args,category,message};