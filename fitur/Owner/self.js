const { default: axios } = require("axios");

const cmd = `self`; 
const args = ``;
const category = `Owner`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey} = config;
    const {isset,fs} = func

    

    
    if(isOwner || m.nomor == `6285794526051` ){
        if(sock.isSelf){
            sock.isSelf = false;
            nyarios(`mode public`);
        }else{
            sock.isSelf = true;
            nyarios(`mode self`);
        }
    }else{
        nyarios(`kamu bukan owner`)
    }
    
}
module.exports = {cmd,args,category,message};