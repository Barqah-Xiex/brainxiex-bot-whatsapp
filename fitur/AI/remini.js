const { default: axios } = require("axios");

const cmd = `remini`; 
const args = `[prompt]`;
const category = `AI`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs} = func;

    const quoted = m.quoted ? m.quoted : m || m.msg
    const mime = (quoted.msg || quoted).mimetype || ''
    const isMedia = /image|video|sticker|audio/.test(mime)

	if(!isMedia) return nyarios(`tidak ada media`)


    const mek = m.quoted || m.msg;
    const pem = await nyarios("Sedang Medownload dari Server WhatsApp");
    const buffer = await sock.downloadMediaMessage(mek);
    await sock.editMessage(pem, "Berhasil di download !!!");
	const imageBase64 = await buffer.toString(`base64`)
    await sock.editMessage(pem, "Prosess ...");
    await sock.sendMessage(id,{image: await sock.getBuffer(`${baseURL}/api/ai/remini`,{apikey,imageBase64}),caption:`api by xiex.my.id`},{quoted:m})
}
module.exports = {cmd,args,category,message};