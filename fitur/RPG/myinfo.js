const { default: axios } = require("axios");

const cmd = `myinfo`; 
const args = ``;
const category = `RPG`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, editMessage, player, jobName, jobID} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey} = config;
    const {isset} = func
    
    const Akun = await player(m.sender);
    function MyInfo(){
        return `Uang: ${Akun.pCash}\nBank: ${Akun.pBank}\nLevel: ${Akun.pLevel}/${Akun.pExp}\n\nPekerjaan: ${jobName(Akun.pJob)}`
    }
    nyarios(MyInfo());
    
}
module.exports = {cmd,args,category,message};