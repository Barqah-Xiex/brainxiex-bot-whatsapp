const { default: axios } = require("axios");

const cmd = `artimimpi`; 
const args = `[mimpi]`;
const category = `Fun`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs} = func

    if(!isset(arg)) return nyarios(`mana ${arg}nya ?\n\ncontoh:\n${Prefix}${cmd} terbang`);
    sock.sendRequest(m).post(`${baseURL}/api/primbon/artimimpi`,{apikey, mimpi:arg}).then(({data: {Barqah:{artinya}}}) => nyarios(`Jangan Terlalu Percaya Karena Itu Termasuk Menyekutukan Allah\n\n\n\n${artinya.map(v => `*${`${v}`.split(`=`)[0]}*\n${`${v}`.split(`=`)[1]}`.replace(/ \*/g,`*`)).replace(/\n /g,`\n`).join(`\n\n`)}\n\napi by\nxiex.my.id`))
}
module.exports = {cmd,args,category,message};