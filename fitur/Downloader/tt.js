const axios = require("axios");

const cmd = `tt`; 
const args = `[url video tiktok]`;
const category = `Downloader`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset} = func
    
    if(isset(arg)){
        sock.sendPresenceUpdate('recording', id);
        const ar = `${arg}`;
        const {data:{Barqah:{title,url,thumb}},error} = await sock.sendRequest(m).get(`${baseURL}/api/downloader/tiktok?url=${ar}&apikey=${apikey}`).catch(v => ({data: v,error:true}));
        if(error){
            nyarios(`Error.\n\n${data.message}`);
            await sock.sendPresenceUpdate('available', id);
            return;
        }
        await sendMessage(id,{video: {url}, caption: `*${title}*\n\napi by xiex.my.id`}, {quoted: m})
        await sock.sendPresenceUpdate('available', id);
    }else{
        sendMessage(id, {text: `masukan linknya`},{quoted:m})
    }
}

module.exports = {cmd,args,category,message};