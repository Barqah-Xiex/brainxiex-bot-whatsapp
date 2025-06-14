const axios = require("axios");
const id = `___anti`;
async function action(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, grup, player, ai} = sock;
    const {chat: id, body, arg, isOwner, nyarios, sender, pushName, isGroup, cmd, awalan, chatUpdate} = m;
    const {Prefix,banner,Nama_Bot,Nomor_Owner,apikey,baseURL,antispam, isThisBotVIP} = config;
    const {isset,fs} = func


    const isTempatRoleplay = id == `628979059392-1614471575@g.us`;
    const isTempatGame = id == "628979059392-1614471493@g.us" || isTempatRoleplay;
    const isTempatUtama = id == `628979059392-1594298364@g.us` || id == `628979059392-1606031648@g.us` || isTempatGame;

    sock.NotVIPDetected = sock.NotVIPDetected || {};
    if(sock.NotVIPDetected[m.sender] && !isTempatUtama) return 1;

    const parseMention = (text = '') => [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net');
    const mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];
    const mentioned = [].concat(parseMention(body), (m.mentionedJid || []), (m.quoted ? [m.quoted.sender] : []));



    
    if(antispam.grup && antispam.sender && antispam.world && !isTempatGame){
        sock.antispam = sock.antispam || {};
        sock.antispam[id] = sock.antispam[id] || 0;
        sock.antispam[sender] = sock.antispam[sender] || 0;
        sock.antispam["world"] = sock.antispam["world"] || 0;

        sock.antispam_listpesan = sock.antispam_listpesan || {};
        sock.antispam_listpesan[body] = sock.antispam_listpesan[body] || 0;
        sock.antispam_listpesan[arg] = sock.antispam_listpesan[arg] || 0;
        sock.antispam_listpesan[body]++;
        sock.antispam_listpesan[arg]++;

        const max_pesan_yang_sama = isGroup ? antispam.grup : antispam.sender
        const isPesanSama = sock.antispam_listpesan[body] >= max_pesan_yang_sama || sock.antispam_listpesan[arg] >= max_pesan_yang_sama;
        if(isPesanSama){
            if(isGroup) sock.antispam[id] += max_pesan_yang_sama;
            sock.antispam[sender] += max_pesan_yang_sama;

            sock.antispam_listpesan[body]++;
            sock.antispam_listpesan[arg]++;
            return true;
        }

        const isFromMe = m.key.fromMe;
        const isCommand = Object.keys(sock.Command).includes(cmd);
        const isAwalan = Object.keys(sock.Command).includes(awalan.toLowerCase());

        const isCMD = isCommand || isAwalan || !isGroup;

        
        if(isCMD && !isTempatUtama){
            if(isGroup) sock.antispam[id]++;
            sock.antispam[sender]++;
            sock.antispam["world"]++;
    
            
            const isNewSpam = sock.antispam[id] >= antispam.grup || sock.antispam[sender] >= antispam.sender;
            const isSpam = sock.antispam[id] >= antispam.grup+2 || sock.antispam[sender] >= antispam.sender+2;
            const isWorldSpam = sock.antispam["world"] >= antispam.world;
            
            if(isSpam){
                return 1;
            }
            if(isNewSpam){
                nyarios(`*「(｡>﹏<｡) Anti Spam Terdeteksi!」*\n\n⚠️ Peringatan: Sistem pencegah kelebihan beban aktif! (｀･ω･´)ゞ\n\n💝 Tolong jangan spam ya~\n🌸 Mari jaga server kita tetap sehat!\n\n      > Kode Error: 429 <\n > Terlalu Banyak Permintaan <`);
                return 1;
            }
    
            if(isWorldSpam){
                nyarios(`⚠️ (｡>﹏<｡) Aduh! Server sedang tidak sehat~\n\n[!] Status: KELELAHAN (◕︿◕✿)\n[!] Sistem: PEMULIHAN...\n\n > Mohon tunggu sebentar ya! <\n > Kami sedang berusaha menyembuhkan! <\n\n(｀･ω･´)ゞ`);
                return 1;
            }
        }

    }

    if(fs.existsSync(`./database/afk/${m.sender}`)){
        sock.banner(id,{image:{url: `${baseURL}/api/image/banner?apikey=${apikey}&text=${encodeURIComponent("Aktif Kembali")}&ppimg=${encodeURIComponent(await sock.profilePictureUrl(m.sender))}`},caption:`@${m.nomor} telah kembali dari afk ${fs.readFileSync(`./database/afk/${m.sender}`).toString()}`},{quoted:m});
        fs.unlinkSync(`./database/afk/${m.sender}`);
    }

    for(let i of mentioned){
        if(fs.existsSync(`./database/afk/${i}`)){
            const alasan = fs.readFileSync(`./database/afk/${i}`).toString();
            sock.banner(id,{image:{url: `${baseURL}/api/image/banner?apikey=${apikey}&text=${encodeURIComponent(`(( AFK )) ${alasan}`)}&ppimg=${encodeURIComponent(await sock.profilePictureUrl(i))}`},caption:`@${m.nomor} sedang afk dengan alasan ${alasan}`},{quoted:m});
        }
    }

    

    const p = await player(m.sender, false);
    if(!isGroup){
        if(p.pVip <= 0 && !isOwner){
            if(isThisBotVIP) sock.NotVIPDetected[m.sender] = true;
            if(config.promosi_grup){
                sock.banner(id,`*「You Are Not VIP member」*\nHubungi:\nhttps://wa.me/${Nomor_Owner}\nuntuk membeli VIP\n\nYok Gabung Ke Grup ini !\n\n*Brainxiex Team*\nhttps://chat.whatsapp.com/IaF1WLRZS1vLvSuki9ipR7\n\n*Brainxiex*\nhttps://chat.whatsapp.com/JHgUISoG2bYCQLVXiFANaf\n\n*Game Area*\nhttps://chat.whatsapp.com/LmbD6QYEWnmEzEp4Tk2znx\n\n*Roleplay*\nhttps://chat.whatsapp.com/L82BriJfTYM6sxnA3LiipL`);
                return 1;               
            }
        }  
        
        if(
            body.toLocaleLowerCase().includes("anjing") ||
            body.toLocaleLowerCase().includes("kontol") ||
            body.toLocaleLowerCase().includes("memek") ||
            body.toLocaleLowerCase().includes("babi") ||
            body.toLocaleLowerCase().includes("jembut") ||
            body.toLocaleLowerCase().includes("yatim") ||
            body.toLocaleLowerCase().includes("kontl") ||
            body.toLocaleLowerCase().includes("ajg") ||
            body.toLocaleLowerCase().includes("ngentot") ||
            body.toLocaleLowerCase().includes("gblk") ||
            body.toLocaleLowerCase().includes("goblok") ||
            body.toLocaleLowerCase().includes("gblok") ||
            body.toLocaleLowerCase().includes("bego") ||
            body.toLocaleLowerCase().includes("tolol") ||
            body.toLocaleLowerCase().includes("dumb") ||
            body.toLocaleLowerCase().includes("kntl") 
            ){
                nyarios(`
*Astaghfirullah Astaghfirullah Astaghfirullah*


Dari Abu Hurairah radhiyallahu ‘anhu, Rasulullah SAW bersabda:

*مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا، أَوْ لِيَصْمُتْ*

“Barang siapa beriman kepada Allah dan hari akhir, maka berkatalah yang baik dan jika tidak maka diamlah.” (HR. Bukhari no. 6018 dan Muslim no. 47)`)

}

        return 0;
    }

    const {participants,subject,owner,desc} = await sock.groupMetadata(m.chat)
    
    function getGroupAdmins (participants) {
        let admins = []
        for (let i of participants) {
            i.admin === "superadmin" ? admins.push(i.id) :  i.admin === "admin" ? admins.push(i.id) : ''
        }
        return admins || []
    }
    const Admins = getGroupAdmins(participants);
    const isAdmin = Admins.includes(m.sender);
    const isBotAdmin = Admins.includes(sock.user.jid);

    const g = await grup(id, false);
    const {antilinkgrup, antilinkall, antinulldevice, antiwame, antidelete, antitoxic, antitagall,limit,blacklist} = g;

    
    // console.log(id,g);
    if(p.pVip > 0) g.add("limit",1);

    if(!body.includes("limit") && p.pVip <= 0 && (Object.keys(sock.Command).includes(cmd) || Object.keys(sock.Command).includes(awalan.toLowerCase()))){
        if(limit <= 0 && limit >= -1000 ){
            if(!isTempatUtama){
                nyarios(`limit habis !!\nGunakan: ${Prefix}addlimit atau ${Prefix}claim`);
            }
        }else{
            if(limit >= -1000){
                g.add("limit",-1);
            }
        }
    }


    if(antiwame && `${body}`.toLocaleLowerCase().includes("wa.me/settings")){
        await nyarios(`*「ANTI WA .ME/SETTINGS」Terdeteksi*\nkamu terdetek menulis link bug`);
        await sock.deleteMessage(m);
        // return 1;
    }
    if(antilinkall && `${body}`.toLocaleLowerCase().includes("http")){
        if(isAdmin) return nyarios(`antilinkall sebenarnya aktif tetapi kamu admin !`);
        await nyarios(`*「ANTI LINK ALL」Terdeteksi*`);
        await sock.deleteMessage(m);
        // return 1;
    }
    if(antilinkgrup && `${body}`.toLocaleLowerCase().includes("chat.whatsapp.com")){
        if(isAdmin) return nyarios(`antilinkgrup sebenarnya aktif tetapi kamu admin !`);
        await nyarios(`*「ANTI LINK GRUP」Terdeteksi*`);
        await sock.deleteMessage(m);
        // return 1;
    }
    if(antinulldevice && (m.key.id.startsWith('BAE5') && m.key.id.length >= 7 && m.key.id.length <= 18)) {
        await nyarios(`*「ANTI NULL DEVICE」Terdeteksi*\nkamu terdetek menggunakan device selain\n*android*\n*ios*\n*web*\n*windows*\n*linux*`);
        await sleep(3000);
        isBotAdmin ? await sock.kick(id, m.sender) : nyarios("bot bukan admin tidak dapat mengkick !!!")
        // return 1;
    }
    if(Object.keys(blacklist||[]).includes(m.sender)){
        await nyarios(`*「Blacklist」Terdeteksi*\nkamu terblacklist\n\n*Sujud Dulu Ke @${`${blacklist[m.sender]}`.replace(/\n/g,``)}*`)
        await sleep(3000);
        isBotAdmin ? await sock.kick(id, m.sender) : nyarios("bot bukan admin tidak dapat mengkick !!!")
    }
    if(antidelete && m.isDeleted){
        const {deletedMessage} = JSON.parse(m.body)||{};
        if(!isset(deletedMessage)) return;
        console.log(deletedMessage)
        try{
            const {key: {remoteJid,id: idmes}} = deletedMessage;
            const daristore = store.msg[remoteJid][idmes];
            const udahdigenerate = daristore.message;
            
            const mek = await sendMessage(id,`*「ANTI DELETE」Terdeteksi*\nkamu menghapus pesan di grup ini`,{quoted: daristore});
            
            const key = Object.keys(udahdigenerate)[0];
            udahdigenerate[key].contextInfo = {...udahdigenerate[key].contextInfo, ...sock.generateQuoted(mek,false)}
            await sock.relayMessage(id, udahdigenerate, { messageId: `BarqahXiexGantengINIVirtualBot${idmes}` });
        }catch(e){
            console.error(e)
        }

    }
    if(antitoxic){
        if(
            body.toLocaleLowerCase().includes("anjing") ||
            body.toLocaleLowerCase().includes("kontol") ||
            body.toLocaleLowerCase().includes("memek") ||
            body.toLocaleLowerCase().includes("babi") ||
            body.toLocaleLowerCase().includes("jembut") ||
            body.toLocaleLowerCase().includes("yatim") ||
            body.toLocaleLowerCase().includes("kontl") ||
            body.toLocaleLowerCase().includes("ajg") ||
            body.toLocaleLowerCase().includes("ngentot") ||
            body.toLocaleLowerCase().includes("gblk") ||
            body.toLocaleLowerCase().includes("goblok") ||
            body.toLocaleLowerCase().includes("gblok") ||
            body.toLocaleLowerCase().includes("bego") ||
            body.toLocaleLowerCase().includes("tolol") ||
            body.toLocaleLowerCase().includes("dumb") ||
            body.toLocaleLowerCase().includes("kntl") 
            ){
                nyarios(`
*Astaghfirullah Astaghfirullah Astaghfirullah*


Dari Abu Hurairah radhiyallahu ‘anhu, Rasulullah SAW bersabda:

*مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا، أَوْ لِيَصْمُتْ*

“Barang siapa beriman kepada Allah dan hari akhir, maka berkatalah yang baik dan jika tidak maka diamlah.” (HR. Bukhari no. 6018 dan Muslim no. 47)`)

}
    }
    try {
        
    } catch (error) {
        console.error(error);
        return 0;
    }
    
    // grup(id);

    
}
module.exports = {id,action};