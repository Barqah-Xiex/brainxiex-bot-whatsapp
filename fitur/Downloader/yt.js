const { default: axios } = require("axios");

const cmd = `yt`; 
const args = `[url video youtube]`;
const category = `Downloader`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset} = func
    
    if(isset(arg)){
        await sock.sendPresenceUpdate('recording', id);
        const url = `${arg}`;
        const {data: {Barqah:{url:link,link:yt,audio,title,thumb,error}}} = await sock.sendRequest(m).post(`${baseURL}/api/downloader/youtube`,{apikey,url}).catch(v => ({data: {v,Barqah:{error:true}},}));
        if(error){
            nyarios(`Error.\n\n${data.message}`);
            await sock.sendPresenceUpdate('available', id);
            return;
        }
        sock.banner(id, {image:{url:thumb}, caption: `*Sedang mengirim...*\nTitle: *${title}*\nLink: ${yt}\n\nDowwnload Manual:\n*[Video]* ${link}\n*[Audio]* ${audio}`})
        await sendMessage(id,{video: {url:link}, caption: `${title.replace("API xiex.my.id\n",'')}\n\napi by xiex.my.id`}, {quoted: m})
        await sock.sendPresenceUpdate('available', id);
    }else{
        sendMessage(id, {text: `masukan linknya`},{quoted:m})
    }
}
module.exports = {cmd,args,category,message};