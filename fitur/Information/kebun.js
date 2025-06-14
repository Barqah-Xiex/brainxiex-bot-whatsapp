const cmd = `kebun`;
const args = ``;
const category = `RPG`;

async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, player} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs} = func
    
    const Akun = await player(m.sender);
    if(Akun.pJob != 10) return nyarios(`Kamu bukan petani !\ndaftar kerja dulu di *${Prefix}pekerjaan*`);

    const Kebun = (JSON.parse(Akun.Bot_WA_Kebun)||[]).map(([timestamp,bibit]) => {
        const now = new Date().getTime();
        const distance = timestamp - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        let countdownString = '';
        if (days > 0) countdownString += `${days}hari `;
        if (hours > 0) countdownString += `${hours}jam `;
        if (minutes > 0) countdownString += `${minutes}menit `;
        if (seconds > 0) countdownString += `${seconds}detik`;

        return `*✧ ${bibit} ✧*\n${distance <= 0 ? (distance <= (5*60*1000)) ? `harus secepatnya di panen` : (distance <= (24*60*60*1000)) ? `tanaman sudah mati`  : `siap di *${Prefix}panen* !` : countdownString }`;
    });


    const text = `>>>> *Kebun* <<<<\n\n`+Kebun.join("\n\n");

     
    await nyarios(text);

}
module.exports = {cmd,args,category,message};