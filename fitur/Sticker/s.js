const { default: axios } = require("axios");

const cmd = `s`; 
const args = ``;
const category = `Sticker`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs,exec} = func;

    const quoted = m.quoted ? m.quoted : m || m.msg
    const mime = (quoted.msg || quoted).mimetype || ''
    const isMedia = /image|video|sticker|audio/.test(mime)

	if(!isMedia) return nyarios(`tidak ada media`)


    const mek = m.quoted || m.msg;
    const pem = await nyarios("Sedang Medownload dari Server WhatsApp");
    const buffer = (await media2buffer(await sock.downloadAndSaveMediaMessage(mek))).toString(`base64`);
    await sock.editMessage(pem, "Berhasil di download !!!");
    await sock.editMessage(pem, "Mengirim ke *https://xiex.my.id/api/image/sticker* ...");
    const {data} = await sock.sendRequest(m).post(`${baseURL}/api/image/sticker`,{apikey, base64: `${buffer}`,pack: isset(arg) ? arg : m.pushName},{ responseType: 'arraybuffer' });
    const result = await Buffer.from(data, "utf-8");
    await sock.editMessage(pem, `Sticker Berhasil Di Buat dengan Nama: *${isset(arg) ? arg : m.pushName}*`);
    await sendMessage(id,{sticker: result},{quoted: m})

}
module.exports = {cmd,args,category,message};
