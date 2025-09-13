const { default: axios } = require("axios");

const cmd = `reels`; 
const args = `[url video]`;
const category = `Downloader`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset} = func
    
    if(isset(arg)){
        await sock.sendPresenceUpdate('recording', id);
        const url = `${arg}`;
        const {data,error} = await sock.sendRequest(m).post(`${baseURL}/api/downloader/reels`,{apikey,url}).catch(v => ({data: v,error:true}));
        if(error){
            nyarios(`Error.\n\n${data.message}`);
            await sock.sendPresenceUpdate('available', id);
            return;
        }
        const {debug,from,uploader,video,thumbnail,caption,duration} = data;
        const text = `👤 Uploader: ${uploader}\n\n📤 From: ${from}\n\n📝 Caption: ${caption}\n\n⏱️ Duration: ${duration}`;
        await sendMessage(id,{video: {url: video}, caption: text}, {quoted: m});
        await sock.sendPresenceUpdate('available', id);
    }else{
        sendMessage(id, {text: `masukan linknya`},{quoted:m})
    }
}
module.exports = {cmd,args,category,message};