const cmd = `runtime`;
const args = ``;
const category = `Information`;

async function message(sock, m, store) {
    const { sendMessage, config, resize, media2buffer, MyIP, func } = sock;
    const { chat: id, body, arg, isOwner, nyarios } = m;
    const { Prefix, banner, Nama_Bot, apikey, baseURL } = config;
    const { isset, axios, fs, sleep } = func;
    const AxiosDenganHandler = sock.sendRequest(m);

    const uptimeSec = Math.floor(process.uptime());
    const day = Math.floor(uptimeSec / 86400);
    const hour = Math.floor((uptimeSec % 86400) / 3600);
    const minute = Math.floor((uptimeSec % 3600) / 60);
    const second = uptimeSec % 60;

    const mem = process.memoryUsage();
    const toMB = (val) => (val / 1024 / 1024).toFixed(2);

    return nyarios(
        `*Runtime Bot*\n` +
        `Uptime: ${day} hari ${hour} jam ${minute} menit ${second} detik\n` +
        `Node: ${process.version}\n` +
        `Platform: ${process.platform}\n` +
        `RSS: ${toMB(mem.rss)} MB\n` +
        `Heap Used: ${toMB(mem.heapUsed)} MB`
    );
}

module.exports = { cmd, args, category, message };
