const { default: axios } = require("axios");

const cmd = `judi`; 
const args = `[nominal]`;
const category = `Game`;
async function message(sock, m, store) {
    const {sendMessage, config, resize, media2buffer, MyIP, func, editMessage, player, jobName, jobID, rpg, random, achivment} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix, banner, Nama_Bot, apikey} = config;
    const {isset} = func
    
    if(!isset(arg)) return nyarios(`Silahkan masukkan nominal taruhan!`);
    const input_nominal = `${arg.split(` `)[0]}`.replace(/[^0-9]/g, '');
    const nominal = Number(input_nominal); 
    if(isNaN(nominal)||nominal == NaN) return nyarios(`Mohon masukkan nominal dengan angka yang valid!`);
    if(nominal <= 0) return nyarios(`Nominal tidak boleh kurang dari atau sama dengan 0!`);
    if(nominal > 100_000) return nyarios(`Maksimal taruhan adalah 100.000!`);

    global.muteFromBot[m.sender] = true;

    const Akun = await player(m.sender);
    if(nominal > Akun.pCash) return nyarios(`Maaf, saldo anda tidak mencukupi untuk melakukan taruhan ini!`);
    
    const kali = (await player(m.sender)).pVip >= 1 
        ? [0, 0.25, 0.5, 0.75, 1.25, 1.5, 1.75, 2, 4]
        : [0, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4];
    
    const mek = await nyarios(`🎲 Anda memasang taruhan sebesar *${nominal.toLocaleString()}bx*`);
    const send = (a) => sock.editMessage(mek, a);

    const animasi = ['🎲', '🎯', '🎰', '🎲', '🎯', '🎰'];
    for(let i = 0; i < 10; i++) {
        await send(`${animasi[i % animasi.length]} Memutar...\n*x${random(kali)}*`);
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    const dapat = random(kali);
    const pendapatan = Math.floor(nominal * dapat);
    
    let hasil = pendapatan > nominal ? '🎉 Selamat!' : pendapatan === nominal ? '😐 Seri!' : '😔 Sayang sekali!';
    await send(achivment([
        `${hasil}`,
        `Multiplier: x${dapat}`,
        `Hasil: ${pendapatan.toLocaleString()}bx`,
        `${pendapatan > nominal ? '+' : ''}${(pendapatan - nominal).toLocaleString()}bx`
    ]));
    
    await Akun.add("pCash", -nominal);
    (await player(m.sender)).add("pCash", pendapatan);
    global.muteFromBot[m.sender] = false;
}

module.exports = {cmd, args, category, message};