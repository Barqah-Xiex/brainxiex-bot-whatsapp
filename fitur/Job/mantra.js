const { default: axios } = require("axios");

const cmd = `mantra`; 
const args = ``;
const category = `JOB`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, editMessage, player, jobName, jobID, rpg, random, achivment} = sock;
    const {chat: id, body, arg, isOwner, nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset} = func;

    return nyarios("masih tahap pembuatan");
	
    const isTempatRoleplay = id == `628979059392-1614471575@g.us`;
    const isTempatGame = id == "628979059392-1614471493@g.us" || isTempatRoleplay;
    const isTempatUtama = id == `628979059392-1594298364@g.us` || id == `628979059392-1606031648@g.us` || isTempatGame;
    
    if(!isTempatGame){
        return nyarios("WAJIB DI TEMPAT GAME !!!!\nLINK DI BAWAH !!!\n\n*Brainxiex Team*\nhttps://chat.whatsapp.com/IaF1WLRZS1vLvSuki9ipR7\n\n*Brainxiex*\nhttps://chat.whatsapp.com/JHgUISoG2bYCQLVXiFANaf\n\n*Game Area*\nhttps://chat.whatsapp.com/LmbD6QYEWnmEzEp4Tk2znx\n\n*Roleplay*\nhttps://chat.whatsapp.com/L82BriJfTYM6sxnA3LiipL")
    }

    const Akun = await player(m.sender);
    
    if(Akun.pJob != 74) return nyarios(`Kamu bukan penyihir !\ndaftar kerja dulu di *${Prefix}pekerjaan*`);

    const parseMention = (text = '') => [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net');
    const mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];
    const mentioned = [].concat(parseMention(body), (m.mentionedJid || []), (m.quoted ? [m.quoted.sender] : [m.sender]));

    global.muteFromBot[m.sender] = true;
    switch (args) {
        case 'tambihkeunpangalamana':
            if(Akun.pCash <= 10) return nyarios("uangmu kurang harus ada minimal 10 bx");
            const taged = mentioned[0];
            const target = await player(taged)[0];
            if(taged == m.sender || taged == sock.user.jid) return nyarios("reply atau tag orangnya");
            if(target.pCash <= 10) return nyarios("uang dia kurang. minimal harus ada 10bx");
            target.add("pExp", 10);
            target.add("pCash", -10);
            Akun.add("pCash",-10);

            sock.banner(id,{image:`https://xiex.my.id/api/image/banner?font_size=150&apikey=${apikey}&text=${encodeURIComponent(`+10 xp`)}`,caption:`*@${m.nomor} mebambah 10 xp kepaada @${taged.split("@")[0]}`})
            break;
    
        default:
            nyarios("mantra tidak benar");
            break;
    }
    global.muteFromBot[m.sender] = false;

}
module.exports = {cmd,args,category,message};