const axios = require("axios");


const cmd = `robloxstalk`; 
const args = `[username]`;
const category = `Tools`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func} = sock;
    const {chat: id, body, arg, isOwner,nyarios} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset, fs,sleep} = func
    
    if(!isset(arg)) return nyarios(`apa yang mau dicari`);
    try{
        const {data:{Barqah}} = await sock.sendRequest(m).post(`${baseURL}/api/tools/robloxstalk`,{apikey,username:arg});

        const {info, userPresences, image, socialLinks, avatar} = Barqah;
        const url = (image && (image.body || image.bust || image.headshot)) || '';
        const prev = (info.previousUsernames && info.previousUsernames.length) ? info.previousUsernames.join(', ') : '-';
        const joined = info.joinDate ? new Date(info.joinDate).toLocaleString('id-ID') : (info.created ? new Date(info.created).toLocaleString('id-ID') : '-');
        const social = Object.entries(socialLinks || {})
            .filter(([,v]) => v)
            .map(([k,v]) => `${k}: ${v}`)
            .join('\n') || '-';
            const assets = (avatar && Array.isArray(avatar.assets)) ? avatar.assets : [];
            const assetsCount = assets.length;

            // Group assets by kategori (fallback to assetType.name or 'Unknown'), store objects for nicer formatting
            const grouped = assets.reduce((acc, a) => {
                const k = a.assetType?.kategori || a.assetType?.name || 'Unknown';
                if (!acc[k]) acc[k] = [];
                acc[k].push({ id: a.id, name: a.name || '-' });
                return acc;
            }, {});

            // Format each category like:
            // 👖 Pants
            // [12345] Dark Green Jeans
            const assetsByCategory = Object.entries(grouped)
                .map(([k, arr]) => `${k}\n${arr.map(it => `[${it.id}] ${it.name}`).join('\n')}`)
                .join('\n\n') || '-';

            const avatarType = avatar?.playerAvatarType || '-';
            const scales = avatar?.scales ? `H:${avatar.scales.height ?? '-'} W:${avatar.scales.width ?? '-'} Head:${avatar.scales.head ?? '-'}` : '-';
            const bodyColors = avatar?.bodyColors ? Object.entries(avatar.bodyColors).map(([k,v]) => `- ${k}:${v}`).join('\n') : '-';

            const caption = `*🔎 Roblox Stalk — Informasi Pengguna*

🧑‍💻 Nama: ${info.name || '-'} (${info.displayName || '-'})
👤 Username: ${info.username || '-'}
🆔 ID: ${info.id || '-'}
💬 Status: ${userPresences?.status || '-'}${userPresences?.lastLocation ? ` (${userPresences.lastLocation})` : ''}
📅 Bergabung: ${joined}
🎂 Umur: ${info.age ?? '-'}
🤝 Teman: ${info.friendCount ?? '-'}
👥 Pengikut: ${info.followerCount ?? '-'}
➕ Mengikuti: ${info.followingCount ?? '-'}
✅ Terverifikasi: ${info.hasVerifiedBadge ? 'Ya' : 'Tidak'}
⛔ Diblokir: ${info.isBanned ? 'Ya' : 'Tidak'}

📝 Bio: ${info.blurb || info.description || '-'}

🌐 Sosial:
${social}

🔁 Previous Usernames: ${prev}

🧍‍♀️ Avatar:
🏷️ Tipe: ${avatarType}
🎛️ Skala: ${scales}
🎒 Aset Terpasang: ${assetsCount}

🎨 Warna Tubuh:
${bodyColors}


📂 Aset per Kategori:
${assetsByCategory}`;

    	await sendMessage(id,{image: {url},caption},{quoted: m});
    }catch(e){
        nyarios("User Tidak Di Temukan")
    }
    
}
module.exports = {cmd,args,category,message};