const { default: axios } = require("axios");

const cmd = `lirik`; 
const args = `[judul lagu]`;
const category = `Fun`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey} = config;
    const {isset,fs} = func

    if(!isset(arg)) return nyarios(`mana judulnya ?\n\ncontoh:\n${Prefix}${cmd} laskar pelangi`);
    sock.sendRequest(m).post(`${baseURL}/api/search/lirik`,{apikey, search:arg}).then(({data: {Barqah}}) => {
      if(Barqah?.error) return nyarios(`Sepertinya Liriknya Tidak Tersedia`);
      nyarios(`*${Barqah.title}*\n\n${Barqah.lyrics.join("")}`)
    })
}
module.exports = {cmd,args,category,message};