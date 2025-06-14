const { default: axios } = require("axios");

const cmd = `artinama`; 
const args = `[nama]`;
const category = `Fun`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs} = func

    if(!isset(arg)) return nyarios(`mana ${arg}nya ?\n\ncontoh:\n${Prefix}${cmd} Asep`);
    sock.sendRequest(m).post(`${baseURL}/api/primbon/artinama`,{apikey, nama:arg}).then(({data: {Barqah:{artinya}}}) => nyarios(`${artinya}\n\napi by\nxiex.my.id`))
}
module.exports = {cmd,args,category,message};