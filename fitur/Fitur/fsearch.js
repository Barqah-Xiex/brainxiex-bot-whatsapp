const { default: axios } = require("axios");
const { writeFileSync, readdirSync, statSync } = require("fs");

const cmd = `fsearch`; 
const args = ``;
const category = `Fitur`;
async function message(liana, m, store) {
    const {sendMessage, config,resize,media2buffer} = liana;
    const {chat: id, body, arg, isOwner} = m;
    const {Prefix,banner,Nama_Bot,baseURL} = config;
    
    if(isOwner){
        const {data} = await sock.sendRequest(m).get(`${baseURL}/vbot-list`)
        const text = data.map((v,i) => `${i+1}. *${v}*`).join(`\n`)
        sendMessage(id,{text},{quoted: m})
    }else{
        sendMessage(id,{text: `kamu bukan owner bot ini`},{quoted: m})
    }
}
module.exports = {cmd,args,category,message};