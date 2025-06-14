const { default: axios } = require("axios");

const cmd = `enchant`; 
const args = `[text]`;
const category = `Encode & Decode`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey} = config;
    const {isset,fs} = func

    if(!isset(arg)) return nyarios(`mana textnya ?`)
    sock.sendRequest(m).get(`${baseURL}/api/tools/enchant?apikey=${apikey}&mode=encode&text=${encodeURIComponent(arg)}`).then(({data: {Barqah}}) => nyarios(Barqah))
}
module.exports = {cmd,args,category,message};