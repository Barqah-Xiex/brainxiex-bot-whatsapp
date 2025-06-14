const cmd = `afk`;
const args = `[alasan]`;
const category = `Grup`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, player, callcmd} = sock;
    const {chat: id, body, arg, isOwner, nyarios,isGroup} = m;
    const {Prefix,banner,Nama_Bot,apikey,baseURL} = config;
    const {isset,fs} = func

    if(!isGroup) return nyarios(`gunakan di grup`);
    
    const alasan = isset(arg)?arg:`(Tanpa Alasan)`;
    fs.writeFileSync(`./database/afk/${m.sender}`,alasan);
    sock.sendMessage(id,{react: {
        text: "🔕",
        key: m.key
    }});
    sock.banner(id,{image:{url: `${baseURL}/api/image/banner?apikey=${apikey}&text=${encodeURIComponent("AFK: "+alasan)}&ppimg=${encodeURIComponent(await sock.profilePictureUrl(m.sender))}`},caption:`Anda telah afk dengan alasan ${alasan}`},{quoted:m});
}
module.exports = {cmd,args,category,message};