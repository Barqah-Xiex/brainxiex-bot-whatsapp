const { default: axios } = require("axios");

const cmd = `Zodiak`; 
const args = `[NomorTanggal] [NomorBulan]`;
const category = `Fun`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs} = func

    if(!isset(arg)) return nyarios(`mana ${arg}nya ?\n\ncontoh:\n${Prefix}${cmd} 9 12`);
    const [tanggal, bulan] = arg.split(" ");
    sock.sendRequest(m).post(`${baseURL}/api/primbon/Zodiak`,{apikey, tanggal, bulan}).then(({data: {Barqah:{artinya}}}) => nyarios(`Zodiaknya:\n*${artinya}*\n\n\n\nJangan Terlalu Percaya Karena Itu Termasuk Menyekutukan Allah\n\n\napi by\nxiex.my.id`))
}
module.exports = {cmd,args,category,message};