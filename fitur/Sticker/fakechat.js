const { default: axios } = require("axios");

const cmd = `fakechat`; 
const args = `[kata kata]`;
const category = `Sticker`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, getName} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs,exec} = func;

    const quoted = m.quoted ? m.quoted : m || m.msg
    const mime = (quoted.msg || quoted).mimetype || ''
    const isMedia = /image|video|sticker|audio/.test(mime)

	if(!arg) return nyarios(`tidak ada katakata`)

    const pem = await nyarios("Sedang Proses Pembuatan ...");

    const parseMention = (text = '') => [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
    const mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    const mentioned = [].concat(parseMention(body), (m.mentionedJid || []), (m.quoted ? [m.quoted.sender] : [m.sender]))

    await sock.editMessage(pem, "Mengambilnama dan foto profile ...");

    const name = mentioned[0] == m.sender ? m.pushName : getName(mentioned[0]);

    const ppimg = await sock.profilePictureUrl(mentioned[0], "image").catch(v => `${baseURL}/media/1655612010102undefined.png`);

    await sock.editMessage(pem, "Membuat ...");


    const {data} = await sock.sendRequest(m).post(`${baseURL}/api/image/fakechat`,{apikey, arg, ppimg, name, pack: Nama_Bot},{ responseType: 'arraybuffer' });
    const sticker = await Buffer.from(data, "utf-8");

    await sock.editMessage(pem, `Sticker Berhasil Di Buat dengan Nama: *${Nama_Bot}*`);
    await sendMessage(id,{sticker},{quoted: m})

}
module.exports = {cmd,args,category,message};
