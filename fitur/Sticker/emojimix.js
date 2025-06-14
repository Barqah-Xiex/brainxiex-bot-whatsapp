const { default: axios } = require("axios");

const cmd = `emojimix`;
const args = `[emoji1]+[emoji2]`;
const category = `Sticker`;
async function message(sock, m, store) {
  const { sendMessage, config, resize, media2buffer, MyIP, func, getName } = sock;
  const { chat: id, body, arg, nyarios, isOwner } = m;
  const { Prefix, banner, Nama_Bot, apikey,baseURL } = config;
  const { isset, fs, exec } = func;

  const quoted = m.quoted ? m.quoted : m || m.msg
  const mime = (quoted.msg || quoted).mimetype || ''
  const isMedia = /image|video|sticker|audio/.test(mime)


  if (!arg) return nyarios(`gunakan  ${Prefix}${cmd} 😘+😂`);
  const anjay = arg.replace(/[+_&-]/g, "+");
  let [emoji1, emoji2] = anjay.split(`+`);

  const pem = await nyarios("Sedang Proses Pembuatan ...");

  let { data: {results} } = await sock.sendRequest(m).get(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`);


  for (let res of results) {
    await sock.editMessage(pem, "Membuat ..."); 

    const base64 = await media2buffer(res.url);

    await sock.editMessage(pem, "Mengirim ke *https://xiex.my.id/api/image/sticker* ...");
  
    const { data } = await sock.sendRequest(m).post(`${baseURL}/api/image/sticker`, { apikey, base64, pack: Nama_Bot }, { responseType: 'arraybuffer' });
    const sticker = await Buffer.from(data, "utf-8");
  
    await sock.editMessage(pem, `Sticker Berhasil Di Buat dengan Nama: *${Nama_Bot}*`);
    await sendMessage(id, { sticker }, { quoted: m })
  }




}
module.exports = { cmd, args, category, message };
