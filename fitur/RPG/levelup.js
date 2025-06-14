const { default: axios } = require("axios");

const cmd = `levelup`; 
const args = ``;
const category = `RPG`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, editMessage, player, jobName, jobID} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset} = func
    
    const Akun = await player(m.sender);
    function MyInfo(){
        return `Level: ${Akun.pLevel}/${Akun.pExp}\n\nKurang ${Akun.pExp - ((Akun.pLevel+1)*10)}`;
    }
    sock.banner(id,{image:`${baseURL}/api/image/banner?font_size=150&apikey=${apikey}&text=${encodeURIComponent(`Level ${Akun.pLevel}`)}`,caption:`${MyInfo()}`});
    
}
module.exports = {cmd,args,category,message};