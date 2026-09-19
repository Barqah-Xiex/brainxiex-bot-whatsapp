const { default: axios } = require("axios");
const id = `Z_shortcut`;
async function action(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, player} = sock;
    const {chat: id, body, arg, isOwner, nyarios, sender, pushName} = m;
    const {Prefix,banner,Nama_Bot,Nomor_Owner,apikey,baseURL} = config;
    const {isset,fs} = func
    
    // try{
        
    // }catch(e){
    //     console.log(e);
    // }
    
}
module.exports = {id,action};