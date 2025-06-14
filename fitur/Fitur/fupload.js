const { default: axios } = require("axios");
const { readFileSync, writeFileSync, readdirSync, statSync, existsSync } = require("fs");

const cmd = `fupload`; 
const args = `[nama file fitur]`;
const category = `Fitur`;
async function message(liana, m, store) {
    liana.MyIP = `xiex.my.id`;
    const {sendMessage, config,resize,media2buffer, MyIP, func} = liana;
    const {chat: id, body, arg, isOwner} = m;
    const {Prefix,banner,Nama_Bot,baseURL} = config;
    const {isset} = func
    

    if(isOwner){
        if(isset(arg)){
            if(existsSync(`./fitur/${arg}`)){
                const {status,message:namanya} = await sock.sendRequest(m).post(`${baseURL}/vbot-upload`,{name:arg,config,body: readFileSync(`./fitur/${arg}`).toString(`base64`),MyIP})
                sendMessage(id,{text: `${status ? `sukses file tersimpan`:`gagal,`} ${namanya}`},{quoted: m})
            }else{
                sendMessage(id,{text: `file yang anda maksudkan tidak di temukan mohon gunakan ${Prefix}fitur-list`},{quoted: m})
            }
        }else{
            sendMessage(id,{text: `yang mana ? gunakan ${Prefix}fitur-list`},{quoted: m})
        }
    }else{
        sendMessage(id,{text: `kamu bukan owner bot ini`},{quoted: m})
    }
}
module.exports = {cmd,args,category,message};