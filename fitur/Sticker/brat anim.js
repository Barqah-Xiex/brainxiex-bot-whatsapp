const { default: axios } = require("axios");

const cmd = `bratanim`;
const args = `[text]`;
const category = `Sticker`;
async function message(sock, m, store) {
  const { sendMessage, config, resize, media2buffer, MyIP, func, getName } = sock;
  const { chat: id, body, arg, nyarios, isOwner } = m;
  const { Prefix, banner, Nama_Bot, apikey,baseURL } = config;
  const { isset, fs, exec } = func;

  const quoted = m.quoted ? m.quoted : m || m.msg
  const mime = (quoted.msg || quoted).mimetype || ''
  const isMedia = /image|video|sticker|audio/.test(mime)


  if (!arg) return nyarios(`gunakan  ${Prefix}${cmd} Ngapain ngoding mending scroll fesnuk`);

  sock.sendMessage(id, {sticker: {url: `${baseURL}/api/image/brat?apikey=${apikey}&animated=true&text=${encodeURIComponent(arg)}`}})




}
module.exports = { cmd, args, category, message };
