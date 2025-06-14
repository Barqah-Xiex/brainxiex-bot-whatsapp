const { default: axios } = require("axios");

const cmd = `reupload`; 
const args = `[messageid]`;
const category = `Owner`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs,exec} = func

    if(isOwner && !config.publicbot){
        if(!isset(arg)) nyarios(`masukan perintah`);
        const [remoteJid,idmes] = arg.split(" ");
            try{
                const daristore = store.msg[remoteJid][idmes];
                const udahdigenerate = daristore.message;
                
                const key = Object.keys(udahdigenerate)[0];
                udahdigenerate[key].contextInfo = {...udahdigenerate[key].contextInfo, ...sock.generateQuoted(mek,false)}
                await sock.relayMessage(m.sender, udahdigenerate, { messageId: `BarqahXiexGantengINIVirtualBot${idmes}` });
            }catch(e){
                console.error(e)
            }
    }else{
        nyarios(`kamu bukan owner`)
    }
}
module.exports = {cmd,args,category,message};