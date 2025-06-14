const { default: axios } = require("axios");

const cmd = `twt`; 
const args = `[url video twitter]`;
const category = `Downloader`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset} = func
    
    if(isset(arg)){
        await sock.sendPresenceUpdate('recording', id);
        const url = `${arg}`;
        const {data: {Barqah:{url:link,title,thumb}}, error} = await sock.sendRequest(m).post(`${baseURL}/api/downloader/twitter`,{apikey,url}).catch(v => ({data: v,error:true}));
        if(error){
            nyarios(`Error.\n\n${data.message}`);
            await sock.sendPresenceUpdate('available', id);
            return;
        }
        await sendMessage(id,{video: {url:link}, caption: `*${title}*\n\napi by xiex.my.id`}, {quoted: m});
        await sock.sendPresenceUpdate('available', id);
    }else{
        sendMessage(id, {text: `masukan linknya`},{quoted:m})
    }
}
module.exports = {cmd,args,category,message};