const { default: axios } = require("axios");
const FormData = require('form-data');

const cmd = `bayangkan`;
const args = `[prompt]`;
const category = `AI`;
async function message(sock, m, store) {
    const { sendMessage, config, resize, media2buffer, MyIP, func } = sock;
    const { chat: id, body, arg, nyarios, isOwner } = m;
    const { Prefix, banner, Nama_Bot, apikey, baseURL} = config;
    const { isset, fs } = func
    const quoted = m.quoted ? m.quoted : m || m.msg
    const mime = (quoted.msg || quoted).mimetype || ''
    const isMedia = /image|video|sticker|audio/.test(mime)

    try {
        if (isset(arg)) {
            sock.loadingMessage(id, "*Done*")
            sock.sendRequest(m).post(`${baseURL}/api/ai/imagine`, { apikey, prompt: arg }, { responseType: 'arraybuffer' }).then(({ data }) => {
                sendMessage(id, { image: Buffer.from(data, `utf-8`), caption: `api by xiex.my.id` },{quoted:m});
            }).catch(e => nyarios(e))
        } else {
            sendMessage(id, { text: `mana textnya ?\n\ncontoh: ${Prefix}${cmd} dog with hat` }, { quoted: m })
        }
    } catch (e) {
        console.error(e);
        nyarios(e)
    }
}
module.exports = { cmd, args, category, message };
