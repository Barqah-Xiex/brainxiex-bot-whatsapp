const { default: axios } = require("axios");
const FormData = require('form-data');

const cmd = `tolink`;
const args = ``;
const category = `Converter`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, downloadAndSaveMediaMessage} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey} = config;
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
        await sock.editMessage(mek,await sock.tolink(fileData,fileName));
    } else {
        sendMessage(id, { text: `mana mediannya ?\n(jika berbentuk file jangan di kasih caption)` }, { quoted:m })
    }
}
module.exports = { cmd, args, category, message };