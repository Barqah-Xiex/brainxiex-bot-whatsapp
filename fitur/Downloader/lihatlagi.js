const { default: axios } = require("axios");

const cmd = `lihatlagi`; 
const args = ``;
const category = `Downloader`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, isOwner,nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey} = config;
    const {isset} = func
    
    if(m.quoted){
        const message = m.quoted.fakeObj;
        message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
        message.message.viewOnceMessage = {...message.message.viewOnceMessage, ...message.message.viewOnceMessageV2}
        const vtype = Object.keys(message.message.viewOnceMessage?.message || message.message)[0]
        delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
        delete message.message.viewOnceMessage.message[vtype].viewOnce
        message.message = {
        ...message.message.viewOnceMessage.message
        }
        const key = Object.keys(message.message)[0]
        message.message[key].contextInfo = {...message.message[key].contextInfo, ...sock.generateQuoted(m,false)}
        sock.relayMessage(id,message.message,{messageId: `BarqahXiexGantengINIVirtualBot${(new Date().getTime())}`}).catch(_ => nyarios(`Maybe It's Opened`,console.log(_)))
        // m.quoted.copyNForward(m.chat, false, {readViewOnce: true}, {quoted: m}).catch(_ => nyarios(`Maybe It's Opened`,console.log(_)))
    }else{
        sendMessage(id, {text: `mana ? coba reply tampilah sekalilihatnya !`},{quoted:m})
    }
}
module.exports = {cmd,args,category,message};