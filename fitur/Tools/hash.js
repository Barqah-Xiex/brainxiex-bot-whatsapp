const crypto = require("crypto");

const cmd = `hash`;
const args = `[algoritma]|[teks]`;
const category = `Tools`;

async function message(sock, m, store) {
    const { sendMessage, config, resize, media2buffer, MyIP, func } = sock;
    const { chat: id, body, arg, isOwner, nyarios } = m;
    const { Prefix, banner, Nama_Bot, apikey, baseURL } = config;
    const { isset, axios, fs, sleep } = func;
    const AxiosDenganHandler = sock.sendRequest(m);

    const input = String(arg || ``).trim();
    if (!input) {
        return nyarios(
            `Masukan format: ${Prefix}${cmd} sha256|halo dunia\n` +
            `Algoritma: md5, sha1, sha256, sha512`
        );
    }

    if (input.length > 500) return nyarios(`Input terlalu panjang. Maksimal 500 karakter.`);

    const part = input.split(`|`);
    if (part.length < 2) {
        return nyarios(
            `Format salah. Gunakan: ${Prefix}${cmd} sha256|halo dunia\n` +
            `Algoritma: md5, sha1, sha256, sha512`
        );
    }

    const algo = String(part.shift() || ``).trim().toLowerCase();
    const text = part.join(`|`).trim();
    const supported = [`md5`, `sha1`, `sha256`, `sha512`];

    if (!supported.includes(algo)) {
        return nyarios(`Algoritma tidak didukung. Pilih: ${supported.join(`, `)}`);
    }
    if (!text) return nyarios(`Teks tidak boleh kosong.`);

    const result = crypto.createHash(algo).update(text).digest("hex");

    return nyarios(
        `*Hash Berhasil*\n` +
        `Algoritma: ${algo}\n` +
        `Panjang Teks: ${text.length}\n` +
        `Hasil: ${result}`
    );
}

module.exports = { cmd, args, category, message };
