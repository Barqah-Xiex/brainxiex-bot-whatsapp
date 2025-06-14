const axios = require("axios");

const cmd = `play`;
const args = `[nama music]`;
const category = `Downloader`;
async function message(sock, m, store) {
    const { sendMessage, config, resize, media2buffer, MyIP, func } = sock;
    const { chat: id, body, arg, isOwner, nyarios } = m;
    const { Prefix, banner, Nama_Bot, apikey,baseURL } = config;
    const { isset, fs, sleep } = func

    if (!isset(arg)) return nyarios(`apa yang mau dicari`);
    sock.sendPresenceUpdate('recording', id);
    const {data: {Barqah:{url:link,link:yt,audio,title,thumb,error}}} = await sock.sendRequest(m).post(`${baseURL}/api/downloader/play`,{apikey,search:arg}).catch(v => ({data: {v,Barqah:{error:true}}}));
    if (error||false) {
        nyarios(`Error.\n\n${data.v.message}`);
        await sock.sendPresenceUpdate('available', id);
        return;
    }
    sock.banner(id, {image:{url:thumb}, caption: `*Sedang mengirim...*\nTitle: ${title.replace("API xiex.my.id\n",'')}\nLink: ${yt}\n\nDowwnload Manual:\n*[Video]* ${link}\n*[Audio]* ${audio}`});
    const Message = {
        audio: { url: audio },
        ptt: true,
        contextInfo: {
            externalAdReply: {
                mediaType: 2,
                renderLargerThumbnail: true,
                showAdAtrribution: true,
                title,
                body: `Powered By xiex.my.id`,
                previewType: 0,
                thumbnail: await media2buffer(thumb),
                thumbnailUrl: thumb.startsWith(`http`) ? thumb : undefined,
                sourceUrl: `http://xiex.my.id`,
                mediaUrl: `${yt}`,
            }
        },
    }
    await sock.sendMessage(id, Message, { quoted: m });
    await sock.sendPresenceUpdate('available', id);
}
module.exports = { cmd, args, category, message };