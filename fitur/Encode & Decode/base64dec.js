const { default: axios } = require("axios");

const cmd = `base64dec`; 
const args = `[base64 string]`;
const category = `Encode & Decode`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs} = func

    if(!isset(arg)) return nyarios(`mana textnya ?`)
    sock.sendRequest(m).get(`${baseURL}/api/tools/base64?apikey=${apikey}&mode=decode&text=${encodeURIComponent(arg)}`).then(({data: {Barqah}}) => nyarios(Barqah))
}
module.exports = {cmd,args,category,message};