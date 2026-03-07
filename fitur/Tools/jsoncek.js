const cmd = `jsoncek`;
const args = `[json]`;
const category = `Tools`;

async function message(sock, m, store) {
    const { sendMessage, config, resize, media2buffer, MyIP, func } = sock;
    const { chat: id, body, arg, isOwner, nyarios } = m;
    const { Prefix, banner, Nama_Bot, apikey, baseURL } = config;
    const { isset, axios, fs, sleep } = func;
    const AxiosDenganHandler = sock.sendRequest(m);

    const raw = String(arg || ``).trim();
    if (!raw) return nyarios(`Masukan JSON. Contoh: ${Prefix}${cmd} {"nama":"barqah"}`);
    if (raw.length > 2000) return nyarios(`JSON terlalu panjang. Maksimal 2000 karakter.`);

    let parsed;
    try {
        parsed = JSON.parse(raw);
    } catch (err) {
        return nyarios(`JSON tidak valid.\nPesan: ${err.message}`);
    }

    const type = Array.isArray(parsed) ? `array` : parsed === null ? `null` : typeof parsed;
    const keys = type === `object` ? Object.keys(parsed).length : 0;
    const length = type === `array` ? parsed.length : 0;

    let info = `*JSON Valid*\nTipe: ${type}`;
    if (type === `object`) info += `\nJumlah Key: ${keys}`;
    if (type === `array`) info += `\nJumlah Item: ${length}`;

    return nyarios(info);
}

module.exports = { cmd, args, category, message };
