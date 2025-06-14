const { default: axios } = require("axios");

const cmd = `cita-cita`; 
const args = `[nama]`;
const category = `Fun`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs} = func

    sock.sendRequest(m).get(`${baseURL}/api/random/citacita?apikey=${config.apikey}`).then(({data: {Barqah}}) => nyarios(`cita-citanya adalah ${Barqah}`))
}
module.exports = {cmd,args,category,message};