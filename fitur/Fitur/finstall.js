const { default: axios } = require("axios");
const { writeFileSync } = require("fs");

const cmd = `finstall`; 
const args = `[nama file fitur]`;
const category = `Fitur`;
async function message(liana, m, store) {
    const {sendMessage, editMessage,config,resize,media2buffer} = liana;
    const {chat: id, body, arg, isOwner} = m;
    const {Prefix,banner,Nama_Bot,baseURL} = config;
    const {isset} = func
    
    if(!isset(arg)) return nyarios(`masukan nama fitur atau masukan kata all untuk menginstall semua fitur yang ada !`);
    if(isOwner){
        if(`${arg}`.toLocaleLowerCase() == "all") {
            const {data: fiturfitur} = await sock.sendRequest(m).get(`${baseURL}/vbot-list`);
            const mek = await nyarios(`memasang semua...`);
            fiturfitur.forEach(async(e) => {
                const {data: {status,message,name,body}} = await sock.sendRequest(m).post(`${baseURL}/vbot-get?name=${e}`);
                if(status){
                    await writeFileSync(`./fitur/${name}`,Buffer.from(body,`base64`));
                    await editMessage(mek,`*${name}* sudah terpasang mohon *${Prefix}restart*`)
                }else{
                    await editMessage(mek,`${message}. mohon cari terlebih dahulu menggunakan *${Prefix}fitur-search*`)
        
                }
            });
            return;
        }
        const {data: {status,message,name,body}} = await sock.sendRequest(m).post(`${baseURL}/vbot-get?name=${arg}`);
        if(status){
            await writeFileSync(`./fitur/${name}`,Buffer.from(body,`base64`));
            sendMessage(id,{text: `*${name}* sudah terpasang mohon *${Prefix}restart*`},{quoted: m})
        }else{
            sendMessage(id,{text: `${message}. mohon cari terlebih dahulu menggunakan *${Prefix}fitur-search*`},{quoted: m})

        }
    }else{
        sendMessage(id,{text: `kamu bukan owner bot ini`},{quoted: m})
    }
}
module.exports = {cmd,args,category,message};