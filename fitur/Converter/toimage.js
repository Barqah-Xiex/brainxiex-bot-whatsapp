const { default: axios } = require("axios");
const FormData = require('form-data');

const cmd = `toimage`;
const args = ``;
const category = `Converter`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, downloadAndSaveMediaMessage} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const { isset, fs } = func


    const quoted = {...m.msg, ...m.quoted, ...(m.quoted ? m.quoted : m||m.msg)?.message?.documentMessage}||(m.quoted ? m.quoted : m||m.msg)
    const mime = quoted.mimetype || ''
    const isMedia = /image|video|sticker|audio|application|text/.test(mime)
    
    // return nyarios(`gunakan terlebih dahulu tolinkliana`)

    if (isMedia) {
        // console.log(Post)
        const mek = await nyarios(`prosess download dari server WhatsApp, kela kedap ;v `)
        const filePath = await downloadAndSaveMediaMessage(quoted);
        const fileName = filePath.split(`/temp/`)[1];
        const fileData = fs.readFileSync(filePath);

        await sock.editMessage(mek,`prosess upload ke server utama Brainxiex, kela kedap ;v `);
        const fileurl = await sock.tolink(fileData,fileName);
        await sock.editMessage(mek,fileurl);
        await sock.editMessage(mek,"mengubah....");
        await sock.sendMessage(id,{image: {url:`${baseURL}/api/tools/format?apikey=${apikey}&fileurl=${fileurl}&toext=jpeg`}, caption:"API By xiex.my.id/api"},{quoted: m});
        await sock.editMessage(mek, "Mengirim...");
        await sock.editMessage(mek, "Selesai !");
    } else {
        sendMessage(id, { text: `mana mediannya ?\n(jika berbentuk file jangan di kasih caption)` }, { quoted:m })
    }
}
module.exports = { cmd, args, category, message };