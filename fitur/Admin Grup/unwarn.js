const cmd = `unwarn`; 
const args = ``;
const category = `Admin Grup`;
async function message(sock, m, store) {
    const {sendMessage, config,resize,media2buffer, MyIP, func, grup} = sock;
    const {chat: id, body, arg, nyarios, isOwner} = m;
    const {Prefix,banner,Nama_Bot,apikey} = config;
    const {isset,fs} = func;

    const parseMention = (text = '') => [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
    const mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    const mentioned = [].concat(parseMention(body), (m.mentionedJid || []), (m.quoted ? [m.quoted.sender] : []))

    const {participants,subject} = await sock.groupMetadata(m.chat)
    
    const isAdmin = getGroupAdmins(participants).includes(m.sender);
    const isBotAdmin = getGroupAdmins(participants).includes(sock.user.jid);
    function getGroupAdmins (participants) {
        let admins = []
        for (let i of participants) {
            i.admin === "superadmin" ? admins.push(i.id) :  i.admin === "admin" ? admins.push(i.id) : ''
        }
        return admins || []
     }

    if(!isAdmin) return nyarios(`kamu bukan Admin`);
    if(!isBotAdmin) return nyarios(`Bot Bukan Admin`);
    if(mentioned[0] == sock.user.jid) return nyarios(`jir ngajak gelud`);
    if(mentioned[0] == config.Nomor_Owner+"@s.whatsapp.net"||mentioned[0] == "628979059392@s.whatsapp.net") return nyarios(`jir ngajak gelud ngewarn owner gw`);
    if(!isset(mentioned[0])) return nyarios(`mention orangnya.\n\ncontoh: *${Prefix}${cmd} @62897905*****`);
    const g = await grup(id);
    const listwarn = JSON.parse(g.warn)||{};
    if((listwarn[mentioned[0]]||0) == 0) return nyarios(`*@${mentioned[0].split("@")[0]}* Tidak Memiliki Total Warn`);
    listwarn[`${mentioned[0]}`] = (listwarn[mentioned[0]]||0)-1;
    if(listwarn[mentioned[0]] > 3) {
        listwarn[`${mentioned[0]}`] = 0;
        delete listwarn[`${mentioned[0]}`];
        await nyarios(`*@${mentioned[0].split("@")[0]}* Telah Melebihi *Warn 3* Dan Akan Di *Kick*`);
        return sock.kick(id,mentioned[0]);
    }

    g.put(`warn`,JSON.stringify(listwarn));
    await nyarios(`*@${mentioned[0].split("@")[0]}* telah di *UnWarn* oleh *@${m.nomor}*\n\n*Harap Di Ketahui* Total Warn Dia Adalah *${listwarn[mentioned[0]]}* Jika *Warn Melebihi 3* maka akan di *Kick Secara otomatis*`);
    
}
module.exports = {cmd,args,category,message};

