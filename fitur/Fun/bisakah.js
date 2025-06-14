const { default: axios } = require("axios");

const cmd = `bisakah`; 
const args = `[pertanyaan]`;
const category = `Fun`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs} = func

    sock.sendRequest(m).get(`${baseURL}/api/random/bisakah?apikey=${config.apikey}`).then(({data: {Barqah}}) => nyarios(`bisakah ${arg}\n*${Barqah}*`))
}
module.exports = {cmd,args,category,message};