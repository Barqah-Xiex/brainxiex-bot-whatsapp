const cmd = "setprefix";
const args = "[prefix]";
const category = "Owner";

async function message(sock, m, store) {
    const { sendMessage, config, resize, media2buffer, MyIP, func } = sock;
    const { chat: id, body, arg, isOwner, nyarios } = m;
    const { Prefix, banner, Nama_Bot, apikey, baseURL } = config;
    const { isset, fs } = func;

    if (!isOwner) return nyarios("kamu bukan owner");

    const input = String(arg || "").trim();
    if (!isset(input)) return nyarios(`Masukan prefix baru. Contoh: ${Prefix}${cmd} !`);

    if (input.length !== 1) return nyarios("Prefix harus 1 karakter.");
    if (input.includes("`") || input.includes("\n") || input.includes("\r")) return nyarios("Prefix tidak valid.");

    const newPrefix = input;

    if (newPrefix === config.Prefix) return nyarios(`Prefix sudah ${newPrefix}`);

    const configPath = "./config.js";
    let configText = "";

    try {
        configText = fs.load(configPath).toString();
    } catch (err) {
        return nyarios("Gagal membaca config.js");
    }

    const escaped = newPrefix.replace(/\\/g, "\\\\").replace(/`/g, "\\`");
    const prefixLineRegex = /^(\s*Prefix\s*:\s*)([`'"])(.*?)(\2)/m;

    if (!prefixLineRegex.test(configText)) return nyarios("Gagal menemukan key Prefix di config.js");

    configText = configText.replace(prefixLineRegex, `$1\`${escaped}\``);

    try {
        fs.save(configPath, configText);
    } catch (err) {
        return nyarios("Gagal menyimpan config.js");
    }

    config.Prefix = newPrefix;

    return nyarios(`Prefix berhasil diubah menjadi: ${newPrefix}`);
}

module.exports = { cmd, args, category, message };
