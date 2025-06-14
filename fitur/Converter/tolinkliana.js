const { default: axios } = require("axios");
const FormData = require('form-data');

const cmd = `tolinkliana`;
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


    if (isMedia) {
        // console.log(Post)
        const mek = await nyarios(`prosess download dari server WhatsApp, kela kedap ;v `)
        // const url = `https://lianaputri.000webhostapp.com/post.php`;
        const filePath = await downloadAndSaveMediaMessage(quoted);
        const fileName = filePath.split(`/temp/`)[1];
        const fileData = fs.readFileSync(filePath);
        // const fileBase64 = fileData.toString('base64');

        await sock.editMessage(mek,`prosess upload ke server utama Brainxiex, kela kedap ;v `);

        // const {data} = await sock..sendRequest(m).post(url, {file: {data: fileBase64, name: fileName}});
        await sock.editMessage(mek,`prosess upload ke server utama Brainxiex, kela kedap ;v `)
        await sock.editMessage(mek,`${await sock.tolinkliana(fileData,fileName)}`)
    } else {
        sendMessage(id, { text: `mana mediannya ?` }, { quoted:m })
    }
}
module.exports = { cmd, args, category, message };